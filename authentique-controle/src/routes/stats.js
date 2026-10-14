const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

// GET /api/stats/summary - Données complètes pour le tableau de bord
router.get('/summary', (req, res) => {
  try {
    // 1. Total tickets
    const totalTickets = db.prepare('SELECT COUNT(*) as count FROM tickets').get().count;

    // 2. Total verifications
    const totalVerifications = db.prepare('SELECT COUNT(*) as count FROM verification_logs').get().count;

    // 3. Recognized / Authentic codes
    const recognizedCodes = db.prepare('SELECT COUNT(*) as count FROM verification_logs WHERE is_authentic = 1').get().count;

    // 4. Unknown / Rejected codes
    const unknownCodes = db.prepare('SELECT COUNT(*) as count FROM verification_logs WHERE is_authentic = 0').get().count;

    // 5. Recent tickets added (last 5)
    const recentTickets = db.prepare('SELECT * FROM tickets ORDER BY id DESC LIMIT 5').all();

    // 6. Recent verifications (last 8)
    const recentVerifications = db.prepare('SELECT * FROM verification_logs ORDER BY id DESC LIMIT 8').all();

    // 7. Status breakdown
    const statusCounts = db.prepare('SELECT status, COUNT(*) as count FROM tickets GROUP BY status').all();

    return res.json({
      success: true,
      stats: {
        totalTickets,
        totalVerifications,
        recognizedCodes,
        unknownCodes,
        recognitionRate: totalVerifications > 0 ? Math.round((recognizedCodes / totalVerifications) * 100) : 100
      },
      recentTickets,
      recentVerifications,
      statusCounts
    });
  } catch (err) {
    console.error('Erreur stats summary:', err);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des statistiques."
    });
  }
});

// GET /api/stats/history - Historique complet des vérifications
router.get('/history', (req, res) => {
  try {
    const { filter, q, limit = 50, page = 1 } = req.query;
    let query = 'SELECT * FROM verification_logs WHERE 1=1';
    const params = [];

    if (filter === 'authentic') {
      query += ' AND is_authentic = 1';
    } else if (filter === 'rejected') {
      query += ' AND is_authentic = 0';
    }

    if (q && q.trim()) {
      const searchTerm = `%${q.trim()}%`;
      query += ' AND (searched_code LIKE ? OR ticket_name LIKE ?)';
      params.push(searchTerm, searchTerm);
    }

    // Count total matching
    const countSql = query.replace('SELECT *', 'SELECT COUNT(*) as count');
    const totalCount = db.prepare(countSql).get(...params).count;

    query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    const limitNum = parseInt(limit, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limitNum;
    params.push(limitNum, offset);

    const logs = db.prepare(query).all(...params);

    return res.json({
      success: true,
      total: totalCount,
      page: pageNum,
      limit: limitNum,
      logs
    });
  } catch (err) {
    console.error('Erreur listing historique:', err);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de l'historique."
    });
  }
});

// DELETE /api/stats/history - Effacer l'historique (Admin requis)
router.delete('/history', requireAuth, (req, res) => {
  try {
    db.prepare('DELETE FROM verification_logs').run();
    return res.json({
      success: true,
      message: "L'historique des vérifications a été réinitialisé avec succès."
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la réinitialisation de l'historique."
    });
  }
});

// GET /api/stats/export/tickets - Export CSV des tickets
router.get('/export/tickets', (req, res) => {
  try {
    const tickets = db.prepare('SELECT * FROM tickets ORDER BY id ASC').all();
    let csv = 'ID,Code,Nom,Statut,Description,Date validite,Scans,Date creation\n';

    for (const t of tickets) {
      const escape = (str) => `"${(str || '').toString().replace(/"/g, '""')}"`;
      csv += [
        t.id,
        escape(t.code),
        escape(t.name),
        escape(t.status),
        escape(t.description),
        escape(t.valid_until),
        t.usage_count,
        escape(t.created_at)
      ].join(',') + '\n';
    }

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="tickets_authentique_controle.csv"');
    return res.send('\uFEFF' + csv); // BOM for Excel UTF-8 support
  } catch (err) {
    return res.status(500).send("Erreur lors de l'export.");
  }
});

// GET /api/stats/export/history - Export CSV de l'historique
router.get('/export/history', (req, res) => {
  try {
    const logs = db.prepare('SELECT * FROM verification_logs ORDER BY id DESC').all();
    let csv = 'ID,Date,Code recherche,Resultat,Nom ticket,Statut ticket,Adresse IP\n';

    for (const l of logs) {
      const escape = (str) => `"${(str || '').toString().replace(/"/g, '""')}"`;
      csv += [
        l.id,
        escape(l.timestamp),
        escape(l.searched_code),
        l.is_authentic === 1 ? 'Authentique' : 'Rejete / Inconnu',
        escape(l.ticket_name),
        escape(l.status_at_check),
        escape(l.ip_address)
      ].join(',') + '\n';
    }

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="historique_verifications.csv"');
    return res.send('\uFEFF' + csv);
  } catch (err) {
    return res.status(500).send("Erreur lors de l'export.");
  }
});

module.exports = router;
