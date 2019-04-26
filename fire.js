const firePixelsArray = [];
const fireWidth = 40;
const fireHeight = 40;
const fireColorsPalette = [
  { r: 7, g: 7, b: 7 },
  { r: 31, g: 7, b: 7 },
  { r: 47, g: 15, b: 7 },
  { r: 71, g: 15, b: 7 },
  { r: 87, g: 23, b: 7 },
  { r: 103, g: 31, b: 7 },
  { r: 119, g: 31, b: 7 },
  { r: 143, g: 39, b: 7 },
  { r: 159, g: 47, b: 7 },
  { r: 175, g: 63, b: 7 },
  { r: 191, g: 71, b: 7 },
  { r: 199, g: 71, b: 7 },
  { r: 223, g: 79, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 103, b: 15 },
  { r: 207, g: 111, b: 15 },
  { r: 207, g: 119, b: 15 },
  { r: 207, g: 127, b: 15 },
  { r: 207, g: 135, b: 23 },
  { r: 199, g: 135, b: 23 },
  { r: 199, g: 143, b: 23 },
  { r: 199, g: 151, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 175, b: 47 },
  { r: 183, g: 175, b: 47 },
  { r: 183, g: 183, b: 47 },
  { r: 183, g: 183, b: 55 },
  { r: 207, g: 207, b: 111 },
  { r: 223, g: 223, b: 159 },
  { r: 239, g: 239, b: 199 },
  { r: 255, g: 255, b: 255 }
];

function Start() {
  createDataStructure();
  createFireSource();
  RenderFire();

  setInterval(CalculateFirePropagation, 1);
}

function createDataStructure() {
  const numberOfPixels = fireWidth * fireHeight;

  for (let i = 0; i < numberOfPixels; i++) {
    firePixelsArray[i] = 0;
  }
}

function CalculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + fireWidth * row;

      updateFireIntensity(pixelIndex);
    }
  }

  RenderFire();
}

function updateFireIntensity(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth;

  //Verifica se o pixel de baixo é o maior que o canvas para não executar nenhuma ação
  if (belowPixelIndex >= fireWidth * fireHeight) {
    return;
  }

  /*Verifica enfraquecimento da intensidade
  decay é o valor do desconto  da intensidade do fogo
  Adicionado valor randomico ao decay para criar efeito de fogo */
  const decay = Math.floor(Math.random() * 3);
  const belowPixelFireIntensity = firePixelsArray[belowPixelIndex];

  /*Verifica se o valor do pixel abaixo menos o decaimento é maior ou igual a 0,
  desta forma atribui o valor da variável, caso contrário, atribui 0, evitando valores negativos; */
  const newFireIntensity =
    belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

  /*Recupera o novo valor de intensidade e aplica ao pixel que está sendo iterado
  Ao descontar valor de decay, o pixel ao lado será atualizado criando efeito de "vento" */
  firePixelsArray[currentPixelIndex - decay] = newFireIntensity;
}

function RenderFire() {
  const debug = false;
  let html = "<table cellpadding=0 cellspacing=0>";

  for (let row = 0; row < fireHeight; row++) {
    html += "<tr>";

    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = column + fireWidth * row;
      const fireIntensity = firePixelsArray[pixelIndex];

      //Para cada intensidade de fogo calculado dentro do píxel
      //recupera os valores de rgb da paleta de cores e insere como
      //cor de fundo da célula
      if (debug === true) {
        html += "<td>";
        html += `<div class="pixel-index">${pixelIndex}</div>`;
        html += fireIntensity;
        html += "</td>";
      } else {
        const color = fireColorsPalette[fireIntensity];
        const colorString = `${color.r},${color.g},${color.b}`;
        html += `<td class="pixel" style="background-color: rgb(${colorString})">`;
        html += `</td>`;
      }
    }

    html += "</tr>";
  }

  html += "</table>";

  document.querySelector("#fireCanvas").innerHTML = html;
}

function createFireSource() {
  for (let column = 0; column <= fireWidth; column++) {
    const overflowPixelIndex = fireHeight * fireHeight;
    const pixelIndex = overflowPixelIndex - fireWidth + column;

    //Define intensidade máxima em 36, partindo da base
    firePixelsArray[pixelIndex] = 36;
  }
}

Start();
