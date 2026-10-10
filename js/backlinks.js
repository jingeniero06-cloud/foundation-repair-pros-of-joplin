// Joplin High-Authority Backlinks Outreach CRM & Pitch Engine
// Version 2.1.0 (Universal Bulletproof Edition)

let activeMarketFilter = 'all';
let activeTierFilter = 'all';
let activeSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  if (typeof BMG_BACKLINK_TARGETS === 'undefined') {
    console.error('BMG_BACKLINK_TARGETS dataset not loaded!');
    return;
  }

  initBacklinksCRM();
  renderBacklinkCards();
});

function initBacklinksCRM() {
  const marketTabs = document.querySelectorAll('[data-market-tab]');
  const tierSelect = document.getElementById('tierFilterSelect');
  const searchInput = document.getElementById('targetSearchInput');
  const resetBtn = document.getElementById('resetBacklinkFilters');

  marketTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      marketTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeMarketFilter = tab.getAttribute('data-market-tab');
      renderBacklinkCards();
    });
  });

  tierSelect?.addEventListener('change', () => {
    activeTierFilter = tierSelect.value;
    renderBacklinkCards();
  });

  searchInput?.addEventListener('input', () => {
    activeSearchQuery = searchInput.value.toLowerCase().trim();
    renderBacklinkCards();
  });

  resetBtn?.addEventListener('click', () => {
    activeMarketFilter = 'all';
    activeTierFilter = 'all';
    activeSearchQuery = '';
    if (tierSelect) tierSelect.value = 'all';
    if (searchInput) searchInput.value = '';
    marketTabs.forEach(t => t.classList.remove('active'));
    document.querySelector('[data-market-tab="all"]')?.classList.add('active');
    renderBacklinkCards();
  });
}

function getStoredStatus(targetId) {
  try {
    return localStorage.getItem(`joplin_crm_status_${targetId}`) || 'Not Contacted';
  } catch (e) {
    return 'Not Contacted';
  }
}

function setStoredStatus(targetId, status) {
  try {
    localStorage.setItem(`joplin_crm_status_${targetId}`, status);
    if (typeof showToast === 'function') {
      showToast(`Status updated to: ${status}`);
    }
    renderBacklinkCards();
  } catch (e) {
    console.error(e);
  }
}

function renderBacklinkCards() {
  const container = document.getElementById('backlinkTargetsContainer');
  const countLabel = document.getElementById('backlinkCountLabel');
  if (!container) return;

  const filtered = BMG_BACKLINK_TARGETS.filter(t => {
    if (activeMarketFilter !== 'all') {
      if (activeMarketFilter === 'm1' && !t.market.includes('Market 1')) return false;
      if (activeMarketFilter === 'm2' && !t.market.includes('Market 2')) return false;
      if (activeMarketFilter === 'm3' && !t.market.includes('Market 3')) return false;
      if (activeMarketFilter === 'm4' && !t.market.includes('Market 4')) return false;
    }

    if (activeTierFilter !== 'all' && t.tier !== activeTierFilter) return false;

    if (activeSearchQuery) {
      const matchName = (t.name || '').toLowerCase().includes(activeSearchQuery);
      const matchUrl = (t.domain || t.url || '').toLowerCase().includes(activeSearchQuery);
      const matchCategory = (t.category || t.placement || '').toLowerCase().includes(activeSearchQuery);
      if (!matchName && !matchUrl && !matchCategory) return false;
    }

    return true;
  });

  if (countLabel) {
    countLabel.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${BMG_BACKLINK_TARGETS.length}</strong> vetted high-authority targets`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; background:#ffffff; border:1px solid var(--line-dark); border-radius:18px; padding:60px 20px; text-align:center;">
        <h3 style="color:var(--ink); margin-bottom:8px;">No matching targets found</h3>
        <p style="color:var(--muted);">Try adjusting your search criteria or resetting filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(t => {
    const status = getStoredStatus(t.id);
    let statusClass = 'badge-pass';
    if (status === 'Not Contacted') statusClass = 'badge-warning';
    if (status === 'Pitched') statusClass = 'badge-info';
    if (status === 'Followed Up') statusClass = 'badge-warning';
    if (status === 'Secured') statusClass = 'badge-pass';

    const domainDisplay = t.domain || (t.url ? new URL(t.url).hostname.replace('www.', '') : 'External Site');
    const placementDisplay = t.placement || t.category;

    return `
      <div class="card" style="display:flex; flex-direction:column; justify-content:space-between; position:relative;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:14px;">
            <span class="badge ${t.tier.includes('.gov') || t.tier.includes('.edu') ? 'badge-pass' : 'badge-info'}">
              ${t.tier}
            </span>
            <div class="dr-badge" title="Domain Rating">
              DR <span>${t.dr}</span>
            </div>
          </div>

          <h3 style="font-size:1.25rem; color:var(--ink); margin-bottom:4px; line-height:1.25;">
            ${t.name}
          </h3>
          <div style="font-size:0.84rem; color:var(--muted); margin-bottom:14px;">
            <a href="${t.url}" target="_blank" rel="noopener noreferrer" style="color:var(--bmg-blue); display:inline-flex; align-items:center; gap:4px;">
              ${domainDisplay} ↗
            </a>
          </div>

          <div style="font-size:0.88rem; color:var(--text); margin-bottom:14px; background:var(--paper-2); padding:12px; border-radius:8px; border:1px solid var(--line-dark);">
            <div style="font-size:0.75rem; text-transform:uppercase; color:var(--muted); font-weight:700; letter-spacing:0.04em;">Target Placement</div>
            <strong style="color:var(--ink);">${placementDisplay}</strong>
          </div>

          <div style="font-size:0.86rem; color:var(--muted); margin-bottom:16px; line-height:1.55;">
            ${t.strategy}
          </div>
        </div>

        <div>
          <div style="border-top:1px dashed var(--line-dark); padding-top:14px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; font-size:0.84rem;">
            <div>Monthly Traffic: <strong style="color:var(--ink);">${t.traffic}</strong></div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="badge ${statusClass}">${status}</span>
            </div>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <button class="btn btn-gold btn-sm" onclick="openPitchModal('${t.id}')">
              View Pitch Script
            </button>
            <button class="btn btn-dark btn-sm" onclick="quickMailto('${t.id}')">
              Email Contact ↗
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function getPopulatedPitch(target) {
  if (target.pitch_subject && target.pitch_body) {
    return {
      subject: target.pitch_subject,
      body: target.pitch_body,
      templateName: target.tier + " Customized Script"
    };
  }
  const templates = typeof BMG_PITCH_TEMPLATES !== 'undefined' ? BMG_PITCH_TEMPLATES : {};
  const template = templates[target.pitch_type] || templates['contractor_trade'] || {
    subject: `Contractor Registry Partnership -- ${target.name}`,
    body: `Hello ${target.name} Team,\n\nWe would like to connect regarding certified foundation repair resources on ${target.url}.\n\nBest regards,\nFoundation Repair Pros of Joplin`,
    name: "General Trade Pitch"
  };
  const subject = template.subject.replace(/{NAME}/g, target.name).replace(/{URL}/g, target.url);
  const body = template.body.replace(/{NAME}/g, target.name).replace(/{URL}/g, target.url);
  return { subject, body, templateName: template.name };
}

window.openPitchModal = function(targetId) {
  const target = BMG_BACKLINK_TARGETS.find(t => String(t.id) === String(targetId));
  if (!target) return;

  const modal = document.getElementById('pitchModal');
  if (!modal) return;

  const pitch = getPopulatedPitch(target);
  const currentStatus = getStoredStatus(target.id);
  const targetEmail = target.email || target.contact_email || 'info@domain.com';
  const placementDisplay = target.placement || target.category || 'Accredited Directory';
  const domainDisplay = target.domain || (target.url ? new URL(target.url).hostname.replace('www.', '') : 'External Site');

  const titleEl = document.getElementById('pitchModalTitle');
  const badgeEl = document.getElementById('pitchModalTierBadge');
  const domainEl = document.getElementById('pitchModalDomain');
  const drEl = document.getElementById('pitchModalDr');
  const trafficEl = document.getElementById('pitchModalTraffic');
  const contactEl = document.getElementById('pitchModalContact');
  const strategyEl = document.getElementById('pitchModalStrategy');
  const subjectEl = document.getElementById('pitchModalSubject');
  const bodyEl = document.getElementById('pitchModalBody');
  const statusSelect = document.getElementById('pitchModalStatusSelect');
  const copyBtn = document.getElementById('copyPitchBtn');
  const mailtoBtn = document.getElementById('dispatchMailtoBtn');

  if (titleEl) titleEl.textContent = target.name;
  if (badgeEl) badgeEl.textContent = target.tier;
  if (domainEl) domainEl.textContent = domainDisplay;
  if (drEl) drEl.textContent = 'DR ' + target.dr;
  if (trafficEl) trafficEl.textContent = target.traffic;
  if (contactEl) contactEl.textContent = targetEmail;
  if (strategyEl) strategyEl.textContent = target.strategy || placementDisplay;
  if (subjectEl) subjectEl.value = pitch.subject;
  if (bodyEl) bodyEl.value = pitch.body;

  if (statusSelect) {
    statusSelect.value = currentStatus;
    statusSelect.onchange = () => setStoredStatus(target.id, statusSelect.value);
  }

  if (copyBtn) {
    copyBtn.onclick = () => {
      copyTextToClipboard(pitch.body, 'Pitch email copied to clipboard!');
    };
  }

  if (mailtoBtn) {
    mailtoBtn.href = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(pitch.subject)}&body=${encodeURIComponent(pitch.body)}`;
    mailtoBtn.onclick = () => {
      setStoredStatus(target.id, 'Pitched');
    };
  }

  if (typeof openModal === 'function') {
    openModal(modal);
  } else {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.quickMailto = function(targetId) {
  const target = BMG_BACKLINK_TARGETS.find(t => String(t.id) === String(targetId));
  if (!target) return;
  const pitch = getPopulatedPitch(target);
  const email = target.email || target.contact_email || '';
  const mailtoUrl = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(pitch.subject)}&body=${encodeURIComponent(pitch.body)}`;
  window.open(mailtoUrl, '_blank');
  setStoredStatus(target.id, 'Pitched');
};
