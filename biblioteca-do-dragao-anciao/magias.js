// Função para carregar e exibir as magias
async function carregarMagias() {
  try {
    // Carrega o arquivo magias.json
    const response = await fetch('magias/magias.json');
    const data = await response.json();

    // Obtém os elementos dos filtros
    const searchInput = document.getElementById('search');
    const circleSelect = document.getElementById('circulo');
    const typeSelect = document.getElementById('tipo');

    // Obtém o elemento onde as magias serão exibidas
    const spellList = document.getElementById('spellList');

    // Limpa a lista de magias antes de adicionar novos cards
    spellList.innerHTML = '';

    // Itera sobre cada magia no arquivo magias.json
    for (const spellFile of data.spells) {
      // Carrega o arquivo da magia
      const spellResponse = await fetch(`magias/${spellFile}`);
      const spellData = await spellResponse.json();

      // Verifica se a magia atende aos critérios de busca e filtro
      const nameMatches = spellData.name.toLowerCase().includes(searchInput.value.toLowerCase());
      const circleMatches = circleSelect.value === '' || spellData.circulo.toString() === circleSelect.value;
      const typeMatches = typeSelect.value === '' || spellData.tipo.toLowerCase() === typeSelect.value.toLowerCase();

      // Se atender aos critérios, cria o card HTML para a magia
      if (nameMatches && circleMatches && typeMatches) {
        const spellCard = document.createElement('div');
        spellCard.classList.add('card');
      
        // Adiciona a classe reversa se a magia tiver uma forma reversa
        if (spellData.reverseForm) {
          spellCard.classList.add('reverse');
        }

        // Adiciona a div do círculo
        const circleDiv = document.createElement('div');
        circleDiv.classList.add('circle-container');
        circleDiv.textContent = spellData.circulo;
        
        // Preenche o card com os dados da magia
        spellCard.innerHTML = `
          <div class="circle-container ${spellData.tipo.toLowerCase()}">${spellData.circulo}</div>
          <h3>${spellData.name}</h3>
          <p class="recuo-spell"><i>${spellData.tipo} ${spellData.circulo}</i></p>
          <p class="recuo-spell"><b>Alcance:</b> ${spellData.alcance}</p>
          <p class="recuo-spell"><b>Duração:</b> ${spellData.duracao}</p>
          <p class="recuo-spell"><b>Jogada de Proteção:</b> ${spellData.jp}</p>
          <br>
          <div class="descricao-container">${spellData.descricao}</div>
          <br>
          <p>${spellData.origem}</p>
        `;

        // Adiciona o card à lista de magias
        spellList.appendChild(spellCard);
      }
    }
  } catch (error) {
    console.error('Erro ao carregar as magias:', error);
  }
}

// Chama a função para carregar e exibir as magias após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  carregarMagias();

  // Adiciona eventos de escuta para os filtros
  document.getElementById('search').addEventListener('input', carregarMagias);
  document.getElementById('circulo').addEventListener('change', carregarMagias);
  document.getElementById('tipo').addEventListener('change', carregarMagias);
});
