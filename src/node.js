const carousel = document.getElementById("carouselWrapper");

fetch("videos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((video) => {
      carousel.innerHTML += `
        <div class="carouselCard swiper-slide">
          <div class="carouselVideo">
                <iframe 
                src="${video.video_link}"
                title="${video.titulo}"
                allowfullscreen
                ></iframe>
          </div>
          <div class="carouselDescContainer">
              <h3 class="carouselDesc">${video.video_desc}</h3>
            <a class="carouselProf" href="${video.prof_link}" target="_blank">${video.prof_nome}</a>
          </div>
        
        </div>
        `;
    });
  });

/* Populate Carreiras */

const carreirasContainer = document.getElementById("cursosFiltro");

fetch("carreiras.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((carreira) => {
      console.log(carreira);
      carreirasContainer.innerHTML += `
        <button>${carreira.nome}</button>
      `;
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

// Cursos

const cursosCarousel = document.getElementById("cursosCarousel");

fetch("cursos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((category) => {
      category.cursos.forEach((curso) => {
        cursosCarousel.innerHTML += `
            <div class="cursosCarouselCard swiper-slide">
              <div class="cursosCarouselCardHeader">
                <h4>Online</h4>
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
      });
    });
  });

new Swiper(".cursosCarouselContainer", {
  // Optional parameters
  loop: false,
  spaceBetween: 10,

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

new Swiper(".carouselVideos", {
  // Optional parameters
  loop: true,
  spaceBetween: 100,
  effect: "coverflow",
  centeredSlides: true,
  allowTouchMove: false,

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
