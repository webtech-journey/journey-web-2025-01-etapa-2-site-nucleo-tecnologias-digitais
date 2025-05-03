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

    console.log(data);
    // Make the carousel move

    let items = document.querySelectorAll(".carouselContainer .carouselCard");
    let itemsDesc = document.querySelectorAll(".carouselDescContainer");
    let nextCard = document.getElementById("carouselNext");
    let prevCard = document.getElementById("carouselPrev");

    console.log(itemsDesc);

    let active = 3;

    function loadShow() {
      let stt = 0;

      items[active].style.transform = `none`;
      items[active].style.zIndex = "1";
      items[active].style.filter = "none";
      items[active].style.opacity = 1;
      itemsDesc[active].style.opacity = 1;

      for (var i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(calc(${120 * stt}px)) scale(${
          1 - 0.2 * stt
        })`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = "blur(1px)";
        items[i].style.opacity = stt > 1 ? 0 : 0.6;
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
