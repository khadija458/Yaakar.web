const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

// We will test the API endpoints against a running instance on port 3001
const PORT = 3001;
process.env.PORT = PORT;

// Start server
const app = require('./server');

function makeRequest(method, path, body = null, cookie = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const headers = {
      'Content-Type': 'application/json'
    };
    if (postData) {
      headers['Content-Length'] = Buffer.byteLength(postData);
    }
    if (cookie) {
      headers['Cookie'] = cookie;
    }

    const options = {
      hostname: 'localhost',
      port: PORT,
      path,
      method,
      headers
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = data;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: json
        });
      });
    });

    req.on('error', (err) => reject(err));
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 DÉMARRAGE DE LA SUITE DE TESTS : AUTHENTIQUE CONTRÔLE');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------------
    // TEST 1: Vérifier un code existant
    // -------------------------------------------------------------------
    const res1 = await makeRequest('POST', '/api/verify', { code: 'AUTH-2026-VIP' });
    assert(
      res1.statusCode === 200 &&
      res1.data.authentic === true &&
      res1.data.message === "Ticket authentique : ce ticket existe dans le système.",
      "1. Vérifier un code existant : le ticket doit être reconnu vert/authentique",
      JSON.stringify(res1.data)
    );

    // -------------------------------------------------------------------
    // TEST 1b: Vérifier avec des espaces inutiles au début/fin (trim)
    // -------------------------------------------------------------------
    const res1b = await makeRequest('POST', '/api/verify', { code: '   AUTH-2026-VIP   ' });
    assert(
      res1b.statusCode === 200 &&
      res1b.data.authentic === true,
      "1b. Vérification avec espaces inutiles au début et à la fin (Trim)",
      JSON.stringify(res1b.data)
    );

    // -------------------------------------------------------------------
    // TEST 2: Vérifier un code inexistant
    // -------------------------------------------------------------------
    const res2 = await makeRequest('POST', '/api/verify', { code: 'INEXISTANT-CODE-999' });
    assert(
      res2.statusCode === 200 &&
      res2.data.authentic === false &&
      res2.data.message === "Ticket non reconnu ou non autorisé. Ce code n’existe pas dans le système.",
      "2. Vérifier un code inexistant : le ticket doit être déclaré non reconnu / rejeté",
      JSON.stringify(res2.data)
    );

    // -------------------------------------------------------------------
    // TEST 2b: Vérifier champ vide
    // -------------------------------------------------------------------
    const resEmpty = await makeRequest('POST', '/api/verify', { code: '   ' });
    assert(
      resEmpty.statusCode === 400 &&
      resEmpty.data.empty === true &&
      resEmpty.data.message === "Veuillez saisir un code de ticket.",
      "2b. Champ vide : avertit de saisir un code",
      JSON.stringify(resEmpty.data)
    );

    // -------------------------------------------------------------------
    // Authentification Admin pour les opérations de gestion
    // -------------------------------------------------------------------
    const loginRes = await makeRequest('POST', '/api/auth/login', { username: 'admin', password: 'admin1234' });
    const authCookie = loginRes.headers['set-cookie'] ? loginRes.headers['set-cookie'][0] : null;
    assert(
      loginRes.statusCode === 200 && loginRes.data.success === true && authCookie !== null,
      "Auth: Connexion administrateur avec succès",
      JSON.stringify(loginRes.data)
    );

    // -------------------------------------------------------------------
    // TEST 3: Ajouter un code déjà enregistré (refuser doublon)
    // -------------------------------------------------------------------
    const res3 = await makeRequest('POST', '/api/tickets', {
      code: 'AUTH-2026-VIP',
      name: 'Tentative Doublon VIP',
      description: 'Ce ticket a un code déjà présent',
      status: 'Actif'
    }, authCookie);

    assert(
      res3.statusCode === 409 &&
      res3.data.success === false &&
      res3.data.message === "Ce ticket existe déjà.",
      "3. Ajouter un code déjà enregistré : l’application doit refuser le doublon (« Ce ticket existe déjà. »)",
      JSON.stringify(res3.data)
    );

    // -------------------------------------------------------------------
    // TEST 4: Créer un ticket puis le Modifier
    // -------------------------------------------------------------------
    const createRes = await makeRequest('POST', '/api/tickets', {
      code: 'TEST-TEMP-4421',
      name: 'Billet Démonstration Modif',
      description: 'Ticket créé pour le test de modification',
      status: 'Actif'
    }, authCookie);

    assert(
      createRes.statusCode === 201 && createRes.data.success === true,
      "4a. Création d'un ticket intermédiaire pour test",
      JSON.stringify(createRes.data)
    );

    const tempTicketId = createRes.data.ticket.id;

    // Modification du ticket
    const res4 = await makeRequest('PUT', `/api/tickets/${tempTicketId}`, {
      code: 'TEST-TEMP-MODIFIE',
      name: 'Billet Modifié avec Succès',
      description: 'Description mise à jour',
      status: 'Utilisé'
    }, authCookie);

    assert(
      res4.statusCode === 200 &&
      res4.data.success === true &&
      res4.data.ticket.code === 'TEST-TEMP-MODIFIE' &&
      res4.data.ticket.name === 'Billet Modifié avec Succès' &&
      res4.data.ticket.status === 'Utilisé',
      "4. Modifier un ticket : les nouvelles informations doivent être enregistrées",
      JSON.stringify(res4.data)
    );

    // Vérification que le code modifié est immédiatement vérifiable
    const verifyModif = await makeRequest('POST', '/api/verify', { code: 'TEST-TEMP-MODIFIE' });
    assert(
      verifyModif.data.authentic === true && verifyModif.data.ticket.name === 'Billet Modifié avec Succès',
      "4b. Le ticket modifié est immédiatement certifié authentique",
      JSON.stringify(verifyModif.data)
    );

    // -------------------------------------------------------------------
    // TEST 5: Supprimer un ticket
    // -------------------------------------------------------------------
    const res5 = await makeRequest('DELETE', `/api/tickets/${tempTicketId}`, null, authCookie);
    assert(
      res5.statusCode === 200 && res5.data.success === true,
      "5. Supprimer un ticket : confirmation et suppression réussie",
      JSON.stringify(res5.data)
    );

    // Vérifier qu'il a disparu de la liste
    const listRes = await makeRequest('GET', '/api/tickets?q=TEST-TEMP-MODIFIE');
    assert(
      listRes.data.tickets.length === 0,
      "5b. Le ticket supprimé a bien disparu de la liste",
      `Nombre restant : ${listRes.data.tickets.length}`
    );

    // Vérifier qu'il est désormais déclaré non reconnu
    const verifyDeleted = await makeRequest('POST', '/api/verify', { code: 'TEST-TEMP-MODIFIE' });
    assert(
      verifyDeleted.data.authentic === false,
      "5c. Le code supprimé n'est plus reconnu par le système",
      JSON.stringify(verifyDeleted.data)
    );

    // -------------------------------------------------------------------
    // TEST 6: Persistance de la base de données
    // -------------------------------------------------------------------
    const dbFilePath = path.join(__dirname, 'data', 'authentique.db');
    const fileExists = fs.existsSync(dbFilePath);
    const fileSize = fileExists ? fs.statSync(dbFilePath).size : 0;

    assert(
      fileExists && fileSize > 0,
      `6. Persistance SQLite : fichier authentique.db présent sur le disque (${fileSize} octets)`,
      `Fichier : ${dbFilePath}`
    );

    // -------------------------------------------------------------------
    // TEST 7: Tableau de bord & Statistiques
    // -------------------------------------------------------------------
    const statsRes = await makeRequest('GET', '/api/stats/summary');
    assert(
      statsRes.statusCode === 200 &&
      statsRes.data.stats.totalTickets >= 5 &&
      statsRes.data.stats.totalVerifications > 0 &&
      statsRes.data.stats.recognizedCodes > 0 &&
      statsRes.data.stats.unknownCodes > 0,
      "7. Tableau de bord : statistiques complètes (total, reconnus, inconnus, récents)",
      JSON.stringify(statsRes.data.stats)
    );

    console.log('\n======================================================');
    console.log(`RÉSULTAT GLOBAL : ${passed} TESTS RÉUSSIS, ${failed} ÉCHECS`);
    console.log('======================================================\n');

    process.exit(failed === 0 ? 0 : 1);

  } catch (err) {
    console.error('Erreur inattendue pendant les tests:', err);
    process.exit(1);
  }
}

// Lancer après un court délai pour initialisation du serveur
setTimeout(runTests, 1000);
