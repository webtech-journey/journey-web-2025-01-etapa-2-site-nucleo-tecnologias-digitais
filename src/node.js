/* Populate Carreiras */

const carreirasContainer = document.getElementById("cursosFiltro");

fetch("carreiras.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((carreira) => {
      carreirasContainer.innerHTML += `
        <button>${carreira.nome}</button>
      `;
    });
  });

/* Populate Cursos Carousel */

const cursosCarousel = document.getElementById("cursosCarousel");
const comparadorList = document.getElementById("comparadorList");

fetch("cursos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((category) => {
      category.cursos.forEach((curso) => {
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
                <div class="cursosCarouselCardTematicas">
                  <h6>Software</h6>
                  <h6>Metodologias e Processos</h6>
                </div>
                <h2>${curso.nome_do_curso}</h2>
                <a href="#">Detalhes</a>
              </div>
            </div>
        `;

        comparadorList.innerHTML += `
          <option value="${curso.nome_do_curso} - ${curso.modalidade}"></option>
        `;
      });
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
  });

/* Populate Videos Carousel */

const carousel = document.getElementById("videosContainer");

fetch("videos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((video) => {
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
  });

/* Populate Sobre */

const sobre = document.getElementById("sobreCarousel");

fetch("porque.json")
  .then((res) => res.json())
  .then((data) => {
    sobre.style.setProperty("--quantity", data.length);

    var sobreCount = 0;
    data.forEach((sobreCard) => {
      sobreCount++;

      sobre.innerHTML += `
      <div class="sobreCard" style="--position: ${sobreCount}">
      <span class="sobreIcon">
          <ion-icon name="${sobreCard.iconName}"></ion-icon>
      </span>
          <h3>${sobreCard.text}</h3>
        </div>
      `;
    });
  });

// Backend Comparador

const comparadorButton = document.getElementById("comparadorButton");
const comparadorInput = document.querySelectorAll(".comparadorInput");
const comparadorScreen = document.getElementById("comparadorScreen");

comparadorButton.addEventListener("click", checkboxClick);

function checkboxClick(event) {
  // Confere se Todos inputs estão preenchidos
  console.log(document.getElementById("comparadorForm").reportValidity());

  comparadorScreen.innerHTML = ``;

  const cursos = [];

  let cursoComparadorID = 0;

  fetch("cursos.json")
    .then((res) => res.json())
    .then((data) => {
      if (document.getElementById("comparadorForm").reportValidity() == true) {
        comparadorInput.forEach((curso) => {
          data.forEach((category) => {
            category.cursos.forEach((cursoJson) => {
              if (
                cursoJson.nome_do_curso + " - " + cursoJson.modalidade ==
                curso.value
              ) {

                cursoComparadorID++;

                comparadorScreen.innerHTML += `
              <div class="comparadorCurso" >
                <h4>
                  ${cursoJson.nome_do_curso}
                </h4>
                <ul id="cursoComparador_${cursoComparadorID}">
                  `;

                cursoJson.descriptions.forEach((description) => {
                  document.getElementById(`cursoComparador_${cursoComparadorID}`).innerHTML += `
                      <li>${description}</li>
                    `;
                });
                comparadorScreen.innerHTML += `
                      
                </ul>
              </div>
               `;
              }
            });
          });
        });
      }
    });

  console.log(cursos);
  event.preventDefault();
}
