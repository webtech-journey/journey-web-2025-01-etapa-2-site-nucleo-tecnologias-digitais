const carousel = document.getElementById("carouselContainer");

fetch("videos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((video) => {
      carousel.innerHTML +=
        `
        
        <div class="carouselCard">
        <div class="carouselVideo">
            <iframe 
            src="` +
        video.video_link +
        `"
            title="` +
        video.titulo +
        `"
            allowfullscreen
            ></iframe>
        </div>
        <div class="carouselDescContainer">
        <h3 class="carouselDesc">` +
        video.video_desc +
        `</h3>
        <a class="carouselProf" href="` +
        video.prof_link +
        `" target="_blank">` +
        video.prof_nome +
        `</a>
        </div>
        
        </div>
        `;
    });

    // Make the carousel move

    let items = document.querySelectorAll(".carouselContainer .carouselCard");
    let itemsDesc = document.querySelectorAll(".carouselDescContainer");
    let nextCard = document.getElementById("carouselNext");
    let prevCard = document.getElementById("carouselPrev");

    let active = 3;

    function loadShow() {
      let stt = 0;

      items[active].style.transform = `none`;
      items[active].style.zIndex = "1";
      items[active].style.filter = "none";
      items[active].style.opacity = 1;
      itemsDesc[active].style.opacity = 1;
      items[active].style.pointerEvents = "unset";

      for (var i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(calc(${120 * stt}px)) scale(${
          1 - 0.2 * stt
        })`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = "blur(1px)";
        items[i].style.opacity = stt > 1 ? 0 : 0.6;
        items[i].style.pointerEvents = "none";
        itemsDesc[i].style.opacity = 0;
      }

      stt = 0;
      for (var i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${
          1 - 0.2 * stt
        })`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = "blur(1px)";
        items[i].style.opacity = stt > 1 ? 0 : 0.6;
        items[i].style.pointerEvents = "none";
        itemsDesc[i].style.opacity = 0;
      }
    }

    loadShow();

    nextCard.onclick = function () {
      active = active + 1 < items.length ? active + 1 : active;
      loadShow();
    };
    prevCard.onclick = function () {
      active = active - 1 >= 0 ? active - 1 : active;
      loadShow();
    };
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

/* Populate Filtro */

const cursosFiltro = document.getElementById("areaCardContainer");

fetch("");

/* Populate Cursos */

const cursosContainer = document.getElementById("cursosContainer");

fetch("https://apisisiec.rommelcarneiro.me/cursos?ativo=true")
  .then((res) => res.json())
  .then((data) => {
    let index = 0;

    

    data.forEach((curso) => {
      cursosContainer.innerHTML += `
      <div class="cursoCard" id="card${index}">
      <div class="cursoIcon">
      <h4>Online</h4>
      <img
      src="https://icei.pucminas.br/latosensu/assets/icones/${curso.dsc_sigla_curso}.svg"
      />
      </div>
      <div class="cursoDesc">
      <h3>${curso.dsc_titulo_visualizacao}</h3>
      <a href="">Detalhes</a>
      </div>
      
      </div>
      `;
      // console.log(curso);
      index++;
    });

    const prevCurso = document.getElementById("prevCurso");
    const nextCurso = document.getElementById("nextCurso");

    let active = 0;

    prevCurso.onclick = () => {
    };
    nextCurso.onclick = () => {
    };
  });
