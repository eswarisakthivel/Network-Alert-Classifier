/**
 * Main Application Orchestrator
 * Connects input switches to K-Map, SVG circuit, and Chart visualizers.
 */

const inputState = { A: 0, B: 0, C: 0, D: 0 };

const switchConfig = [
  { key: 'A', name: 'High Volumetry', desc: '>10k req/sec' },
  { key: 'B', name: 'Auth Failures', desc: '>5 in 10s' },
  { key: 'C', name: 'Port Scan', desc: 'Closed Probes' },
  { key: 'D', name: 'Bad Payload', desc: 'Malicious Sig' }
];

function initSwitchboard() {
  const container = document.getElementById('switchboard-container');
  if (!container) return;

  container.innerHTML = '';

  switchConfig.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all';
    
    card.innerHTML = `
      <div>
        <div class="font-bold text-sm text-slate-200">${item.key}: ${item.name}</div>
        <div class="text-xs text-slate-500">${item.desc}</div>
      </div>
      <input type="checkbox" id="switch-${item.key}" class="w-5 h-5 accent-indigo-500 cursor-pointer">
    `;

    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const cb = card.querySelector('input');
        cb.checked = !cb.checked;
      }
      const cb = card.querySelector('input');
      inputState[item.key] = cb.checked ? 1 : 0;
      updateApplication();
    });

    container.appendChild(card);
  });
}

function updateApplication() {
  const { A, B, C, D } = inputState;
  const binaryStr = `${A}${B}${C}${D}`;
  const result = evaluateBooleanLogic(A, B, C, D);

  // Update Badge
  const badge = document.getElementById('state-badge');
  if (badge) {
    badge.innerText = result.state;
    badge.className = `px-2.5 py-0.5 rounded text-xs font-bold bg-${result.color}-500/20 text-${result.color}-400 border border-${result.color}-500/30`;
  }

  // Update Visualizers
  renderKMapGrid(binaryStr);
  drawCircuitSchematic(A, B, C, D);
}

// Bootstrap Application
document.addEventListener('DOMContentLoaded', () => {
  initSwitchboard();
  initTelemetryChart();
  updateApplication();
});
