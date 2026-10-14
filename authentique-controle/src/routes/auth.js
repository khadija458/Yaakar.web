const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');
const { createSession, destroySession, requireAuth, optionalAuth } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Nom d'utilisateur et mot de passe requis."
      });
    }

    const cleanUser = String(username).trim();
    const admin = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(cleanUser);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Identifiants invalides."
      });
    }

    const isMatch = bcrypt.compareSync(String(password), admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Identifiants invalides."
      });
    }

    // Update last_login
    db.prepare('UPDATE admin_users SET last_login = ? WHERE id = ?').run(new Date().toISOString(), admin.id);

    const token = createSession(admin.id, admin.username);

    // Set cookie (24h)
    res.cookie('auth_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    });

    return res.json({
      success: true,
      message: "Connexion réussie !",
      token,
      user: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (err) {
    console.error('Erreur login:', err);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la connexion."
    });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  const token = req.cookies?.auth_token || (req.headers['authorization']?.startsWith('Bearer ') && req.headers['authorization'].substring(7).trim());
  if (token) {
    destroySession(token);
  }
  res.clearCookie('auth_token');
  return res.json({
    success: true,
    message: "Déconnexion réussie."
  });
});

// GET /api/auth/me
router.get('/me', optionalAuth, (req, res) => {
  if (req.user) {
    return res.json({
      authenticated: true,
      user: {
        id: req.user.userId,
        username: req.user.username
      }
    });
  }
  return res.json({
    authenticated: false,
    user: null
  });
});

// POST /api/auth/change-password
router.post('/change-password', requireAuth, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "L'ancien et le nouveau mot de passe sont requis."
      });
    }

    if (String(newPassword).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Le nouveau mot de passe doit comporter au moins 6 caractères."
      });
    }

    const admin = db.prepare('SELECT * FROM admin_users WHERE id = ?').get(req.user.userId);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
    }

    const isMatch = bcrypt.compareSync(String(currentPassword), admin.password_hash);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Le mot de passe actuel est incorrect."
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(String(newPassword), salt);

    db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').run(newHash, admin.id);

    return res.json({
      success: true,
      message: "Mot de passe modifié avec succès !"
    });
  } catch (err) {
    console.error('Erreur changement mot de passe:', err);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la modification du mot de passe."
    });
  }
});

module.exports = router;
