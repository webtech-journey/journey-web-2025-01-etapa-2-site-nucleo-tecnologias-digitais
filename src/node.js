fetch("porque.json")
  .then((res) => res.json())
  .then((data) => {

    sobre.style.setProperty('--quantity', data.length)

    var sobreCount = 0
    data.forEach(sobreCard => {
      
      sobreCount++

      sobre.innerHTML += `
      <div class="sobreCard" style="--position: ${sobreCount}">
              <span class="sobreIcon">
                <ion-icon name="${sobreCard.iconName}"></ion-icon>
              </span>
              <h3>${sobreCard.text}</h3>
        </div>
      `
    });

    console.log(data)
  });
