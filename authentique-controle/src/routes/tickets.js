const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

// GET /api/tickets - Liste des tickets avec recherche et filtres
router.get('/', (req, res) => {
  try {
    const { q, status } = req.query;
    let query = 'SELECT * FROM tickets WHERE 1=1';
    const params = [];

    if (q && q.trim()) {
      const searchTerm = `%${q.trim()}%`;
      query += ' AND (code LIKE ? OR name LIKE ? OR description LIKE ?)';
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (status && status !== 'Tous') {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY id DESC';

    const tickets = db.prepare(query).all(...params);
    return res.json({
      success: true,
      total: tickets.length,
      tickets
    });
  } catch (err) {
    console.error('Erreur listing tickets:', err);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des tickets."
    });
  }
});

// GET /api/tickets/:id - Détail d'un ticket
router.get('/:id', (req, res) => {
  try {
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket non trouvé."
      });
    }
    return res.json({
      success: true,
      ticket
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du ticket."
    });
  }
});

// POST /api/tickets/generate - Générateur intelligent de tickets (Unique ou Lot)
router.post('/generate', requireAuth, (req, res) => {
  try {
    const {
      name,
      category = 'VIP',
      theme = 'gold',
      holder_name = '',
      seat = '',
      price = '',
      valid_until = null,
      prefix = '',
      custom_code = '',
      count = 1
    } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "Le nom ou l'événement du ticket est obligatoire."
      });
    }

    const cleanName = String(name).trim();
    const cleanCategory = String(category).trim() || 'VIP';
    const cleanTheme = String(theme).trim() || 'gold';
    const cleanHolder = holder_name ? String(holder_name).trim() : '';
    const cleanSeat = seat ? String(seat).trim() : '';
    const cleanPrice = price ? String(price).trim() : '';
    const cleanValidUntil = valid_until ? String(valid_until).trim() : null;
    const ticketCount = Math.min(Math.max(parseInt(count, 10) || 1, 1), 50);

    const year = new Date().getFullYear();
    const basePrefix = (prefix && String(prefix).trim())
      ? String(prefix).trim().replace(/[^A-Za-z0-9]/g, '').toUpperCase()
      : cleanCategory.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 6) || 'PASS';

    const randomChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const generatedTickets = [];
    const now = new Date().toISOString();

    const insertStmt = db.prepare(`
      INSERT INTO tickets (code, name, description, status, valid_until, usage_count, created_at)
      VALUES (?, ?, ?, 'Actif', ?, 0, ?)
    `);

    for (let i = 0; i < ticketCount; i++) {
      let codeToUse;
      if (ticketCount === 1 && custom_code && String(custom_code).trim()) {
        codeToUse = String(custom_code).trim().toUpperCase();
        const existing = db.prepare('SELECT id FROM tickets WHERE UPPER(code) = UPPER(?)').get(codeToUse);
        if (existing) {
          return res.status(409).json({
            success: false,
            message: `Ce ticket existe déjà : "${codeToUse}".`
          });
        }
      } else {
        let uniqueFound = false;
        let attempts = 0;
        while (!uniqueFound && attempts < 100) {
          attempts++;
          let randPart = '';
          for (let k = 0; k < 4; k++) {
            randPart += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
          }
          const candidate = ticketCount > 1
            ? `${basePrefix}-${year}-${String(i + 1).padStart(2, '0')}${randPart.slice(0, 2)}`
            : `${basePrefix}-${year}-${randPart}`;

          const existing = db.prepare('SELECT id FROM tickets WHERE UPPER(code) = UPPER(?)').get(candidate);
          if (!existing) {
            codeToUse = candidate;
            uniqueFound = true;
          }
        }
        if (!codeToUse) {
          codeToUse = `${basePrefix}-${Date.now().toString(36).toUpperCase()}`;
        }
      }

      // Attribution personnalisée et distincte pour chaque billet du lot
      let currentHolder = cleanHolder;
      if (ticketCount > 1) {
        const holdersList = cleanHolder ? cleanHolder.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean) : [];
        if (holdersList.length > i) {
          currentHolder = holdersList[i];
        } else if (holdersList.length > 0) {
          currentHolder = `${holdersList[0]} (#${i + 1})`;
        } else {
          currentHolder = `Bénéficiaire #${i + 1}`;
        }
      } else if (!currentHolder) {
        currentHolder = 'Titulaire Officiel';
      }

      let currentSeat = cleanSeat;
      if (ticketCount > 1) {
        if (cleanSeat) {
          if (/\d+$/.test(cleanSeat)) {
            currentSeat = cleanSeat.replace(/\d+$/, (m) => String(parseInt(m, 10) + i).padStart(m.length, '0'));
          } else {
            currentSeat = `${cleanSeat} - N°${i + 1}`;
          }
        } else {
          currentSeat = `Place #${String(i + 1).padStart(2, '0')}`;
        }
      } else if (!currentSeat) {
        currentSeat = 'Accès Général';
      }

      // Format description with metadata
      const descParts = [];
      descParts.push(`Catégorie : ${cleanCategory}`);
      if (currentHolder) descParts.push(`Titulaire : ${currentHolder}`);
      if (currentSeat) descParts.push(`Place : ${currentSeat}`);
      if (cleanPrice) descParts.push(`Tarif : ${cleanPrice}`);
      descParts.push(`Thème : ${cleanTheme}`);
      const fullDescription = descParts.join(' | ');

      const ticketDisplayName = ticketCount > 1
        ? `${cleanName} (#${i + 1} - ${cleanCategory})`
        : `${cleanName} (${cleanCategory})`;

      const result = insertStmt.run(codeToUse, ticketDisplayName, fullDescription, cleanValidUntil, now);
      const inserted = db.prepare('SELECT * FROM tickets WHERE id = ?').get(result.lastInsertRowid);

      generatedTickets.push({
        ...inserted,
        meta: {
          eventName: cleanName,
          category: cleanCategory,
          theme: cleanTheme,
          holderName: currentHolder,
          seat: currentSeat,
          price: cleanPrice || 'Standard'
        }
      });
    }

    return res.status(201).json({
      success: true,
      message: ticketCount === 1
        ? `Ticket "${generatedTickets[0].code}" généré et certifié avec succès !`
        : `Lot de ${ticketCount} tickets générés et enregistrés avec succès !`,
      count: ticketCount,
      ticket: generatedTickets[0],
      tickets: generatedTickets
    });
  } catch (err) {
    console.error('Erreur génération tickets:', err);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la génération des tickets."
    });
  }
});

// POST /api/tickets - Créer un nouveau ticket (Admin requis)
router.post('/', requireAuth, (req, res) => {
  try {
    const { code, name, description, status, valid_until } = req.body;

    if (!code || !String(code).trim()) {
      return res.status(400).json({
        success: false,
        message: "Le code du ticket est obligatoire."
      });
    }

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "Le nom ou type du ticket est obligatoire."
      });
    }

    const cleanCode = String(code).trim().toUpperCase();
    const cleanName = String(name).trim();
    const cleanDesc = description ? String(description).trim() : '';
    const cleanStatus = status && ['Actif', 'Utilisé', 'Expiré', 'Annulé'].includes(status) ? status : 'Actif';
    const cleanValidUntil = valid_until ? String(valid_until).trim() : null;

    // Check if code already exists (Case-insensitive)
    const existing = db.prepare('SELECT id FROM tickets WHERE UPPER(code) = UPPER(?)').get(cleanCode);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Ce ticket existe déjà."
      });
    }

    const now = new Date().toISOString();
    const insert = db.prepare(`
      INSERT INTO tickets (code, name, description, status, valid_until, usage_count, created_at)
      VALUES (?, ?, ?, ?, ?, 0, ?)
    `);

    const result = insert.run(cleanCode, cleanName, cleanDesc, cleanStatus, cleanValidUntil, now);
    const newTicket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(result.lastInsertRowid);

    return res.status(201).json({
      success: true,
      message: "Ticket créé avec succès.",
      ticket: newTicket
    });
  } catch (err) {
    console.error('Erreur création ticket:', err);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la création du ticket."
    });
  }
});

// PUT /api/tickets/:id - Modifier un ticket (Admin requis)
router.put('/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, description, status, valid_until } = req.body;

    const existingTicket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(id);
    if (!existingTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket non trouvé."
      });
    }

    if (!code || !String(code).trim()) {
      return res.status(400).json({
        success: false,
        message: "Le code du ticket est obligatoire."
      });
    }

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "Le nom ou type du ticket est obligatoire."
      });
    }

    const cleanCode = String(code).trim().toUpperCase();
    const cleanName = String(name).trim();
    const cleanDesc = description !== undefined ? String(description).trim() : existingTicket.description;
    const cleanStatus = status && ['Actif', 'Utilisé', 'Expiré', 'Annulé'].includes(status) ? status : existingTicket.status;
    const cleanValidUntil = valid_until !== undefined ? (valid_until ? String(valid_until).trim() : null) : existingTicket.valid_until;

    // Check if new code is already used by another ticket
    const duplicate = db.prepare('SELECT id FROM tickets WHERE UPPER(code) = UPPER(?) AND id != ?').get(cleanCode, id);
    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Ce code est déjà utilisé par un autre ticket."
      });
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE tickets
      SET code = ?, name = ?, description = ?, status = ?, valid_until = ?, updated_at = ?
      WHERE id = ?
    `).run(cleanCode, cleanName, cleanDesc, cleanStatus, cleanValidUntil, now, id);

    const updated = db.prepare('SELECT * FROM tickets WHERE id = ?').get(id);

    return res.json({
      success: true,
      message: "Ticket mis à jour avec succès.",
      ticket: updated
    });
  } catch (err) {
    console.error('Erreur modification ticket:', err);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la modification du ticket."
    });
  }
});

// DELETE /api/tickets/:id - Supprimer un ticket (Admin requis)
router.delete('/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM tickets WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Ce ticket n'existe pas ou a déjà été supprimé."
      });
    }

    db.prepare('DELETE FROM tickets WHERE id = ?').run(id);

    return res.json({
      success: true,
      message: `Le ticket "${existing.code}" a été supprimé avec succès.`
    });
  } catch (err) {
    console.error('Erreur suppression ticket:', err);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la suppression du ticket."
    });
  }
});

// PATCH /api/tickets/:id/status - Changer rapidement le statut (Admin requis)
router.patch('/:id/status', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Actif', 'Utilisé', 'Expiré', 'Annulé'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Statut non valide."
      });
    }

    const now = new Date().toISOString();
    const result = db.prepare('UPDATE tickets SET status = ?, updated_at = ? WHERE id = ?').run(status, now, id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Ticket non trouvé." });
    }

    return res.json({
      success: true,
      message: `Statut mis à jour : ${status}`
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Erreur mise à jour statut."
    });
  }
});

module.exports = router;
