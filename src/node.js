getCategorias = fetch("cursos.json")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

getGrupos = fetch("grupos.json")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

getCursos = fetch("cursos.json")
  .then((res) => res.json())
  .then((data) => {
    const cursos = [];
    data.forEach((category) => {
      category.cursos.forEach((curso) => {
        cursos.push(curso);
      });
    });
    return cursos;
  });

getCarreiras = fetch("carreiras.json")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

getTematicas = fetch("tematicas.json")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

getDiciplinas = fetch("diciplinas.json")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

getVideos = fetch("videos.json")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

getSobre = fetch("sobre.json")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

/* Start Populate Functions */

/* Populate Carreiras */

const carreirasContainer = document.getElementById("cursosFiltro");
async function populateCarreiras() {
  const carreiras = await getCarreiras;
  carreiras.forEach((carreira) => {
    carreirasContainer.innerHTML += `
        <button class="carreiraFiltro" name="carreiraFiltro" value="${carreira.id}" type="submit">${carreira.nome}</button>
      `;
  });
  carreirasContainer.innerHTML += `
        <button class="carreiraFiltro" name="carreiraFiltro" value="-1" type="submit">Todos</button>
      `;

  // Functions Filtro

  const filtroCarreiras = document.querySelectorAll(".carreiraFiltro");
  const cursosFiltroForm = document.getElementById("cursosFiltroForm");

  filtroCarreiras.forEach((filtroButton) => {
    filtroButton.addEventListener("click", aplicarFiltro);
  });

  async function aplicarFiltro(event) {
    console.log(event.target.value);

    const cursos = await getCursos;

    if (event.target.value == -1) {
      populateCursos(cursos);
    }

    let cursosFiltrado = [];

    cursos.forEach((curso) => {
      curso.principais_carreiras.forEach((carreiraID) => {
        if (carreiraID == event.target.value) {
          cursosFiltrado.push(curso);
        }
      });
    });

    populateCursos(cursosFiltrado);

    event.preventDefault();
  }
}
populateCarreiras();

/* Populate Cursos Carousel */

const cursosCarousel = document.getElementById("cursosCarousel");
const comparadorList = document.getElementById("comparadorList");

async function populateCursos(cursos) {
  cursosCarousel.innerHTML = ``;

  if (!cursos) {
    cursos = await getCursos;
  }

  let tematicasIndex = 0;

  cursos.forEach(async (curso) => {
    tematicasIndex++;

    // JOIN tematicas com curso
    const tematicas = await getTematicas;

    let tematicasDiv = "";

    curso.ids_tematicas.forEach((cursoTematica) => {
      tematicas.forEach((tematica) => {
        if (tematica.id_tematica == cursoTematica) {
          tematicasDiv += `<h6>${tematica.tematica_name}</h6>`;
        }
      });
    });

    // Cursos Carousel
    cursosCarousel.innerHTML += `
            <div class="cursosCarouselCard swiper-slide">
              <div class="cursosCarouselCardHeader">
                <h4>${curso.modalidade}</h4>
                <img
                  src="https://www.shutterstock.com/image-photo/digital-technology-big-data-storage-600nw-2164313403.jpg"
                />
              </div>

              <div class="cursosCarouselCardBody">
                <div class="cursosCarouselCardTematicas" id="tematicasIndex_${tematicasIndex}">
                ${tematicasDiv}
                </div>
                <h2>${curso.nome_do_curso}</h2>
                <a href="${curso.link}" target="_blank"">Detalhes</a>
              </div>
            </div>
        `;

    // Populate Lista Comparar
    comparadorList.innerHTML += `
          <option value="${curso.nome_do_curso} - ${curso.modalidade}"></option>
        `;
  });
}
populateCursos();

// Initialize Swiper

new Swiper(".cursosCarouselContainer", {
  // Optional parameters
  loop: false,
  spaceBetween: 10,
  mousewheel: true,
  freeMode: true,
  speed: 500,

  freeMode: {
    sticky: true,
  },

  mousewheel: {
    forceToAxis: true,
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".cursos-scrollbar",
    // Makes the Scrollbar Draggable
    draggable: true,
    // Snaps slider position to slides when you release Scrollbar
    snapOnRelease: true,
    // Size (Length) of Scrollbar Draggable Element in px
    dragSize: "auto",
  },

  // If we need pagination
  pagination: {
    el: ".cursos-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".cursos-next",
    prevEl: ".cursos-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 4,
    },
  },
});

/* Populate Videos Carousel */

const carousel = document.getElementById("videosContainer");

async function populateVideos() {
  const videos = await getVideos;

  videos.forEach((video) => {
    carousel.innerHTML += `
          <div class="videoCard swiper-slide">
            <div class="videoHeader">
              <iframe
                src="${video.video_link}"
                title="${video.titulo}"
                allowfullscreen
              ></iframe>
            </div>
            <div class="videoBody">
              <h4 class="videoDesc">
                ${video.video_desc}
              </h4>
              <div class="videoProf">
                <h3>${video.prof_nome}</h3>
                <a target="_blank" href="${video.prof_link}"><ion-icon name="link-outline"></ion-icon></a>
              </div>
            </div>
          </div>
        `;
  });

  new Swiper(".carouselVideos", {
    // Optional parameters
    loop: true,
    spaceBetween: 0,
    effect: "coverflow",
    centeredSlides: true,
    allowTouchMove: true,
    mousewheel: true,
    speed: 500,

    mousewheel: {
      forceToAxis: true,
    },

    keyboard: {
      enabled: true,
    },

    coverflowEffect: {
      depth: 1000,
      rotate: 0,
      slideShadows: false,
      modifier: 0.25,
    },

    // If we need pagination
    pagination: {
      el: ".videos-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".videos-next",
      prevEl: ".videos-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        touchRatio: 1,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}
populateVideos();

/* Populate Sobre */

const sobreCarousel = document.getElementById("sobreCarousel");

async function populateSobre() {
  const sobre = await getSobre;

  sobreCarousel.style.setProperty("--quantity", sobre.length);

  var sobreCount = 0;
  sobre.forEach((sobreCard) => {
    sobreCount++;

    sobreCarousel.innerHTML += `
    <div class="sobreCard" style="--position: ${sobreCount}">
    <span class="sobreIcon">
        <ion-icon name="${sobreCard.iconName}"></ion-icon>
    </span>
        <h3>${sobreCard.text}</h3>
      </div>
    `;
  });
}
populateSobre();

// Functions Comparador

const comparadorButton = document.getElementById("comparadorButton");
const comparadorAdd = document.getElementById("comparadorAdd");
const comparadorScreen = document.getElementById("comparadorScreen");
const comparadorInputContainer = document.getElementById(
  "comparadorInputContainer"
);

comparadorAdd.addEventListener("click", comparadorAddInput);
comparadorButton.addEventListener("click", comparadorSend);

function comparadorAddInput() {
  comparadorInputContainer.insertAdjacentHTML(
    "beforeend",
    `
              <input
              type="text"
              class="comparadorInput"
              list="comparadorList"
              placeholder="Digite um curso..."
              required
              />
              `
  );
  comparadorSend();
}

async function comparadorSend(event) {
  const comparadorInput = document.querySelectorAll(".comparadorInput");
  const comparadorTable = document.getElementById("cursoComparadorTable");

  const comparadorScreenContainer = document.getElementById(
    "comparadorScreenContainer"
  );

  comparadorScreenContainer.style.display = "none";

  comparadorScreen.innerHTML = ``;
  comparadorTable.innerHTML = `
    <tr id="cursoComparadorTableHeader">
      <th>Matérias</th>
    </tr>
  `;

  const comparadorTableHeader = document.getElementById(
    "cursoComparadorTableHeader"
  );

  let cursoComparadorID = 0;

  if (document.getElementById("comparadorForm").reportValidity()) {
    comparadorScreenContainer.style.display = "unset";

    const cursos = await getCursos;

    comparadorInput.forEach((cursoInput) => {
      cursos.forEach((curso) => {
        if (
          curso.nome_do_curso + " - " + curso.modalidade ==
          cursoInput.value
        ) {
          cursoComparadorID++;

          comparadorScreen.innerHTML += `
              <div class="comparadorCurso" >
                <h4>
                  ${curso.nome_do_curso}
                </h4>
                <ul id="cursoComparador_${cursoComparadorID}">
                  `;

          curso.descriptions.forEach((description) => {
            document.getElementById(
              `cursoComparador_${cursoComparadorID}`
            ).innerHTML += `
                      <li>${description}</li>
                    `;
          });
          comparadorScreen.innerHTML += `
                      
                </ul>
                
              </div>
               `;

          comparadorTableHeader.innerHTML += `<th>${curso.nome_do_curso}</th>`;
        }
      });
    });

    // Comparar Diciplinas

    const diciplinas = await getDiciplinas;

    let lineDiciplina = [];
    let groupDiciplina = {
      nome: "",
      id_grupo_disciplina: -1,
      cursos: [],
    };
    let cursoComparar = {
      nome: "",
      haveDiciplina: false,
    };

    diciplinas.forEach((diciplina) => {
      let groupDiciplina = {
        nome: "",
        id_grupo_disciplina: -1,
        cursos: [],
      };

      groupDiciplina.nome = diciplina.dsc_nome_disciplina;
      groupDiciplina.id_grupo_disciplina = diciplina.id_grupo_disciplina;

      comparadorInput.forEach((cursoInput) => {
        let cursoComparar = {
          nome: "",
          haveDiciplina: false,
        };

        cursoComparar.nome = cursoInput.value;
        (cursoComparar.haveDiciplina = false),
          cursos.forEach((curso) => {
            if (
              curso.nome_do_curso + " - " + curso.modalidade ==
              cursoInput.value
            ) {
              curso.ids_disciplinas_ofertadas.forEach((cursoDiciplina) => {
                if (cursoDiciplina == diciplina.id_disciplina) {
                  cursoComparar.haveDiciplina = true;
                }
              });
            }
          });
        groupDiciplina.cursos.push(cursoComparar);
      });
      let groupHaveDiciplina = false;
      groupDiciplina.cursos.forEach((groupDiciplinaCursos) => {
        if (groupHaveDiciplina == false) {
          if (groupDiciplinaCursos.haveDiciplina == true) {
            lineDiciplina.push(groupDiciplina);
            groupHaveDiciplina = true;
          }
        }
      });
    });

    // Printar Tabela

    let lineID = 0;

    lineDiciplina.sort((a, b) => a.id_grupo_disciplina - b.id_grupo_disciplina);

    const grupos = await getGrupos;
    let groupLines = {
      nome: "",
      lines: [],
    };

    let tableGroup = [];

    grupos.forEach((grupo) => {
      groupLines = {
        nome: "",
        lines: [],
      };

      groupLines.nome = grupo.dsc_grupo_disciplina;
      lineDiciplina.forEach((line) => {
        if (grupo.id_grupo_disciplina == line.id_grupo_disciplina) {
          groupLines.lines.push(line);
        }
      });
      tableGroup.push(groupLines);
    });

    tableGroup.forEach((groupDiciplinas) => {
      if (groupDiciplinas.lines.length > 0) {
        console.log(groupDiciplinas);

        comparadorTable.innerHTML += `
                <tr>
                  <td style="background-color: var(--darkBlue); color: white">
                    ${groupDiciplinas.nome}
                  </td>
                </tr>
          `;

        groupDiciplinas.lines.forEach((lineDiciplina) => {
          lineID++;

          comparadorTable.innerHTML += `
                <tr id="line_${lineID}">
                  <td style="background-color:rgba(221, 232, 234, 50%)">${lineDiciplina.nome}</td>
                </tr>
          `;

          lineDiciplina.cursos.forEach((curso) => {
            if (curso.haveDiciplina) {
              document.getElementById(`line_${lineID}`).innerHTML += `
              <td>
                <ion-icon style="background-color: var(--orange)" name="checkmark-outline"></ion-icon>
              </td>
            `;
            } else {
              document.getElementById(`line_${lineID}`).innerHTML += `
              <td></td>
            `;
            }
          });
        });
      }
    });
  }

  event.preventDefault();
}
