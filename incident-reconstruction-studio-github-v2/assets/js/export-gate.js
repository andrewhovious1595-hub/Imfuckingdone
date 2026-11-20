/*
 * Incident Reconstruction Studio — Modular Export & Payment Access Gate
 *
 * Purpose:
 *   Allows users to build full visual exhibits inside the Studio while routing
 *   every download/export/print action through a single access-control boundary.
 *
 * Integration Guide (when ready to connect a payment provider):
 *   1. Set EXPORT_GATE_CONFIG.mode = 'checkout'
 *   2. Set EXPORT_GATE_CONFIG.checkoutUrl to your hosted payment endpoint
 *      (e.g., Stripe Checkout Session URL or Authorize.net Accept Hosted endpoint), OR
 *   3. Replace EXPORT_GATE_CONFIG.verifyEntitlement() with your server-backed
 *      session/license verification check.
 */
(() => {
  const EXPORT_GATE_CONFIG = {
    // 'preview'  -> Shows the Export Access Gate modal and allows pre-launch download.
    // 'checkout' -> Requires verifyEntitlement() to return true or redirects to checkoutUrl.
    mode: 'preview',
    checkoutUrl: '',
    async verifyEntitlement() {
      return false;
    }
  };

  let pendingAction = null;

  function ensureModal() {
    let backdrop = document.getElementById('exportGateBackdrop');
    if (backdrop) return backdrop;

    backdrop = document.createElement('div');
    backdrop.id = 'exportGateBackdrop';
    backdrop.className = 'gate-backdrop hidden';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-labelledby', 'gateModalTitle');
    backdrop.innerHTML = `
      <div class="gate-modal">
        <div class="gate-header">
          <div>
            <span class="status-pill" id="gateModeBadge">Export Access Checkpoint</span>
            <h2 id="gateModalTitle" style="margin-top:10px">Prepare Exhibit Export</h2>
          </div>
          <button type="button" class="btn mini" id="gateCloseBtn" aria-label="Close export dialog">Close</button>
        </div>
        <p class="muted" id="gateDescription" style="margin:0 0 12px"></p>
        <div class="gate-summary" id="gateSummary"></div>
        <div class="info-box" id="gateStatusNote"></div>
        <div class="gate-actions">
          <button type="button" class="btn" id="gateCancelBtn">Return to Studio</button>
          <button type="button" class="btn primary" id="gateConfirmBtn">Continue to Export</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    const close = () => {
      backdrop.classList.add('hidden');
      pendingAction = null;
    };

    backdrop.querySelector('#gateCloseBtn').addEventListener('click', close);
    backdrop.querySelector('#gateCancelBtn').addEventListener('click', close);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !backdrop.classList.contains('hidden')) close();
    });

    backdrop.querySelector('#gateConfirmBtn').addEventListener('click', () => {
      if (EXPORT_GATE_CONFIG.mode === 'checkout') {
        if (EXPORT_GATE_CONFIG.checkoutUrl) {
          window.location.href = EXPORT_GATE_CONFIG.checkoutUrl;
        }
        return;
      }
      const fn = pendingAction;
      close();
      if (typeof fn === 'function') fn();
    });

    return backdrop;
  }

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  async function requestExport(exportLabel, projectSummary, executeFn) {
    if (EXPORT_GATE_CONFIG.mode === 'checkout') {
      const entitled = await EXPORT_GATE_CONFIG.verifyEntitlement();
      if (entitled) {
        executeFn();
        return;
      }
    }

    const backdrop = ensureModal();
    pendingAction = executeFn;

    backdrop.querySelector('#gateModalTitle').textContent = exportLabel;
    backdrop.querySelector('#gateDescription').textContent =
      'Review your current exhibit contents before exporting. All scene data remains in your browser session.';

    const summaryEl = backdrop.querySelector('#gateSummary');
    summaryEl.innerHTML = `
      <div class="gate-stat"><span>Project</span><strong>${esc(projectSummary.title || 'Untitled')}</strong></div>
      <div class="gate-stat"><span>Export Format</span><strong>${esc(projectSummary.format)}</strong></div>
      <div class="gate-stat"><span>Routes / Markers</span><strong>${projectSummary.routes} routes · ${projectSummary.markers} markers</strong></div>
      <div class="gate-stat"><span>Chronology / Evidence</span><strong>${projectSummary.events} events · ${projectSummary.evidence} items</strong></div>
    `;

    const noteEl = backdrop.querySelector('#gateStatusNote');
    const confirmBtn = backdrop.querySelector('#gateConfirmBtn');

    if (EXPORT_GATE_CONFIG.mode === 'checkout') {
      backdrop.querySelector('#gateModeBadge').textContent = 'Licensed Export Required';
      noteEl.textContent = EXPORT_GATE_CONFIG.checkoutUrl
        ? 'Complete checkout to unlock exhibit downloads for this workspace.'
        : 'Checkout mode is enabled, but checkoutUrl has not been configured yet in assets/js/export-gate.js.';
      confirmBtn.textContent = EXPORT_GATE_CONFIG.checkoutUrl ? 'Proceed to Checkout' : 'Checkout Not Configured';
      confirmBtn.disabled = !EXPORT_GATE_CONFIG.checkoutUrl;
    } else {
      backdrop.querySelector('#gateModeBadge').textContent = 'Pre-Launch Export Access';
      noteEl.textContent =
        'Payment processing is not yet enabled. You can export your exhibit now during pre-launch access. When billing is configured, this checkpoint connects directly to checkout.';
      confirmBtn.textContent = 'Download / Export Now';
      confirmBtn.disabled = false;
    }

    backdrop.classList.remove('hidden');
    confirmBtn.focus();
  }

  window.ExhibitExportGate = {
    config: EXPORT_GATE_CONFIG,
    requestExport
  };
})();
