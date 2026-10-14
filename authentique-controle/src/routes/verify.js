const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/verify - Vérification instantanée d'un code de ticket
router.post('/verify', (req, res) => {
  try {
    const rawCode = req.body.code;

    // Check if code is provided
    if (rawCode === undefined || rawCode === null || String(rawCode).trim() === '') {
      return res.status(400).json({
        success: false,
        empty: true,
        message: "Veuillez saisir un code de ticket."
      });
    }

    // Ignore surrounding whitespace as requested
    const cleanCode = String(rawCode).trim();

    // Client IP
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';
    const now = new Date().toISOString();

    // Look up ticket in database
    const ticket = db.prepare('SELECT * FROM tickets WHERE UPPER(code) = UPPER(?)').get(cleanCode);

    if (ticket) {
      // 1. Ticket found: Update usage statistics
      const newUsageCount = (ticket.usage_count || 0) + 1;
      db.prepare('UPDATE tickets SET usage_count = ?, last_verified_at = ? WHERE id = ?').run(
        newUsageCount,
        now,
        ticket.id
      );

      // 2. Log in verification history
      db.prepare(`
        INSERT INTO verification_logs (searched_code, is_authentic, ticket_id, ticket_name, status_at_check, ip_address, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        cleanCode,
        1,
        ticket.id,
        ticket.name,
        ticket.status,
        clientIp,
        now
      );

      return res.json({
        success: true,
        authentic: true,
        message: "Ticket authentique : ce ticket existe dans le système.",
        ticket: {
          id: ticket.id,
          code: ticket.code,
          name: ticket.name,
          description: ticket.description || "Aucune description spécifique.",
          status: ticket.status,
          valid_until: ticket.valid_until,
          usage_count: newUsageCount,
          created_at: ticket.created_at,
          last_verified_at: now
        }
      });
    } else {
      // Ticket not found
      db.prepare(`
        INSERT INTO verification_logs (searched_code, is_authentic, ticket_id, ticket_name, status_at_check, ip_address, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        cleanCode,
        0,
        null,
        null,
        null,
        clientIp,
        now
      );

      return res.json({
        success: true,
        authentic: false,
        message: "Ticket non reconnu ou non autorisé. Ce code n’existe pas dans le système.",
        searchedCode: cleanCode
      });
    }
  } catch (err) {
    console.error('Erreur lors de la vérification du ticket:', err);
    return res.status(500).json({
      success: false,
      message: "Une erreur interne s'est produite lors de la vérification."
    });
  }
});

module.exports = router;
