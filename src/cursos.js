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
        <div class="conjuntoCards">
          <div class="textotopico">
            <h1>${categoria.categoria}</h1>
            <div class="qtdCursos">
              <h1>${categoria.cursos.length} Cursos</h1>
            </div>
          </div>
        `;

        html += `<div class="conjunto">`;
        categoria.cursos.forEach((curso, index) => {
        html += `
          <div class="cursoCard${index >= 7 ? ' hidden' : ''}">
            <div class="cursoCardTop">
                <label class="compararLabel">
                    <span>Comparar</span>
                    <input type="checkbox" />
                </label>
                <span class="Modalidade">${curso.modalidade}</span>
            </div>

            <div class="cursoBody">
              <div class="cursoBodyText">
                <h3>${curso.nome_do_curso}</h3>
              </div>
              <div class="image_div">
                <img class="image_card" src="/assets/images/placeHolderCoureseCardImage.png" />
              </div>
            </div>
            <div>
              <button class="btnDetalhes">Detalhes</button>
            </div>
          </div>
        `;
      });

      html += `
        </div>
        <div class="mostrarMais">
          <button class="mostrarMaisBtn">Mostrar mais</button>
        </div>
      `;

        html += `
          
        </div>`;
      });

      section.innerHTML = html;

      const mostrarMaisBtns = document.querySelectorAll('.mostrarMaisBtn');
      mostrarMaisBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const conjunto = this.closest('.conjuntoCards').querySelectorAll('.cursoCard');
          const ocultos = this.closest('.conjuntoCards').querySelectorAll('.cursoCard.hidden');

          if (ocultos.length > 0) {
            conjunto.forEach((card, index) => {
              if (index >= 7) {
                card.classList.remove('hidden');
              }
            });
            this.textContent = 'Mostrar menos';
          } else {
            conjunto.forEach((card, index) => {
              if (index >= 7) {
                card.classList.add('hidden');
              }
            });
            this.textContent = 'Mostrar mais';
          }
        });
      });


      const checkboxes = document.querySelectorAll('.cursoCard input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
          const card = this.closest('.cursoCard');
          if (this.checked) {
            card.classList.add('selecionado');
          } else {
            card.classList.remove('selecionado');
          }
        });
      });
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
