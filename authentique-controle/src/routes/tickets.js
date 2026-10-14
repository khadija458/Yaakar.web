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
