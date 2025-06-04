getCategorias = fetch("cursos.json")
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

/* Start Functions */

/* Populate Carreiras */

const carreirasContainer = document.getElementById("cursosFiltro");
async function populateCarreiras() {
  const carreiras = await getCarreiras;
  carreiras.forEach((carreira) => {
    carreirasContainer.innerHTML += `
        <button>${carreira.nome}</button>
      `;
  });
}
populateCarreiras();

/* Populate Cursos Carousel */

const cursosCarousel = document.getElementById("cursosCarousel");
const comparadorList = document.getElementById("comparadorList");

async function populateCursos() {
  const cursos = await getCursos;

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
                <a href="#">Detalhes</a>
              </div>
            </div>
        `;

    // Populate Lista Comparar
    comparadorList.innerHTML += `
          <option value="${curso.nome_do_curso} - ${curso.modalidade}"></option>
        `;
  });

  new Swiper(".cursosCarouselContainer", {
    // Optional parameters
    loop: false,
    spaceBetween: 10,
    mousewheel: true,
    speed: 500,

    mousewheel: {
      forceToAxis: true,
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
}
populateCursos();

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
    allowTouchMove: false,
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
        allowTouchMove: true,
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

// Backend Comparador

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
  // Confere se Todos inputs estão preenchidos
  console.log(document.getElementById("comparadorForm").reportValidity());

  console.log(comparadorInput);

  comparadorScreen.innerHTML = ``;

  let cursoComparadorID = 0;

  if (document.getElementById("comparadorForm").reportValidity()) {
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

                <div>
                
                

                </div>
                
              </div>
               `;
        }
      });
    });
  }

  event.preventDefault();
}
