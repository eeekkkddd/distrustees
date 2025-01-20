// Load and render data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('grid');
    const filter = document.getElementById('filter');

    // Populate grid
    function renderGrid(items) {
      grid.innerHTML = '';
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${item.name}</h3>
          <p>Charity: ${item.charity}</p>
          <p>Role: ${item.role}</p>
        `;
        card.addEventListener('click', () => alert(JSON.stringify(item, null, 2)));
        grid.appendChild(card);
      });
    }

    // Add filtering functionality
    function renderFilters() {
      const tags = [...new Set(data.flatMap(item => item.tags))];
      filter.innerHTML = tags.map(tag => `
        <button data-tag="${tag}">${tag}</button>
      `).join('');
      filter.querySelectorAll('button').forEach(button =>
        button.addEventListener('click', () => {
          const filtered = data.filter(item => item.tags.includes(button.dataset.tag));
          renderGrid(filtered);
        })
      );
    }

    renderFilters();
    renderGrid(data);
  });
