function importarCursos() {
  fetch('cursos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo cursos.json');
      }
      return response.json();
    })
    .then(dados => {
      const section = document.getElementById('dados-importados');
      let html = "";

      dados.forEach(categoria => {
        html += `
          <div class="textotopico">
            <h1>${categoria.categoria}</h1>
            <div class="qtdCursos">
              <h1>${categoria.cursos.length} Cursos</h1>
            </div>
          </div>
        `;

        html += `<div class="conjunto">`;  // abre o conjunto de cards da categoria
        categoria.cursos.forEach(curso => {
            html += `
                <div class="cursoCard">
                <label class="compararLabel">
                    <input type="checkbox" />
                </label>

                <div class="cursoCardTop">
                    <span class="Modalidade">${curso.modalidade}</span>
                </div>

                <div class="cursoBody">
                    <h3>${curso.nome_do_curso}</h3>
                    <img src="/assets/images/placeHolderCoureseCardImage.png" />
                </div>

                <button class="btnDetalhes">Detalhes</button>
                </div>
            `;
        });
        html += `</div>`; // fecha o conjunto de cards da categoria
      });

      section.innerHTML = html;
    })
    .catch(error => {
      console.error('Erro ao importar cursos:', error);
    });

  fetch('cursos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo cursos.json');
      }
      return response.json();
    })

  .then(dados => {
      const section2 = document.getElementById('filtro-cursos');
      let html = "";

      dados.forEach(categoria => {
        html += `<label for="A${categoria.id}">
              <input type="radio"name="cursoTipo"id="A${categoria.id}"/>${categoria.categoria}
            </label>`;
      });
      section2.innerHTML = html;
  });
}
