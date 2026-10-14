const express = require('express');
const path = require('node:path');
const cookieParser = require('cookie-parser');

// Initialize database
require('./src/db');

const authRoutes = require('./src/routes/auth');
const verifyRoutes = require('./src/routes/verify');
const ticketRoutes = require('./src/routes/tickets');
const statsRoutes = require('./src/routes/stats');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Disable x-powered-by header
app.disable('x-powered-by');

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api', verifyRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/stats', statsRoutes);

// System info endpoint
app.get('/api/system-status', (req, res) => {
  res.json({
    appName: "Authentique Contrôle",
    version: "1.0.0",
    status: "online",
    serverTime: new Date().toISOString()
  });
});

// Network info endpoint for phone / local device access
app.get('/api/network-info', (req, res) => {
  const os = require('node:os');
  const interfaces = os.networkInterfaces();
  const networkIps = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        networkIps.push({
          interface: name,
          ip: iface.address,
          url: `http://${iface.address}:${PORT}`
        });
      }
    }
  }

  // Pick main Wi-Fi / Ethernet IP (usually 192.168.x.x or 10.x.x.x)
  const primary = networkIps.find(n => n.ip.startsWith('192.168.1.') || n.ip.startsWith('192.168.0.')) || networkIps[0] || { ip: 'localhost', url: `http://localhost:${PORT}` };

  const hostname = os.hostname().toLowerCase();

  res.json({
    port: PORT,
    hostname: hostname,
    friendlyUrl: `http://${hostname}.local`,
    friendlyUrlWithPort: `http://${hostname}.local:${PORT}`,
    customDomainUrl: `http://authentique.local`,
    localUrl: `http://localhost:${PORT}`,
    primaryNetworkUrl: `http://${hostname}.local`,
    primaryIp: primary.ip,
    allNetworkUrls: networkIps
  });
});

// Single Page fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Helper to get primary IP
function getPrimaryIp() {
  const os = require('node:os');
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        if (iface.address.startsWith('192.168.1.') || iface.address.startsWith('192.168.0.')) {
          return iface.address;
        }
      }
    }
  }
  return '127.0.0.1';
}

// Start mDNS Responder for custom domain "authentique.local"
try {
  const mdns = require('multicast-dns')();
  const primaryIp = getPrimaryIp();
  const hostname = require('node:os').hostname().toLowerCase();

  mdns.on('query', (query) => {
    for (const q of query.questions) {
      if ((q.name === 'authentique.local' || q.name === 'authentique' || q.name === `${hostname}.local`) && (q.type === 'A' || q.type === 'ANY')) {
        mdns.respond({
          answers: [
            { name: 'authentique.local', type: 'A', data: primaryIp, ttl: 120 },
            { name: `${hostname}.local`, type: 'A', data: primaryIp, ttl: 120 }
          ]
        });
      }
    }
  });
} catch (err) {
  // Silent fallback if mDNS cannot bind
}

// Start Server on Port 3000
const server = app.listen(PORT, '0.0.0.0', () => {
  const os = require('node:os');
  const hostname = os.hostname().toLowerCase();
  const primaryIp = getPrimaryIp();

  console.log(`====================================================`);
  console.log(`🛡️  AUTHENTIQUE CONTRÔLE - APPLICATION DÉMARRÉE`);
  console.log(`✨ Accès par nom (SANS CHIFFRE) : http://${hostname}.local`);
  console.log(`✨ Accès alternatif personnalisé : http://authentique.local`);
  console.log(`💻 Accès Ordinateur direct : http://localhost:${PORT}`);
  console.log(`📱 Accès avec port si nécessaire : http://${hostname}.local:${PORT}`);
  console.log(`🔐 Identifiants Admin par défaut : admin / admin1234`);
  console.log(`💾 Base de données : SQLite persistante`);
  console.log(`====================================================`);
});

// Also start on standard Port 80 (allows typing http://khadija.local without any port!)
let serverPort80 = null;
try {
  serverPort80 = app.listen(80, '0.0.0.0', () => {
    console.log(`⚡ Port standard 80 actif : tapez juste http://${require('node:os').hostname().toLowerCase()}.local`);
  });
  serverPort80.on('error', () => {
    // Port 80 busy or requires admin, standard port 3000 handles traffic
  });
} catch (e) {}

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\nArrêt du serveur Authentique Contrôle...');
  server.close(() => {
    if (serverPort80) serverPort80.close();
    console.log('Serveur arrêté proprement.');
    process.exit(0);
  });
});

module.exports = app;
