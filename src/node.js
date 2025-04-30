const carousel = document.getElementById("carouselContainer");

fetch("videos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((video) => {
      carousel.innerHTML += `
        
        <div class="carouselCard">
        ` +
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
        </div>

        `;
    });

    console.log(data);
  });

//   <iframe width="1236" height="695" src="https://www.youtube.com/embed/GF44ENIWRW0" title="Subaru Beetle 2.0 Turbo, double A suspension and all customized!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>