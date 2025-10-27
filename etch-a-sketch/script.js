const default_size = 16;
const max_size = 100; 

const container = document.getElementById('gridContainer');
const btn = document.getElementById('resizeBtn');

function makeGrid(n = default_size) {
  container.innerHTML = '';
  const cellSize = `calc(100% / ${n})`;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < n * n; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.style.width = cellSize;
    cell.style.height = cellSize;
    cell.addEventListener('mouseenter', () => {
      cell.classList.add('hovered');
    });
    fragment.appendChild(cell);
  }

  container.appendChild(fragment);
}

btn.addEventListener('click', () => {
  const input = prompt(`Enter squares (1-${max_size}):`, default_size);
  const val = Number(input);
  if (!Number.isInteger(val) || val < 1) {
    alert('Invalid input. Please try again.');
    return;
  }
  const size = Math.min(val, max_size);
  makeGrid(size);
});

makeGrid(default_size);
