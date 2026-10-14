const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');
const bcrypt = require('bcryptjs');

// Database path
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dbPath = path.join(dataDir, 'authentique.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode for better concurrency and performance
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize tables
function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL COLLATE NOCASE,
      name TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'Actif',
      valid_until TEXT,
      usage_count INTEGER NOT NULL DEFAULT 0,
      last_verified_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_tickets_code ON tickets(code);
    CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);

    CREATE TABLE IF NOT EXISTS verification_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      searched_code TEXT NOT NULL,
      is_authentic INTEGER NOT NULL,
      ticket_id INTEGER,
      ticket_name TEXT,
      status_at_check TEXT,
      ip_address TEXT,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE SET NULL
    );

    CREATE INDEX IF NOT EXISTS idx_verif_timestamp ON verification_logs(timestamp);
    CREATE INDEX IF NOT EXISTS idx_verif_authentic ON verification_logs(is_authentic);

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      last_login TEXT
    );

    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // Seed default admin if none exists
  const countAdmin = db.prepare('SELECT COUNT(*) as count FROM admin_users').get();
  if (countAdmin.count === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin1234', salt);
    const now = new Date().toISOString();
    db.prepare('INSERT INTO admin_users (username, password_hash, created_at) VALUES (?, ?, ?)').run('admin', hash, now);
    console.log('✅ Compte administrateur par défaut initialisé (admin / admin1234)');
  }

  // Seed sample tickets if empty
  const countTickets = db.prepare('SELECT COUNT(*) as count FROM tickets').get();
  if (countTickets.count === 0) {
    const now = new Date().toISOString();
    const insertTicket = db.prepare(`
      INSERT INTO tickets (code, name, description, status, valid_until, usage_count, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertTicket.run('AUTH-2026-VIP', 'Pass VIP Platine - Festival 2026', 'Accès illimité aux loges réservées et espace lounge VIP', 'Actif', '2026-12-31', 3, now);
    insertTicket.run('PASS-8842-STD', 'Billet Standard - Salon Tech & Innovation', 'Accès journée complète et ateliers publics', 'Actif', '2026-11-15', 1, now);
    insertTicket.run('TICK-5519-EXPO', 'Entrée Exposition Art Moderne', 'Billet coupe-file pour 2 personnes', 'Actif', '2026-10-30', 0, now);
    insertTicket.run('CONF-3310-PRO', 'Badge Conférence Cybersécurité', 'Badge nominatif pour expert conférencier', 'Utilisé', '2026-09-20', 4, now);
    insertTicket.run('SPEC-1102-INV', 'Invitation Spéciale Soirée Gala', 'Table d\'honneur n°4 et cocktail de bienvenue', 'Expiré', '2026-08-15', 2, now);

    console.log('✅ Tickets exemples initialisés pour les tests.');

    // Seed some verification logs for realistic dashboard charts
    const insertLog = db.prepare(`
      INSERT INTO verification_logs (searched_code, is_authentic, ticket_id, ticket_name, status_at_check, ip_address, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertLog.run('AUTH-2026-VIP', 1, 1, 'Pass VIP Platine - Festival 2026', 'Actif', '127.0.0.1', new Date(Date.now() - 3600000 * 2).toISOString());
    insertLog.run('PASS-8842-STD', 1, 2, 'Billet Standard - Salon Tech & Innovation', 'Actif', '127.0.0.1', new Date(Date.now() - 3600000 * 5).toISOString());
    insertLog.run('FAUX-9999-XYZ', 0, null, null, null, '127.0.0.1', new Date(Date.now() - 3600000 * 6).toISOString());
    insertLog.run('AUTH-2026-VIP', 1, 1, 'Pass VIP Platine - Festival 2026', 'Actif', '127.0.0.1', new Date(Date.now() - 3600000 * 12).toISOString());
    insertLog.run('CODE-INCONNU-01', 0, null, null, null, '127.0.0.1', new Date(Date.now() - 3600000 * 24).toISOString());
  }
}

initDb();

module.exports = db;
