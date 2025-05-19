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
            <h1>nome do tópico: ${categoria.categoria}</h1>
            <div class="qtdCursos">
              <h1>${categoria.cursos.length} cursos encontrados</h1>
            </div>
          </div>
        `;

        categoria.cursos.forEach(curso => {
          html += `
            <div class="cursosContainer">
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
            </div>
          `;
        });
      });

      section.innerHTML = html;
    })
    .catch(error => {
      console.error('Erro ao importar cursos:', error);
    });
}


