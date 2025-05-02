const carousel = document.getElementById("carouselContainer");

fetch("videos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((video) => {
      carousel.innerHTML +=
        `
        
        <div class="carouselCard">
        <h1>
        ` +
        video.prof_nome +
        // <div class="carouselVideo">
        //     <iframe
        //     src="` + video.video_link + `"
        //     title="` + video.title + `"
        //     allowfullscreen
        //     ></iframe>
        // </div>
        //     <h1 class="carouselDesc">` + video.video_desc + `</h1>
        //     <a href="` + video.prof_link + `" target="_blank">` + video.prof_nome + `</a>
        `
        </h1>
        </div>

        `;
    });

    console.log(data);
    // Make the carousel move

    let items = document.querySelectorAll(".carouselContainer .carouselCard");
    let nextCard = document.getElementById("carouselNext");
    let prevCard = document.getElementById("carouselPrev");

    let active = 3;

    function loadShow() {
      let stt = 0;

      items[active].style.transform = `none`;
      items[active].style.zIndex = "1";
      items[active].style.filter = "none";
      items[active].style.opacity = 1;

      for (var i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(calc(${120 * stt}px)) scale(${
          1 - 0.2 * stt
        })`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = "blur(1px)";
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
      }

      stt = 0;
      for (var i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${
          1 - 0.2 * stt
        })`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = "blur(1px)";
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
      }
    }

    loadShow();

    nextCard.onclick = function() {
      active = active + 1 < items.length ? active + 1 : active;
      loadShow()
    }
    prevCard.onclick = function() {
      active = active - 1 >= 0 ? active - 1 : active;
      loadShow()
    }
  });

