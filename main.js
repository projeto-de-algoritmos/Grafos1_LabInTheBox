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

function index(x, y) {
  if (x < 0 || y < 0 || x > columns - 1 || y > rows - 1) {
    return -1;
  }
  return x * rows + y;
}

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
    this.visited = false;
    this.walls = [true, true, true, true]; // top, right, bottom, left
  }

  check() {
    let x = this.x;
    let y = this.y;

    let t = cells[index(x, y - 1)];
    let r = cells[index(x + 1, y)];
    let b = cells[index(x, y + 1)];
    let l = cells[index(x - 1, y)];

    let neighbors = [];

    if (t && !t.visited) {
      neighbors.push(t);
    }
    if (r && !r.visited) {
      neighbors.push(r);
    }
    if (b && !b.visited) {
      neighbors.push(b);
    }
    if (l && !l.visited) {
      neighbors.push(l);
    }
    if (neighbors.length > 0) {
      let rd = Math.floor(Math.random() * neighbors.length);
      return neighbors[rd];
    } else {
      return undefined;
    }
  }

  // renderizando tabuleiro
  render() {
    for (let i = 0; i < 4; i++) {
      if (this.walls[i])
        paintLine(
          this.ang[i].x,
          this.ang[i].y,
          this.ang[i + 1].x,
          this.ang[i + 1].y
        );
    }
    if (this.visited) {
      ctx.fillStyle = "rgba(248, 248, 255, 0.5)";
      ctx.fillRect(this.x * c, this.y * c, c, c);
    }
  }

  light() {
    ctx.fillStyle = "rgba(40, 40, 40, 0.8)";
    ctx.fillRect(this.x * c, this.y * c, c, c);
  }
}

function remove(currentCell, chosenCell) {
  let lr = currentCell.x - chosenCell.x;
  if (lr === -1) {
    currentCell.walls[1] = false;
    chosenCell.walls[3] = false;
  } else if (lr === 1) {
    currentCell.walls[3] = false;
    chosenCell.walls[1] = false;
  }
  let lb = currentCell.y - chosenCell.y;
  if (lb === -1) {
    currentCell.walls[2] = false;
    chosenCell.walls[0] = false;
  } else if (lb === 1) {
    currentCell.walls[0] = false;
    chosenCell.walls[2] = false;
  }
}

let cells = []; // array de células vazia

for (let i = 0; i < columns; i++) {
  for (let j = 0; j < rows; j++) {
    let cell = new Cell(i, j); // passando os valores para criação da célula
    cells.push(cell); // passando o valor da célula para a array
  }
}

let current = cells[0];
let stack = []; // pilha
current.visited = true;
stack.push(current);

// função que faz a criação do campo onde será feito o labirinto
function lab() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].render();
  }

  current.visited = true;
  current.light();

  let newCurrent = current.check();
  if (newCurrent) {
    newCurrent.visited = true;
    stack.push(current);
    remove(current, newCurrent);
    current = newCurrent;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

setInterval(lab, 100);
