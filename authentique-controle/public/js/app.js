/**
 * ============================================================================
 * AUTHENTIQUE CONTRÔLE - APPLICATION JAVASCRIPT
 * Gestion interactive, vérification instantanée, CRUD tickets, statistiques
 * ============================================================================
 */

// Application State
const state = {
  activeTab: 'verify',
  currentUser: null,
  tickets: [],
  historyLogs: [],
  historyFilter: 'all',
  historySearch: '',
  ticketSearch: '',
  ticketStatusFilter: 'Tous',
  currentEditingTicketId: null,
  ticketToDelete: null
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initVerification();
  initCameraScanner();
  initTicketQrModal();
  initGenerator();
  initTicketManagement();
  initHistory();
  initAuth();
  initSettings();

  // Check current session
  checkAuthStatus();

  // Load initial data for verification and stats
  loadStats();

  // Handle direct hash or search param navigation (e.g. ?tab=generator or #generator)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const targetTab = urlParams.get('tab') || window.location.hash.replace('#', '');
    if (targetTab && ['verify', 'generator', 'dashboard', 'tickets', 'history', 'settings'].includes(targetTab)) {
      switchTab(targetTab);
    }
  } catch (e) {}
});

/* ==========================================================================
   NAVIGATION ENTRE LES ONGLETS
   ========================================================================== */
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Logo click takes to verify or dashboard
  const brand = document.getElementById('brand-link');
  if (brand) {
    brand.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('verify');
    });
  }
}

function switchTab(tabId) {
  state.activeTab = tabId;

  // Update nav buttons
  document.querySelectorAll('.nav-tab').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update view sections
  document.querySelectorAll('.view-section').forEach(section => {
    if (section.id === `section-${tabId}`) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });

  // Action specific to active tab
  if (tabId === 'dashboard') {
    loadStats();
  } else if (tabId === 'tickets') {
    loadTickets();
  } else if (tabId === 'history') {
    loadHistory();
  } else if (tabId === 'generator') {
    updateGeneratorAuthBanner();
  } else if (tabId === 'verify') {
    const input = document.getElementById('verify-code-input');
    if (input) input.focus();
  }
}

/* ==========================================================================
   MODULE A : VÉRIFICATION INSTANTANÉE DES TICKETS
   ========================================================================== */
function initVerification() {
  const form = document.getElementById('verify-form');
  const input = document.getElementById('verify-code-input');
  const clearBtn = document.getElementById('btn-clear-code');
  const btnVerify = document.getElementById('btn-verify-action');

  // Input changes
  input.addEventListener('input', () => {
    if (input.value.trim().length > 0) {
      clearBtn.style.display = 'block';
    } else {
      clearBtn.style.display = 'none';
    }
  });

  // Clear button
  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    hideVerificationResult();
    input.focus();
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    performVerification();
  });

  // Quick test pills
  document.querySelectorAll('.test-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const code = pill.getAttribute('data-code');
      input.value = code;
      clearBtn.style.display = 'block';
      performVerification();
    });
  });

  // Camera scanner trigger
  const btnScan = document.getElementById('btn-open-scanner');
  if (btnScan) {
    btnScan.addEventListener('click', () => {
      openCameraScanner();
    });
  }
}

async function performVerification() {
  const input = document.getElementById('verify-code-input');
  const btnVerify = document.getElementById('btn-verify-action');
  const rawCode = input.value;

  // 1. Validation de champ vide
  if (!rawCode || rawCode.trim() === '') {
    showEmptyWarningResult("Veuillez saisir un code de ticket à vérifier.");
    input.focus();
    return;
  }

  // 2. Nettoyage des espaces au début et à la fin
  const cleanCode = rawCode.trim();

  // Indicateur de chargement
  const originalBtnHtml = btnVerify.innerHTML;
  btnVerify.disabled = true;
  btnVerify.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Vérification en cours...`;

  try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: cleanCode })
    });

    const data = await response.json();

    if (data.empty) {
      showEmptyWarningResult(data.message);
    } else if (data.authentic) {
      // Message vert : « Ticket authentique : ce ticket existe dans le système. »
      showAuthenticResult(data.message, data.ticket);
      showToast("Ticket authentique validé !", "success");
    } else {
      // Message rouge : « Ticket non reconnu ou non autorisé. Ce code n’existe pas dans le système. »
      showRejectedResult(data.message, cleanCode);
      showToast("Code de ticket non reconnu", "error");
    }

    // Refresh stats if in background
    loadStatsSummaryOnly();

  } catch (err) {
    console.error('Erreur réseau vérification:', err);
    showEmptyWarningResult("Impossible de contacter le serveur de vérification. Vérifiez votre connexion.");
  } finally {
    btnVerify.disabled = false;
    btnVerify.innerHTML = originalBtnHtml;
  }
}

function showAuthenticResult(message, ticket) {
  const resultContainer = document.getElementById('verification-result');

  // Format dates
  const createdDate = ticket.created_at ? new Date(ticket.created_at).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : 'Non spécifiée';

  const validUntil = ticket.valid_until ? new Date(ticket.valid_until).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric'
  }) : 'Illimitée';

  // Badge class
  const statusLower = (ticket.status || 'actif').toLowerCase();
  let statusBadgeClass = 'badge-actif';
  if (statusLower === 'utilisé' || statusLower === 'utilise') statusBadgeClass = 'badge-utilise';
  if (statusLower === 'expiré' || statusLower === 'expire') statusBadgeClass = 'badge-expire';
  if (statusLower === 'annulé' || statusLower === 'annule') statusBadgeClass = 'badge-annule';

  resultContainer.innerHTML = `
    <div class="holographic-ticket-wrap">
      <div class="holographic-ticket-header">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <img src="/images/shield-badge.jpg" alt="Certifié" class="ticket-shield-img-3d">
          <div>
            <div style="font-size: 1.15rem; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">${escapeHtml(message)}</div>
            <div style="font-size: 0.8125rem; color: #d1fae5; font-weight: 500; margin-top: 2px;">
              <i class="fa-solid fa-lock" style="color: #6ee7b7;"></i> Certifié & Référencé dans la base officielle Authentique Contrôle
            </div>
          </div>
        </div>
        <div class="watermark-stamp">
          <i class="fa-solid fa-certificate"></i> CERTIFIÉ
        </div>
      </div>

      <!-- Ligne de perforation style vrai ticket de concert / VIP -->
      <div class="ticket-perforation-row">
        <div class="ticket-perforation-notch-left"></div>
        <div class="ticket-perforation-line"></div>
        <div class="ticket-perforation-notch-right"></div>
      </div>

      <div class="ticket-details-grid">
        <div class="ticket-detail-item">
          <span class="detail-label"><i class="fa-solid fa-hashtag"></i> Code Unique</span>
          <span class="detail-value code" style="font-size: 1.25rem; color: #047857;">${escapeHtml(ticket.code)}</span>
        </div>
        <div class="ticket-detail-item">
          <span class="detail-label"><i class="fa-solid fa-ticket"></i> Type / Nom du ticket</span>
          <span class="detail-value" style="font-size: 1.05rem; color: #0f172a;">${escapeHtml(ticket.name)}</span>
        </div>
        <div class="ticket-detail-item">
          <span class="detail-label"><i class="fa-solid fa-signal"></i> Statut de validité</span>
          <div>
            <span class="badge ${statusBadgeClass}" style="font-size: 0.8125rem; padding: 0.3rem 0.75rem;">
              <i class="fa-solid fa-circle" style="font-size: 6px;"></i> ${escapeHtml(ticket.status)}
            </span>
          </div>
        </div>
        <div class="ticket-detail-item">
          <span class="detail-label"><i class="fa-solid fa-fingerprint"></i> Total des scans</span>
          <span class="detail-value">${ticket.usage_count} contrôle(s) consigné(s)</span>
        </div>
        <div class="ticket-detail-item">
          <span class="detail-label"><i class="fa-solid fa-calendar-plus"></i> Enregistré le</span>
          <span class="detail-value">${createdDate}</span>
        </div>
        <div class="ticket-detail-item">
          <span class="detail-label"><i class="fa-solid fa-calendar-check"></i> Date d'expiration</span>
          <span class="detail-value">${validUntil}</span>
        </div>
        <div class="detail-desc-box">
          <span class="detail-label"><i class="fa-solid fa-align-left"></i> Description & Informations</span>
          <p style="font-size: 0.875rem; color: #334155; margin-top: 0.25rem; line-height: 1.5;">${escapeHtml(ticket.description)}</p>
        </div>

        <!-- Simulation graphique du code-barres -->
        <div style="grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-top: 0.75rem; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="barcode-simulation">
              <div class="barcode-bar w-2"></div><div class="barcode-bar space"></div>
              <div class="barcode-bar"></div><div class="barcode-bar w-3"></div>
              <div class="barcode-bar space"></div><div class="barcode-bar w-2"></div>
              <div class="barcode-bar"></div><div class="barcode-bar space"></div>
              <div class="barcode-bar w-3"></div><div class="barcode-bar"></div>
              <div class="barcode-bar space"></div><div class="barcode-bar w-2"></div>
              <div class="barcode-bar"></div><div class="barcode-bar w-3"></div>
              <div class="barcode-bar space"></div><div class="barcode-bar"></div>
              <div class="barcode-bar w-2"></div>
            </div>
            <div style="font-family: monospace; font-size: 0.75rem; color: #64748b;">
              AUTH-SECURE-KEY // ${escapeHtml(ticket.code)}
            </div>
          </div>
          <div style="font-size: 0.75rem; color: #059669; font-weight: 600;">
            <i class="fa-solid fa-circle-check"></i> Intégrité SQLite confirmée
          </div>
        </div>
      </div>
    </div>
  `;
  resultContainer.style.display = 'block';
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showRejectedResult(message, code) {
  const resultContainer = document.getElementById('verification-result');

  resultContainer.innerHTML = `
    <div class="rejected-threat-card">
      <div class="rejected-threat-header">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <img src="/images/rejected-badge.jpg" alt="Alerte Sécurité" class="threat-shield-img-3d">
          <div>
            <div style="font-size: 1.15rem; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${escapeHtml(message)}</div>
            <div style="font-size: 0.8125rem; color: #fecaca; font-weight: 500; margin-top: 2px;">
              <i class="fa-solid fa-triangle-exclamation" style="color: #fca5a5;"></i> Alerte de sécurité : aucune entrée correspondante dans le registre officiel
            </div>
          </div>
        </div>
        <div class="watermark-stamp-rejected">
          <i class="fa-solid fa-ban"></i> REJETÉ
        </div>
      </div>

      <div class="rejected-details-box">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.875rem;">
          <div>
            <strong>Code recherché :</strong> 
            <span style="font-family: monospace; font-size: 1.125rem; background: #fee2e2; color: #991b1b; padding: 0.3rem 0.75rem; border-radius: 6px; font-weight: 800; border: 1px solid #fca5a5; margin-left: 0.35rem;">
              ${escapeHtml(code)}
            </span>
          </div>
          <span style="font-size: 0.8125rem; color: #991b1b; background: rgba(239, 68, 68, 0.1); padding: 0.25rem 0.65rem; border-radius: 9999px;">
            <i class="fa-solid fa-clock"></i> Tentative consignée à ${new Date().toLocaleTimeString('fr-FR')}
          </span>
        </div>
        <p style="margin: 0; line-height: 1.5; font-size: 0.875rem;">
          <strong>Consigne stricte de sécurité :</strong> Ce code n'a été émis par aucun organisateur certifié. Veuillez refuser immédiatement l'accès au détenteur. Cette tentative de validation a été automatiquement tracée dans le journal d'audit de sécurité.
        </p>
      </div>
    </div>
  `;
  resultContainer.style.display = 'block';
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showEmptyWarningResult(message) {
  const resultContainer = document.getElementById('verification-result');

  resultContainer.innerHTML = `
    <div class="result-card-empty">
      <div style="font-size: 1.5rem; color: #d97706;">
        <i class="fa-solid fa-circle-info"></i>
      </div>
      <div>
        <div style="font-weight: 700; font-size: 1rem;">${escapeHtml(message)}</div>
        <div style="font-size: 0.8125rem; color: #b45309; margin-top: 0.125rem;">
          Veuillez entrer une référence de ticket valide (ex: AUTH-2026-VIP) dans le champ ci-dessus.
        </div>
      </div>
    </div>
  `;
  resultContainer.style.display = 'block';
}

function hideVerificationResult() {
  const resultContainer = document.getElementById('verification-result');
  resultContainer.style.display = 'none';
  resultContainer.innerHTML = '';
}

/* ==========================================================================
   MODULE B : GESTION DES TICKETS (CRUD)
   ========================================================================== */
function initTicketManagement() {
  // Search bar
  const searchInput = document.getElementById('ticket-search-input');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.ticketSearch = e.target.value;
        loadTickets();
      }, 250);
    });
  }

  // Filter dropdown
  const filterSelect = document.getElementById('ticket-status-filter');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      state.ticketStatusFilter = e.target.value;
      loadTickets();
    });
  }

  // "Nouveau Ticket" button
  const btnNewTicket = document.getElementById('btn-new-ticket');
  if (btnNewTicket) {
    btnNewTicket.addEventListener('click', () => {
      openCreateTicketModal();
    });
  }

  // Modal create/edit forms
  const ticketForm = document.getElementById('ticket-form');
  if (ticketForm) {
    ticketForm.addEventListener('submit', handleTicketFormSubmit);
  }

  // Random code generator button inside modal
  const btnGenerateCode = document.getElementById('btn-generate-code');
  if (btnGenerateCode) {
    btnGenerateCode.addEventListener('click', () => {
      const codeInput = document.getElementById('ticket-code');
      codeInput.value = generateSecureTicketCode();
    });
  }

  // Delete modal actions
  const btnConfirmDelete = document.getElementById('btn-confirm-delete');
  if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', confirmDeleteTicket);
  }
}

async function loadTickets() {
  const tableBody = document.getElementById('tickets-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = `
    <tr>
      <td colspan="7" style="text-align: center; padding: 2rem;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 1.5rem; color: #3b82f6;"></i>
        <p style="margin-top: 0.5rem; color: #64748b;">Chargement des tickets...</p>
      </td>
    </tr>
  `;

  try {
    const queryParams = new URLSearchParams();
    if (state.ticketSearch) queryParams.set('q', state.ticketSearch);
    if (state.ticketStatusFilter) queryParams.set('status', state.ticketStatusFilter);

    const response = await fetch(`/api/tickets?${queryParams.toString()}`);
    const data = await response.json();

    if (data.success) {
      state.tickets = data.tickets;
      renderTicketsTable(data.tickets);
      const counter = document.getElementById('tickets-count-label');
      if (counter) counter.textContent = `${data.tickets.length} ticket(s) affiché(s)`;
    } else {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #ef4444; padding: 2rem;">Erreur de chargement des tickets.</td></tr>`;
    }
  } catch (err) {
    console.error('Erreur chargement tickets:', err);
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #ef4444; padding: 2rem;">Impossible de charger les tickets.</td></tr>`;
  }
}

function renderTicketsTable(tickets) {
  const tableBody = document.getElementById('tickets-table-body');
  if (!tableBody) return;

  if (tickets.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            <i class="fa-solid fa-ticket-simple"></i>
            <h4>Aucun ticket trouvé</h4>
            <p>Aucun ticket ne correspond à votre recherche ou aucun ticket n'a encore été créé.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = tickets.map(ticket => {
    const statusLower = (ticket.status || 'actif').toLowerCase();
    let badgeClass = 'badge-actif';
    if (statusLower === 'utilisé' || statusLower === 'utilise') badgeClass = 'badge-utilise';
    if (statusLower === 'expiré' || statusLower === 'expire') badgeClass = 'badge-expire';
    if (statusLower === 'annulé' || statusLower === 'annule') badgeClass = 'badge-annule';

    const formattedDate = ticket.created_at ? new Date(ticket.created_at).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric'
    }) : '-';

    return `
      <tr>
        <td>
          <div style="font-family: monospace; font-weight: 700; font-size: 0.9375rem; color: #1e3a8a;">
            ${escapeHtml(ticket.code)}
          </div>
        </td>
        <td>
          <div style="font-weight: 600; color: #0f172a;">${escapeHtml(ticket.name)}</div>
        </td>
        <td>
          <div style="max-width: 260px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #64748b;" title="${escapeHtml(ticket.description || '')}">
            ${escapeHtml(ticket.description || '-')}
          </div>
        </td>
        <td>
          <span class="badge ${badgeClass}">${escapeHtml(ticket.status)}</span>
        </td>
        <td>
          <span style="font-size: 0.8125rem; color: #64748b;">${formattedDate}</span>
        </td>
        <td>
          <span style="font-weight: 600; color: #334155;">${ticket.usage_count}</span>
        </td>
        <td>
          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            <button class="btn-table-action btn-table-qr" title="Afficher et imprimer le QR Code" onclick="showTicketQrModal(${ticket.id})">
              <i class="fa-solid fa-qrcode"></i> QR Code
            </button>
            <button class="btn-table-action btn-table-edit" title="Modifier les informations de ce ticket" onclick="openEditTicketModal(${ticket.id})">
              <i class="fa-solid fa-pen-to-square"></i> Modifier
            </button>
            <button class="btn-table-action btn-table-delete" title="Supprimer ce ticket" onclick="promptDeleteTicket(${ticket.id}, '${escapeHtml(ticket.code)}')">
              <i class="fa-solid fa-trash-can"></i> Supprimer
            </button>
            <button class="btn-table-action btn-table-verify" title="Tester la vérification de ce code" onclick="testVerifyFromTable('${escapeHtml(ticket.code)}')">
              <i class="fa-solid fa-shield-halved"></i> Tester
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function testVerifyFromTable(code) {
  switchTab('verify');
  const input = document.getElementById('verify-code-input');
  if (input) {
    input.value = code;
    document.getElementById('btn-clear-code').style.display = 'block';
    performVerification();
  }
}

// Open modal for Create
function openCreateTicketModal() {
  if (!state.currentUser) {
    openLoginModal("Veuillez vous connecter en tant qu'administrateur pour ajouter un ticket.");
    return;
  }

  state.currentEditingTicketId = null;
  document.getElementById('modal-ticket-title').textContent = "Ajouter un nouveau ticket";
  document.getElementById('ticket-form').reset();
  document.getElementById('ticket-id').value = '';
  document.getElementById('ticket-code').value = generateSecureTicketCode();
  document.getElementById('ticket-status').value = 'Actif';
  document.getElementById('ticket-modal-alert').style.display = 'none';

  openModal('modal-ticket');
}

// Open modal for Edit
function openEditTicketModal(ticketId) {
  if (!state.currentUser) {
    openLoginModal("Veuillez vous connecter en tant qu'administrateur pour modifier un ticket.");
    return;
  }

  const ticket = state.tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  state.currentEditingTicketId = ticketId;
  document.getElementById('modal-ticket-title').textContent = "Modifier le ticket";
  document.getElementById('ticket-id').value = ticket.id;
  document.getElementById('ticket-code').value = ticket.code;
  document.getElementById('ticket-name').value = ticket.name;
  document.getElementById('ticket-desc').value = ticket.description || '';
  document.getElementById('ticket-status').value = ticket.status || 'Actif';
  document.getElementById('ticket-valid-until').value = ticket.valid_until || '';
  document.getElementById('ticket-modal-alert').style.display = 'none';

  openModal('modal-ticket');
}

// Handle Form Submit (Add or Edit)
async function handleTicketFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('ticket-id').value;
  const code = document.getElementById('ticket-code').value.trim();
  const name = document.getElementById('ticket-name').value.trim();
  const description = document.getElementById('ticket-desc').value.trim();
  const status = document.getElementById('ticket-status').value;
  const valid_until = document.getElementById('ticket-valid-until').value;
  const alertBox = document.getElementById('ticket-modal-alert');
  const submitBtn = document.getElementById('btn-save-ticket');

  if (!code || !name) {
    alertBox.textContent = "Le code et le nom du ticket sont requis.";
    alertBox.style.display = 'block';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Enregistrement...`;

  try {
    const isEditing = Boolean(id);
    const url = isEditing ? `/api/tickets/${id}` : '/api/tickets';
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, name, description, status, valid_until })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      closeModal('modal-ticket');
      showToast(data.message, "success");
      loadTickets();
      loadStatsSummaryOnly();
    } else {
      // Afficher le message d'erreur précis (ex: "Ce ticket existe déjà.")
      alertBox.textContent = data.message || "Une erreur est survenue lors de l'enregistrement.";
      alertBox.style.display = 'block';
    }
  } catch (err) {
    alertBox.textContent = "Erreur de communication avec le serveur.";
    alertBox.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Enregistrer le ticket`;
  }
}

// Prompt for Deletion
function promptDeleteTicket(id, code) {
  if (!state.currentUser) {
    openLoginModal("Veuillez vous connecter en tant qu'administrateur pour supprimer un ticket.");
    return;
  }

  state.ticketToDelete = id;
  document.getElementById('delete-ticket-code-label').textContent = code;
  openModal('modal-delete-confirm');
}

// Confirm Deletion
async function confirmDeleteTicket() {
  if (!state.ticketToDelete) return;

  const btnConfirm = document.getElementById('btn-confirm-delete');
  btnConfirm.disabled = true;
  btnConfirm.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Suppression...`;

  try {
    const response = await fetch(`/api/tickets/${state.ticketToDelete}`, {
      method: 'DELETE'
    });
    const data = await response.json();

    if (response.ok && data.success) {
      closeModal('modal-delete-confirm');
      showToast(data.message, "success");
      // Actualisation automatique de la liste après suppression
      loadTickets();
      loadStatsSummaryOnly();
    } else {
      showToast(data.message || "Erreur lors de la suppression.", "error");
    }
  } catch (err) {
    showToast("Impossible de supprimer le ticket.", "error");
  } finally {
    btnConfirm.disabled = false;
    btnConfirm.innerHTML = `<i class="fa-solid fa-trash-can"></i> Supprimer définitivement`;
    state.ticketToDelete = null;
  }
}

function generateSecureTicketCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let part1 = '';
  let part2 = '';
  for (let i = 0; i < 4; i++) {
    part1 += chars.charAt(Math.floor(Math.random() * chars.length));
    part2 += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AUTH-${part1}-${part2}`;
}

/* ==========================================================================
   MODULE C : TABLEAU DE BORD (STATS & KPIS)
   ========================================================================== */
async function loadStats() {
  try {
    const response = await fetch('/api/stats/summary');
    const data = await response.json();

    if (data.success) {
      const stats = data.stats;

      // Update KPI counters
      document.getElementById('stat-total-tickets').textContent = stats.totalTickets;
      document.getElementById('stat-total-verifs').textContent = stats.totalVerifications;
      document.getElementById('stat-recognized-codes').textContent = stats.recognizedCodes;
      document.getElementById('stat-unknown-codes').textContent = stats.unknownCodes;

      // Rate
      const rateLabel = document.getElementById('stat-auth-rate');
      if (rateLabel) rateLabel.textContent = `${stats.recognitionRate}%`;

      // Recent tickets in dashboard
      renderRecentTickets(data.recentTickets);

      // Recent verifications in dashboard
      renderRecentVerifications(data.recentVerifications);
    }
  } catch (err) {
    console.error('Erreur chargement statistiques:', err);
  }
}

async function loadStatsSummaryOnly() {
  try {
    const response = await fetch('/api/stats/summary');
    const data = await response.json();
    if (data.success && data.stats) {
      const stats = data.stats;
      const elTickets = document.getElementById('stat-total-tickets');
      const elVerifs = document.getElementById('stat-total-verifs');
      const elRecog = document.getElementById('stat-recognized-codes');
      const elUnk = document.getElementById('stat-unknown-codes');

      if (elTickets) elTickets.textContent = stats.totalTickets;
      if (elVerifs) elVerifs.textContent = stats.totalVerifications;
      if (elRecog) elRecog.textContent = stats.recognizedCodes;
      if (elUnk) elUnk.textContent = stats.unknownCodes;
    }
  } catch (e) {}
}

function renderRecentTickets(tickets) {
  const container = document.getElementById('dashboard-recent-tickets');
  if (!container) return;

  if (!tickets || tickets.length === 0) {
    container.innerHTML = `<div class="empty-state" style="padding: 1.5rem;"><p>Aucun ticket récent.</p></div>`;
    return;
  }

  container.innerHTML = tickets.map(t => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">
      <div>
        <div style="font-weight: 700; font-size: 0.875rem; color: #1e293b;">${escapeHtml(t.name)}</div>
        <div style="font-family: monospace; font-size: 0.8125rem; color: #2563eb; font-weight: 600;">${escapeHtml(t.code)}</div>
      </div>
      <div>
        <span class="badge ${t.status === 'Actif' ? 'badge-actif' : 'badge-utilise'}">${escapeHtml(t.status)}</span>
      </div>
    </div>
  `).join('');
}

function renderRecentVerifications(logs) {
  const container = document.getElementById('dashboard-recent-verifs');
  if (!container) return;

  if (!logs || logs.length === 0) {
    container.innerHTML = `<div class="empty-state" style="padding: 1.5rem;"><p>Aucune vérification récente.</p></div>`;
    return;
  }

  container.innerHTML = logs.map(l => {
    const isAuth = l.is_authentic === 1;
    const time = new Date(l.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    return `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ${isAuth ? '#d1fae5' : '#fee2e2'}; color: ${isAuth ? '#059669' : '#dc2626'}; font-size: 0.75rem;">
            <i class="fa-solid ${isAuth ? 'fa-check' : 'fa-xmark'}"></i>
          </div>
          <div>
            <div style="font-family: monospace; font-weight: 700; font-size: 0.875rem; color: #0f172a;">${escapeHtml(l.searched_code)}</div>
            <div style="font-size: 0.75rem; color: #64748b;">${l.ticket_name ? escapeHtml(l.ticket_name) : 'Code inconnu ou non autorisé'}</div>
          </div>
        </div>
        <div style="text-align: right;">
          <span class="badge ${isAuth ? 'badge-authentic' : 'badge-rejected'}">${isAuth ? 'Authentique' : 'Rejeté'}</span>
          <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 2px;">${time}</div>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   MODULE D : HISTORIQUE COMPLET DES CONTRÔLES
   ========================================================================== */
function initHistory() {
  const searchInput = document.getElementById('history-search-input');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.historySearch = e.target.value;
        loadHistory();
      }, 250);
    });
  }

  // Filter buttons for history
  document.querySelectorAll('.btn-history-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-history-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.historyFilter = btn.getAttribute('data-filter');
      loadHistory();
    });
  });

  // Clear history button
  const btnClearHistory = document.getElementById('btn-clear-history');
  if (btnClearHistory) {
    btnClearHistory.addEventListener('click', promptClearHistory);
  }
}

async function loadHistory() {
  const tableBody = document.getElementById('history-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align: center; padding: 2rem;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 1.5rem; color: #3b82f6;"></i>
        <p style="margin-top: 0.5rem; color: #64748b;">Chargement de l'historique...</p>
      </td>
    </tr>
  `;

  try {
    const params = new URLSearchParams();
    if (state.historyFilter && state.historyFilter !== 'all') {
      params.set('filter', state.historyFilter);
    }
    if (state.historySearch) {
      params.set('q', state.historySearch);
    }

    const response = await fetch(`/api/stats/history?${params.toString()}`);
    const data = await response.json();

    if (data.success) {
      renderHistoryTable(data.logs);
      const counter = document.getElementById('history-count-label');
      if (counter) counter.textContent = `${data.total} contrôle(s) répertorié(s)`;
    } else {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #ef4444; padding: 2rem;">Erreur de chargement.</td></tr>`;
    }
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #ef4444; padding: 2rem;">Impossible de charger l'historique.</td></tr>`;
  }
}

function renderHistoryTable(logs) {
  const tableBody = document.getElementById('history-table-body');
  if (!tableBody) return;

  if (logs.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <h4>Aucun enregistrement</h4>
            <p>Aucune vérification ne correspond à ce filtre.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = logs.map(log => {
    const isAuth = log.is_authentic === 1;
    const dateFormatted = new Date(log.timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    return `
      <tr>
        <td>
          <span style="font-size: 0.8125rem; color: #475569;">${dateFormatted}</span>
        </td>
        <td>
          <div style="font-family: monospace; font-weight: 700; color: #0f172a;">${escapeHtml(log.searched_code)}</div>
        </td>
        <td>
          <span class="badge ${isAuth ? 'badge-authentic' : 'badge-rejected'}">
            <i class="fa-solid ${isAuth ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
            ${isAuth ? 'Authentique' : 'Non reconnu / Rejeté'}
          </span>
        </td>
        <td>
          <span style="font-weight: 600; color: #334155;">${log.ticket_name ? escapeHtml(log.ticket_name) : '<em style="color: #94a3b8;">Inconnu</em>'}</span>
        </td>
        <td>
          ${log.status_at_check ? `<span class="badge badge-actif">${escapeHtml(log.status_at_check)}</span>` : '<span style="color: #94a3b8;">-</span>'}
        </td>
        <td>
          <span style="font-family: monospace; font-size: 0.75rem; color: #64748b;">${escapeHtml(log.ip_address || '127.0.0.1')}</span>
        </td>
      </tr>
    `;
  }).join('');
}

async function promptClearHistory() {
  if (!state.currentUser) {
    openLoginModal("Veuillez vous connecter en tant qu'administrateur pour effacer l'historique.");
    return;
  }

  if (confirm("Êtes-vous sûr de vouloir vider l'ensemble de l'historique des contrôles ? Cette action est irréversible.")) {
    try {
      const res = await fetch('/api/stats/history', { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(data.message, "success");
        loadHistory();
        loadStatsSummaryOnly();
      }
    } catch (err) {
      showToast("Erreur lors de la réinitialisation de l'historique.", "error");
    }
  }
}

/* ==========================================================================
   MODULE E : AUTHENTIFICATION ADMIN & SÉCURITÉ
   ========================================================================== */
function initAuth() {
  const loginBtn = document.getElementById('btn-header-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      if (state.currentUser) {
        logoutUser();
      } else {
        openLoginModal();
      }
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
}

async function checkAuthStatus() {
  try {
    const response = await fetch('/api/auth/me');
    const data = await response.json();
    if (data.authenticated && data.user) {
      setLoggedInUser(data.user);
    } else {
      setLoggedOutUser();
    }
  } catch (e) {
    setLoggedOutUser();
  }
}

function setLoggedInUser(user) {
  state.currentUser = user;
  const loginBtn = document.getElementById('btn-header-login');
  const userBadge = document.getElementById('header-user-badge');
  const adminName = document.getElementById('header-user-name');

  if (loginBtn) {
    loginBtn.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> Déconnexion`;
    loginBtn.classList.remove('btn-secondary');
    loginBtn.classList.add('btn-danger', 'btn-sm');
  }

  if (userBadge) userBadge.style.display = 'inline-flex';
  if (adminName) adminName.textContent = user.username;

  // Show admin elements
  document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
  const settingsAdminCard = document.getElementById('settings-admin-card');
  if (settingsAdminCard) settingsAdminCard.style.display = 'block';
}

function setLoggedOutUser() {
  state.currentUser = null;
  const loginBtn = document.getElementById('btn-header-login');
  const userBadge = document.getElementById('header-user-badge');

  if (loginBtn) {
    loginBtn.innerHTML = `<i class="fa-solid fa-lock"></i> Connexion Admin`;
    loginBtn.classList.remove('btn-danger', 'btn-sm');
    loginBtn.classList.add('btn-secondary');
  }

  if (userBadge) userBadge.style.display = 'none';

  // Hide or restrict some admin controls
  const settingsAdminCard = document.getElementById('settings-admin-card');
  if (settingsAdminCard) settingsAdminCard.style.display = 'none';
}

function openLoginModal(customMessage) {
  const alertBox = document.getElementById('login-modal-alert');
  if (alertBox) {
    if (customMessage) {
      alertBox.textContent = customMessage;
      alertBox.style.display = 'block';
      alertBox.className = 'toast warning';
    } else {
      alertBox.style.display = 'none';
    }
  }
  document.getElementById('login-username').value = 'admin';
  document.getElementById('login-password').value = '';
  openModal('modal-login');
}

async function handleLoginSubmit(e) {
  e.preventDefault();

  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const alertBox = document.getElementById('login-modal-alert');
  const submitBtn = document.getElementById('btn-submit-login');

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Connexion...`;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setLoggedInUser(data.user);
      closeModal('modal-login');
      showToast("Connexion administrateur réussie !", "success");
    } else {
      alertBox.textContent = data.message || "Identifiants incorrects.";
      alertBox.style.display = 'block';
      alertBox.className = 'toast error';
    }
  } catch (err) {
    alertBox.textContent = "Erreur réseau lors de la tentative de connexion.";
    alertBox.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fa-solid fa-lock-open"></i> Se connecter`;
  }
}

async function logoutUser() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    setLoggedOutUser();
    showToast("Vous avez été déconnecté.", "warning");
    // Reload tickets view if needed
    if (state.activeTab === 'tickets') loadTickets();
  } catch (e) {
    setLoggedOutUser();
  }
}

/* ==========================================================================
   MODULE F : PARAMÈTRES ET MOT DE PASSE
   ========================================================================== */
function initSettings() {
  const pwdForm = document.getElementById('change-password-form');
  if (pwdForm) {
    pwdForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const currentPassword = document.getElementById('pwd-current').value;
      const newPassword = document.getElementById('pwd-new').value;
      const confirmPassword = document.getElementById('pwd-confirm').value;
      const alertBox = document.getElementById('pwd-alert');

      if (newPassword !== confirmPassword) {
        alertBox.textContent = "Les deux nouveaux mots de passe ne correspondent pas.";
        alertBox.style.display = 'block';
        return;
      }

      try {
        const res = await fetch('/api/auth/change-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentPassword, newPassword })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showToast(data.message, "success");
          pwdForm.reset();
          alertBox.style.display = 'none';
        } else {
          alertBox.textContent = data.message || "Erreur de modification.";
          alertBox.style.display = 'block';
        }
      } catch (err) {
        alertBox.textContent = "Erreur de communication avec le serveur.";
        alertBox.style.display = 'block';
      }
    });
  }
}

/* ==========================================================================
   UTILITAIRES MODALES & TOASTS
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

// Global modal background click and close buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
  if (e.target.closest('.btn-close-modal') || e.target.closest('.btn-modal-cancel')) {
    const modal = e.target.closest('.modal-overlay');
    if (modal) modal.classList.remove('open');
  }
});

// Toast notification display
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-xmark';
  if (type === 'warning') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="font-size: 1.125rem;"></i>
    <div style="flex: 1; font-weight: 500;">${escapeHtml(message)}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 300ms ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   MODULE PWA & ACCÈS RÉSEAU LOCAL (WI-FI)
   ========================================================================== */
// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('✅ Service Worker Authentique Contrôle enregistré.');
    }).catch(err => {
      console.log('SW reg info:', err.message);
    });
  });
}

// PWA Install Prompt Banner
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('btn-install-pwa');
  if (installBtn) {
    installBtn.style.display = 'inline-flex';
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          installBtn.style.display = 'none';
          showToast("Application installée avec succès !", "success");
        }
        deferredPrompt = null;
      }
    });
  }
});

// Load Network Information from Server (Local Wi-Fi IP or Public Cloud URL)
async function loadNetworkInfo() {
  try {
    const origin = window.location.origin;
    // If running online (e.g. on Render)
    if (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1') && !origin.endsWith('.local')) {
      const input = document.getElementById('network-url-input');
      const qrImg = document.getElementById('network-qr-code');
      if (input) input.value = origin;
      if (qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(origin)}`;
      }
      return;
    }

    const res = await fetch('/api/network-info');
    const data = await res.json();
    if (data && data.primaryNetworkUrl) {
      const input = document.getElementById('network-url-input');
      const qrImg = document.getElementById('network-qr-code');
      if (input) input.value = data.primaryNetworkUrl;
      if (qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(data.primaryNetworkUrl)}`;
      }
    }
  } catch (e) {
    // Keep fallback
  }
}

// Copy URL utility
function copyNetworkUrl() {
  const input = document.getElementById('network-url-input');
  if (input) {
    navigator.clipboard.writeText(input.value).then(() => {
      showToast("Lien Wi-Fi copié ! Collez-le sur votre téléphone.", "success");
    }).catch(() => {
      input.select();
      document.execCommand('copy');
      showToast("Lien Wi-Fi copié !", "success");
    });
  }
}

// Call on startup
document.addEventListener('DOMContentLoaded', () => {
  loadNetworkInfo();
});

// Expose globals for onclick attributes
window.switchTab = switchTab;
window.openEditTicketModal = openEditTicketModal;
window.promptDeleteTicket = promptDeleteTicket;
window.testVerifyFromTable = testVerifyFromTable;
window.openCreateTicketModal = openCreateTicketModal;
window.openLoginModal = openLoginModal;
window.closeModal = closeModal;
window.copyNetworkUrl = copyNetworkUrl;
window.openCameraScanner = openCameraScanner;
window.closeCameraScanner = closeCameraScanner;
window.showTicketQrModal = showTicketQrModal;

/* ==========================================================================
   MODULE SCANNER CAMÉRA EN DIRECT (QR CODE & CODE-BARRES)
   ========================================================================== */
let html5QrCode = null;
let isScannerRunning = false;
let currentFacingMode = "environment"; // default to smartphone back camera

function playScanBeep(isSuccess = true) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isSuccess) {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {}
}

function initCameraScanner() {
  const closeBtn = document.getElementById('btn-close-scanner');
  if (closeBtn) closeBtn.addEventListener('click', closeCameraScanner);

  const cancelBtn = document.getElementById('btn-cancel-scanner');
  if (cancelBtn) cancelBtn.addEventListener('click', closeCameraScanner);

  const toggleCamBtn = document.getElementById('btn-toggle-camera');
  if (toggleCamBtn) {
    toggleCamBtn.addEventListener('click', async () => {
      currentFacingMode = (currentFacingMode === "environment") ? "user" : "environment";
      await restartCameraScanner();
    });
  }

  // File scan input
  const fileInput = document.getElementById('qr-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        try {
          if (!html5QrCode) {
            html5QrCode = new Html5Qrcode("qr-reader");
          }
          const decodedText = await html5QrCode.scanFile(file, true);
          handleScanSuccess(decodedText);
        } catch (err) {
          console.error('Erreur lecture image QR:', err);
          showToast("Aucun code détecté dans l'image sélectionnée.", "error");
        }
      }
    });
  }
}

async function openCameraScanner() {
  const modal = document.getElementById('modal-camera-scanner');
  if (modal) modal.classList.add('open');
  const errBox = document.getElementById('scanner-error-message');
  if (errBox) errBox.style.display = 'none';

  if (typeof Html5Qrcode === 'undefined') {
    showToast("Le module scanner se prépare...", "warning");
    return;
  }

  try {
    if (!html5QrCode) {
      html5QrCode = new Html5Qrcode("qr-reader");
    }

    try {
      const cameras = await Html5Qrcode.getCameras();
      if (cameras && cameras.length > 1) {
        const toggleCamBtn = document.getElementById('btn-toggle-camera');
        if (toggleCamBtn) toggleCamBtn.style.display = 'inline-flex';
      }
    } catch (e) {}

    await startScannerStream();
  } catch (err) {
    console.error('Erreur démarrage scanner:', err);
    showCameraError("Veuillez autoriser l'accès à la caméra de votre smartphone dans votre navigateur.");
  }
}

async function startScannerStream() {
  if (isScannerRunning) return;

  const config = {
    fps: 15,
    qrbox: (viewfinderWidth, viewfinderHeight) => {
      const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
      const edge = Math.floor(minEdge * 0.75);
      return { width: edge, height: edge };
    },
    aspectRatio: 1.0,
    experimentalFeatures: {
      useBarCodeDetectorIfSupported: true
    }
  };

  try {
    await html5QrCode.start(
      { facingMode: currentFacingMode },
      config,
      (decodedText) => {
        handleScanSuccess(decodedText);
      },
      (errorMessage) => {
        // Continuous search
      }
    );
    isScannerRunning = true;
  } catch (startErr) {
    console.warn("Échec caméra facingMode, tentative par défaut :", startErr);
    // Fallback: start with default camera
    const cameras = await Html5Qrcode.getCameras();
    if (cameras && cameras.length > 0) {
      const cameraId = cameras[cameras.length - 1].id;
      await html5QrCode.start(
        cameraId,
        config,
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        () => {}
      );
      isScannerRunning = true;
    } else {
      throw startErr;
    }
  }
}

async function restartCameraScanner() {
  if (html5QrCode && isScannerRunning) {
    try {
      await html5QrCode.stop();
    } catch (e) {}
    isScannerRunning = false;
  }
  await startScannerStream();
}

async function closeCameraScanner() {
  if (html5QrCode && isScannerRunning) {
    try {
      await html5QrCode.stop();
    } catch (e) {
      console.error('Erreur arrêt scanner:', e);
    }
    isScannerRunning = false;
  }

  const modal = document.getElementById('modal-camera-scanner');
  if (modal) modal.classList.remove('open');
  const errBox = document.getElementById('scanner-error-message');
  if (errBox) errBox.style.display = 'none';
}

function handleScanSuccess(scannedCode) {
  playScanBeep(true);
  closeCameraScanner();

  const input = document.getElementById('verify-code-input');
  const clearBtn = document.getElementById('btn-clear-code');
  if (input) {
    input.value = scannedCode.trim();
    if (clearBtn) clearBtn.style.display = 'block';
  }

  showToast(`Code scanné avec succès : ${scannedCode.trim()}`, "success");
  performVerification();
}

function showCameraError(msg) {
  const errBox = document.getElementById('scanner-error-message');
  if (errBox) {
    errBox.textContent = msg;
    errBox.style.display = 'block';
  }
  showToast(msg, "error");
}

/* ==========================================================================
   MODULE MODALE QR CODE DE BILLET (AFFICHAGE & IMPRESSION)
   ========================================================================== */
function initTicketQrModal() {
  const closeBtn = document.getElementById('btn-close-ticket-qr');
  if (closeBtn) closeBtn.addEventListener('click', () => closeModal('modal-ticket-qr'));

  const printBtn = document.getElementById('btn-print-qr');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const downloadBtn = document.getElementById('btn-download-qr');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const img = document.getElementById('ticket-qr-image');
      if (img && img.src) {
        const a = document.createElement('a');
        a.href = img.src;
        a.download = `ticket-qr-${document.getElementById('ticket-qr-code-text').textContent.trim()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast("Téléchargement du QR Code lancé", "success");
      }
    });
  }
}

function showTicketQrModal(ticketId) {
  const ticket = state.tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  document.getElementById('ticket-qr-name').textContent = ticket.name;
  document.getElementById('ticket-qr-code-text').textContent = ticket.code;

  const statusBadge = document.getElementById('ticket-qr-status');
  statusBadge.textContent = ticket.status;
  statusBadge.className = `badge badge-${ticket.status.toLowerCase()}`;

  // High-res QR code
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(ticket.code)}`;
  const qrImg = document.getElementById('ticket-qr-image');
  qrImg.src = qrUrl;

  openModal('modal-ticket-qr');
}

/* ==========================================================================
   MODULE GÉNÉRATEUR DE TICKETS & PASS HOLOGRAPHIQUES ("COOL STUDIO")
   ========================================================================== */
state.lastGeneratedTicket = null;
state.lastGeneratedBatch = [];
state.soundEnabled = localStorage.getItem('sound_enabled') !== 'false';

// Modèles prédéfinis de billets (Cool Presets)
const TICKET_PRESETS = {
  'concert-vip': {
    name: 'Concert Live Dakar 2026',
    theme: 'gold',
    category: 'Pass VIP Or',
    holder: 'Mamadou Diallo',
    seat: 'Loge VIP - Table 04',
    price: '35 000 FCFA',
    prefix: 'VIP'
  },
  'festival-pass': {
    name: 'Festival Yaakar Électro 2026',
    theme: 'cyber',
    category: 'Billet Standard',
    holder: 'Pass Festivalier',
    seat: 'Fosse Centrale - Accès Général',
    price: '15 000 FCFA',
    prefix: 'FEST'
  },
  'gala-prestige': {
    name: 'Gala Prestige de Bienfaisance',
    theme: 'emerald',
    category: 'Accès Platine',
    holder: 'Aïssatou Sow',
    seat: 'Table d\'Honneur - Siège 2',
    price: '50 000 FCFA',
    prefix: 'GALA'
  },
  'conference-tech': {
    name: 'Sommet Tech & Innovation 2026',
    theme: 'purple',
    category: 'Early Bird',
    holder: 'Participant Pro',
    seat: 'Amphithéâtre A - Siège B12',
    price: '20 000 FCFA',
    prefix: 'TECH'
  }
};

function initGenerator() {
  init3DCardTilt();
  initGeneratorLiveSync();
  initSoundToggle();
  updateGeneratorAuthBanner();

  const form = document.getElementById('ticket-generator-form');
  if (form) {
    form.addEventListener('submit', handleGeneratorSubmit);
  }
}

// Synchronisation en direct entre formulaire et pass 3D
function initGeneratorLiveSync() {
  const eventInput = document.getElementById('gen-event-name');
  const catInput = document.getElementById('gen-category');
  const holderInput = document.getElementById('gen-holder-name');
  const seatInput = document.getElementById('gen-seat');
  const priceInput = document.getElementById('gen-price');
  const prefixInput = document.getElementById('gen-prefix');

  if (eventInput) {
    eventInput.addEventListener('input', () => {
      document.getElementById('preview-event-name').textContent = eventInput.value.trim() || 'Titre de l\'Événement';
    });
  }

  if (catInput) {
    catInput.addEventListener('change', () => {
      document.getElementById('preview-category').textContent = catInput.value;
    });
  }

  if (holderInput) {
    holderInput.addEventListener('input', () => {
      document.getElementById('preview-holder-name').textContent = holderInput.value.trim() || 'Titulaire';
    });
  }

  if (seatInput) {
    seatInput.addEventListener('input', () => {
      document.getElementById('preview-seat').textContent = seatInput.value.trim() || 'Accès Général';
    });
  }

  if (priceInput) {
    priceInput.addEventListener('input', () => {
      document.getElementById('preview-price').textContent = priceInput.value.trim() || 'Gratuit';
    });
  }

  if (prefixInput) {
    prefixInput.addEventListener('input', () => {
      const pfx = prefixInput.value.trim().toUpperCase() || 'PASS';
      const sampleCode = `${pfx}-2026-X892`;
      document.getElementById('preview-ticket-code').textContent = sampleCode;
      document.getElementById('preview-barcode-text').textContent = `*${sampleCode}*`;
      document.getElementById('preview-qr-img').src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(sampleCode)}`;
    });
  }

  // Sélecteur de thèmes
  document.querySelectorAll('.theme-choice').forEach(choice => {
    choice.addEventListener('click', () => {
      document.querySelectorAll('.theme-choice').forEach(c => c.classList.remove('active'));
      choice.classList.add('active');
      const radio = choice.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      const theme = choice.getAttribute('data-theme');
      applyVisualTheme(theme);
    });
  });
}

function applyVisualTheme(themeName) {
  const card = document.getElementById('cool-pass-card');
  if (!card) return;
  card.className = `cool-pass-card theme-${themeName}`;
}

// Appliquer un préréglage complet en 1 clic
function applyTicketPreset(presetKey) {
  const preset = TICKET_PRESETS[presetKey];
  if (!preset) return;

  document.getElementById('gen-event-name').value = preset.name;
  document.getElementById('gen-category').value = preset.category;
  document.getElementById('gen-holder-name').value = preset.holder;
  document.getElementById('gen-seat').value = preset.seat;
  document.getElementById('gen-price').value = preset.price;
  document.getElementById('gen-prefix').value = preset.prefix;

  // Thème
  document.querySelectorAll('.theme-choice').forEach(choice => {
    if (choice.getAttribute('data-theme') === preset.theme) {
      choice.classList.add('active');
      choice.querySelector('input').checked = true;
    } else {
      choice.classList.remove('active');
    }
  });

  applyVisualTheme(preset.theme);

  // Mettre à jour l'aperçu
  document.getElementById('preview-event-name').textContent = preset.name;
  document.getElementById('preview-category').textContent = preset.category;
  document.getElementById('preview-holder-name').textContent = preset.holder;
  document.getElementById('preview-seat').textContent = preset.seat;
  document.getElementById('preview-price').textContent = preset.price;
  const sampleCode = `${preset.prefix}-2026-X892`;
  document.getElementById('preview-ticket-code').textContent = sampleCode;
  document.getElementById('preview-barcode-text').textContent = `*${sampleCode}*`;
  document.getElementById('preview-qr-img').src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(sampleCode)}`;

  playLaserScanSound();
  showToast(`Modèle "${preset.name}" appliqué !`, "success");
}

// Effet 3D Tilt interactif réaliste
function init3DCardTilt() {
  const scene = document.getElementById('ticket-3d-scene');
  const card = document.getElementById('cool-pass-card');
  if (!scene || !card) return;

  scene.addEventListener('mousemove', (e) => {
    const rect = scene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  scene.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

// Mise à jour du bandeau d'authentification
function updateGeneratorAuthBanner() {
  const banner = document.getElementById('gen-auth-banner');
  if (!banner) return;
  if (state.currentUser) {
    banner.style.display = 'none';
  } else {
    banner.style.display = 'flex';
  }
}

// Connexion Admin 1-Clic Démo
async function quickAdminLogin() {
  const btn = document.getElementById('btn-quick-admin-login');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Connexion...`;
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin1234' })
    });
    const data = await res.json();
    if (data.success) {
      state.currentUser = data.user;
      updateAuthUI();
      updateGeneratorAuthBanner();
      playSuccessChime();
      showToast("Connecté avec succès en tant qu'administrateur !", "success");
    } else {
      showToast(data.message || "Erreur de connexion.", "error");
    }
  } catch (err) {
    showToast("Impossible de se connecter au serveur.", "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-bolt"></i> Connexion Démo 1-Clic (admin)`;
    }
  }
}

// Traitement de la génération de ticket(s)
async function handleGeneratorSubmit(e) {
  e.preventDefault();

  // Si non connecté, proposer connexion 1-clic automatique
  if (!state.currentUser) {
    await quickAdminLogin();
    if (!state.currentUser) {
      showToast("Veuillez vous connecter en tant qu'administrateur pour générer des billets.", "error");
      return;
    }
  }

  const name = document.getElementById('gen-event-name').value.trim();
  const category = document.getElementById('gen-category').value;
  const holder_name = document.getElementById('gen-holder-name').value.trim();
  const seat = document.getElementById('gen-seat').value.trim();
  const price = document.getElementById('gen-price').value.trim();
  const valid_until = document.getElementById('gen-valid-until').value;
  const count = parseInt(document.getElementById('gen-count').value, 10) || 1;
  const prefix = document.getElementById('gen-prefix').value.trim();

  const themeRadio = document.querySelector('input[name="gen-theme"]:checked');
  const theme = themeRadio ? themeRadio.value : 'gold';

  const alertBox = document.getElementById('gen-alert-box');
  const submitBtn = document.getElementById('btn-submit-generator');

  alertBox.style.display = 'none';
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Génération et certification...`;

  try {
    const res = await fetch('/api/tickets/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        category,
        theme,
        holder_name,
        seat,
        price,
        valid_until,
        count,
        prefix
      })
    });

    const data = await res.json();

    if (!data.success) {
      alertBox.textContent = data.message || "Erreur lors de la génération.";
      alertBox.style.display = 'block';
      showToast(data.message || "Échec de génération.", "error");
      return;
    }

    // Succès !
    state.lastGeneratedTicket = data.ticket;
    state.lastGeneratedBatch = data.tickets || [data.ticket];

    // Mettre à jour la carte 3D avec le code réel généré
    const officialCode = data.ticket.code;
    document.getElementById('preview-ticket-code').textContent = officialCode;
    document.getElementById('preview-barcode-text').textContent = `*${officialCode}*`;
    document.getElementById('preview-qr-img').src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(officialCode)}`;

    // Afficher le deck de résultat
    const resultDeck = document.getElementById('generator-result-deck');
    resultDeck.style.display = 'block';
    document.getElementById('result-ticket-title').textContent = count === 1 
      ? `Ticket "${officialCode}" Prêt pour le Contrôle`
      : `${count} Tickets Générés avec Succès (Code principal : ${officialCode})`;

    // Lot de billets si > 1
    const batchContainer = document.getElementById('generator-batch-container');
    const batchList = document.getElementById('generator-batch-list');
    if (count > 1 && data.tickets) {
      batchContainer.style.display = 'block';
      batchList.innerHTML = data.tickets.map(t => `
        <div class="batch-ticket-chip">
          <strong>${escapeHtml(t.code)}</strong>
          <span style="font-size: 0.8125rem; color: #475569;">${escapeHtml(t.name)}</span>
          <button type="button" class="btn btn-secondary btn-sm" onclick="verifySpecificCode('${escapeHtml(t.code)}')">
            <i class="fa-solid fa-shield-halved" style="color: #2563eb;"></i> Vérifier ce ticket
          </button>
        </div>
      `).join('');
    } else {
      batchContainer.style.display = 'none';
    }

    // Scroll vers le résultat
    resultDeck.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Célébration spectaculaire : Confettis + Son futuriste !
    fireConfetti();
    playFuturisticSound();
    showToast(data.message, "success");

    // Actualiser les statistiques et la liste des tickets en arrière-plan
    loadStatsSummaryOnly();

  } catch (err) {
    console.error('Erreur génération ticket:', err);
    alertBox.textContent = "Impossible de communiquer avec le serveur.";
    alertBox.style.display = 'block';
    showToast("Erreur de connexion.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Générer le Ticket Authentique`;
  }
}

// ==========================================================================
// ACTION 1 : VÉRIFIER LE TICKET GÉNÉRÉ MAINTENANT (Cœur de la demande !)
// ==========================================================================
async function verifyGeneratedTicketNow() {
  if (!state.lastGeneratedTicket || !state.lastGeneratedTicket.code) {
    showToast("Aucun ticket récemment généré à vérifier.", "warning");
    return;
  }

  const codeToVerify = state.lastGeneratedTicket.code;

  // 1. Basculer sur l'onglet Vérifier
  switchTab('verify');

  // 2. Remplir le champ de recherche
  const input = document.getElementById('verify-code-input');
  const clearBtn = document.getElementById('btn-clear-code');
  if (input) {
    input.value = codeToVerify;
    if (clearBtn) clearBtn.style.display = 'block';
  }

  // 3. Défiler tout en haut en douceur
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 4. Jouer le son de certification et lancer la vérification immédiatement
  playSuccessChime();
  await performVerification();
  showToast(`Ticket ${codeToVerify} certifié avec succès !`, "success");
}

function verifySpecificCode(code) {
  switchTab('verify');
  const input = document.getElementById('verify-code-input');
  const clearBtn = document.getElementById('btn-clear-code');
  if (input) {
    input.value = code;
    if (clearBtn) clearBtn.style.display = 'block';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  playSuccessChime();
  performVerification();
}

// ==========================================================================
// ACTION 2 : TESTER LE SCAN CAMÉRA
// ==========================================================================
function testScanGeneratedTicket() {
  if (!state.lastGeneratedTicket) return;
  showTicketQrModal(state.lastGeneratedTicket.id);
  playLaserScanSound();
}

// ==========================================================================
// ACTION 3 : IMPRIMER LE BILLET / PASS RÉEL
// ==========================================================================
function printGeneratedPass() {
  playLaserScanSound();
  window.print();
}

// ==========================================================================
// ACTION 4 : PARTAGER SUR WHATSAPP
// ==========================================================================
function shareGeneratedTicketWhatsApp() {
  if (!state.lastGeneratedTicket) return;
  const t = state.lastGeneratedTicket;
  const origin = window.location.origin;

  const message = `🎟️ *VOTRE BILLET OFFICIEL ET SÉCURISÉ*\n\n` +
    `📌 *Événement :* ${t.name}\n` +
    `🔑 *Code Unique :* ${t.code}\n` +
    `✅ *Statut :* Authentique & Garanti\n\n` +
    `🔍 Pour certifier et vérifier l'authenticité de votre pass en 1 clic :\n` +
    `${origin}\n\n` +
    `_Conservez ce message pour le contrôle d'accès à l'entrée._`;

  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  showToast("Lien WhatsApp ouvert !", "success");
}

// Exporter la liste des tickets générés en CSV
function exportGeneratedBatchCsv() {
  if (!state.lastGeneratedBatch || state.lastGeneratedBatch.length === 0) return;

  const header = ['Code', 'Nom / Événement', 'Description', 'Statut', 'Date de création'];
  const rows = state.lastGeneratedBatch.map(t => [
    `"${t.code}"`,
    `"${t.name.replace(/"/g, '""')}"`,
    `"${(t.description || '').replace(/"/g, '""')}"`,
    `"${t.status}"`,
    `"${t.created_at}"`
  ]);

  const csvContent = '\uFEFF' + [header.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lot-tickets-${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Fichier CSV téléchargé avec succès !", "success");
}

// ==========================================================================
// EFFETS SONORES HAUTE TECHNOLOGIE (Web Audio API - Zéro latence)
// ==========================================================================
function initSoundToggle() {
  const btn = document.getElementById('btn-toggle-sound');
  if (!btn) return;

  updateSoundButtonUI(btn);

  btn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem('sound_enabled', state.soundEnabled ? 'true' : 'false');
    updateSoundButtonUI(btn);
    if (state.soundEnabled) {
      playSuccessChime();
      showToast("Effets sonores activés", "success");
    } else {
      showToast("Effets sonores désactivés", "info");
    }
  });
}

function updateSoundButtonUI(btn) {
  if (state.soundEnabled) {
    btn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    btn.classList.remove('muted');
  } else {
    btn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    btn.classList.add('muted');
  }
}

function playFuturisticSound() {
  if (!state.soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // 1. Synthétiseur balayage montant (Glissando cyber)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);

    // 2. Chime cristallin aigu
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chime.type = 'triangle';
    chime.frequency.setValueAtTime(1760, ctx.currentTime + 0.15); // A6
    chimeGain.gain.setValueAtTime(0.18, ctx.currentTime + 0.15);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chime.start(ctx.currentTime + 0.15);
    chime.stop(ctx.currentTime + 0.6);
  } catch (e) {}
}

function playSuccessChime() {
  if (!state.soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Accord majeur triomphal (C5, E5, G5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch (e) {}
}

function playLaserScanSound() {
  if (!state.soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

// ==========================================================================
// FEU D'ARTIFICE DE CONFETTIS (Canvas Léger et Indépendant)
// ==========================================================================
function fireConfetti() {
  let canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const particles = [];
  const colors = ['#2563eb', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#e2e8f0'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.75) * 22,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 14,
      gravity: 0.45,
      opacity: 1
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.opacity -= 0.012;

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }
  render();
}

// Expose les fonctions globales pour les événements HTML
window.applyTicketPreset = applyTicketPreset;
window.quickAdminLogin = quickAdminLogin;
window.verifyGeneratedTicketNow = verifyGeneratedTicketNow;
window.verifySpecificCode = verifySpecificCode;
window.testScanGeneratedTicket = testScanGeneratedTicket;
window.printGeneratedPass = printGeneratedPass;
window.shareGeneratedTicketWhatsApp = shareGeneratedTicketWhatsApp;
window.exportGeneratedBatchCsv = exportGeneratedBatchCsv;

