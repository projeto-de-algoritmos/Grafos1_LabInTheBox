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
