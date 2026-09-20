/**
 * Module: K-Map Minimization Engine
 * Handles 4-variable truth table mapping and cell state calculations.
 */

const KMAP_GRID_ORDER = [
  ['0000', '0001', '0011', '0010'],
  ['0100', '0101', '0111', '0110'],
  ['1100', '1101', '1111', '1110'],
  ['1000', '1001', '1011', '1010']
];

function evaluateBooleanLogic(A, B, C, D) {
  // Boolean Logic SOP Form:
  // F_crit = (B . C) + (C . D) + (A . B . D)
  const F_crit = (B && C) || (C && D) || (A && B && D);
  
  // F_norm = NOT(A OR B OR C OR D)
  const F_norm = !(A || B || C || D);
  
  // F_susp = NOT(F_crit) AND NOT(F_norm)
  const F_susp = !F_crit && !F_norm;

  if (F_crit) return { state: 'CRITICAL', color: 'red', code: [1, 0, 0] };
  if (F_susp) return { state: 'SUSPICIOUS', color: 'amber', code: [0, 1, 0] };
  return { state: 'NORMAL', color: 'emerald', code: [0, 0, 1] };
}

function renderKMapGrid(currentInputBinary) {
  const container = document.getElementById('kmap-grid');
  if (!container) return;

  container.innerHTML = '';
  
  // Header Row
  const headers = ['', '00', '01', '11', '10'];
  headers.forEach(h => {
    const el = document.createElement('div');
    el.className = 'text-slate-500 font-bold py-1';
    el.innerText = h;
    container.appendChild(el);
  });

  const rowLabels = ['00', '01', '11', '10'];
  
  rowLabels.forEach((rowLabel, rowIndex) => {
    // Row Label
    const rEl = document.createElement('div');
    rEl.className = 'text-slate-500 font-bold flex items-center justify-center';
    rEl.innerText = rowLabel;
    container.appendChild(rEl);

    // 4 Cells per Row
    for (let colIndex = 0; colIndex < 4; colIndex++) {
      const mintermBin = KMAP_GRID_ORDER[rowIndex][colIndex];
      const [a, b, c, d] = mintermBin.split('').map(Number);
      const res = evaluateBooleanLogic(a, b, c, d);

      const cell = document.createElement('div');
      cell.className = 'border border-slate-800 rounded p-2 flex items-center justify-center transition-all';
      
      if (res.state === 'CRITICAL') {
        cell.classList.add('kmap-cell-active');
        cell.innerText = '1';
      } else {
        cell.innerText = '0';
        cell.classList.add('text-slate-600');
      }

      if (mintermBin === currentInputBinary) {
        cell.classList.add('kmap-cell-selected');
      }

      container.appendChild(cell);
    }
  });
}
