/**
 * Module: Dynamic SVG Gate Visualizer
 * Draws schematic AND, OR, NOT gates and highlights active signal wires.
 */

function drawCircuitSchematic(A, B, C, D) {
  const svg = document.getElementById('circuit-svg');
  if (!svg) return;

  const res = evaluateBooleanLogic(A, B, C, D);
  const isCrit = res.state === 'CRITICAL';
  
  // Evaluate individual intermediate AND gate branches
  const term1 = B && C;             // B . C
  const term2 = C && D;             // C . D
  const term3 = A && B && D;        // A . B . D

  svg.innerHTML = `
    <!-- Input Rails -->
    <line x1="20" y1="30" x2="180" y2="30" class="${A ? 'active-wire' : 'inactive-wire'}" />
    <text x="5" y="34" fill="#94a3b8" font-size="12">A</text>

    <line x1="20" y1="80" x2="180" y2="80" class="${B ? 'active-wire' : 'inactive-wire'}" />
    <text x="5" y="84" fill="#94a3b8" font-size="12">B</text>

    <line x1="20" y1="130" x2="180" y2="130" class="${C ? 'active-wire' : 'inactive-wire'}" />
    <text x="5" y="134" fill="#94a3b8" font-size="12">C</text>

    <line x1="20" y1="180" x2="180" y2="180" class="${D ? 'active-wire' : 'inactive-wire'}" />
    <text x="5" y="184" fill="#94a3b8" font-size="12">D</text>

    <!-- AND Gate 1 (B . C) -->
    <rect x="180" y="45" width="50" height="40" rx="5" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    <text x="195" y="68" fill="#e2e8f0" font-size="11" font-weight="bold">AND</text>
    <line x1="230" y1="65" x2="380" y2="65" class="${term1 ? 'active-wire' : 'inactive-wire'}" />

    <!-- AND Gate 2 (C . D) -->
    <rect x="180" y="105" width="50" height="40" rx="5" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    <text x="195" y="128" fill="#e2e8f0" font-size="11" font-weight="bold">AND</text>
    <line x1="230" y1="125" x2="380" y2="125" class="${term2 ? 'active-wire' : 'inactive-wire'}" />

    <!-- AND Gate 3 (A . B . D) -->
    <rect x="180" y="165" width="50" height="40" rx="5" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    <text x="195" y="188" fill="#e2e8f0" font-size="11" font-weight="bold">AND</text>
    <line x1="230" y1="185" x2="380" y2="185" class="${term3 ? 'active-wire' : 'inactive-wire'}" />

    <!-- Final Output OR Gate -->
    <path d="M 380 40 Q 420 125 380 210 Q 450 210 470 125 Q 450 40 380 40 Z" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    <text x="400" y="130" fill="#e2e8f0" font-size="12" font-weight="bold">OR</text>

    <!-- Output Bus Line -->
    <line x1="470" y1="125" x2="560" y2="125" class="${isCrit ? 'active-wire' : 'inactive-wire'}" />
    <circle cx="560" cy="125" r="6" fill="${isCrit ? '#ef4444' : '#334155'}" />
    <text x="520" y="110" fill="${isCrit ? '#fca5a5' : '#64748b'}" font-size="12" font-weight="bold">F_crit</text>
  `;
}
