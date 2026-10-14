const crypto = require('node:crypto');

// In-memory session store (token -> { userId, username, createdAt, expiresAt })
const sessions = new Map();
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function createSession(userId, username) {
  const token = crypto.randomBytes(32).toString('hex');
  const sessionData = {
    userId,
    username,
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_MS
  };
  sessions.set(token, sessionData);
  return token;
}

function destroySession(token) {
  if (token && sessions.has(token)) {
    sessions.delete(token);
    return true;
  }
  return false;
}

function getSession(token) {
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }
  return session;
}

function extractToken(req) {
  // Check cookie first
  if (req.cookies && req.cookies.auth_token) {
    return req.cookies.auth_token;
  }
  // Check Authorization header
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return null;
}

function requireAuth(req, res, next) {
  const token = extractToken(req);
  const session = getSession(token);
  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Accès non autorisé. Veuillez vous connecter avec le compte administrateur."
    });
  }
  req.user = session;
  req.authToken = token;
  next();
}

function optionalAuth(req, res, next) {
  const token = extractToken(req);
  const session = getSession(token);
  if (session) {
    req.user = session;
    req.authToken = token;
  } else {
    req.user = null;
  }
  next();
}

module.exports = {
  createSession,
  destroySession,
  getSession,
  requireAuth,
  optionalAuth
};
