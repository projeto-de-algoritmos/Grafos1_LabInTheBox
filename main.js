let canvas = document.createElement("canvas");
canvas.setAttribute("width", "600"); // largura do campo
canvas.setAttribute("height", "600"); // altura do campo
canvas.style.border = "1px solid dark-gray";
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d");

// função para desenhar as linhas do labirinto
function paintLine(x1, y1, x2, y2) {
  ctx.strokeStyle = "dark-gray";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// definição do tamanho da célula, linhas e colunas
let c = 50; // tamanho de cada célula
let rows = canvas.width / c;
let columns = canvas.height / c;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.ang = [
      { x: x * c, y: y * c },
      { x: x * c + c, y: y * c },
      { x: x * c + c, y: y * c + c },
      { x: x * c, y: y * c + c },
      { x: x * c, y: y * c },
    ];
  }
}

let cells = []; // array de células vazia

for (let i = 0; i < columns; i++) {
  for (let j = 0; j < rows; j++) {
    let cell = new Cell(i, j); // passando os valores para criação da célula
    cells.push(cell); // passando o valor da célula para a array
  }
}

// função que faz a criação do campo onde será feito o labirinto
function lab() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].render();
  }
}
