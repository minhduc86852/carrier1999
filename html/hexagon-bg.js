const canvas = document.getElementById('hex-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const hexRadius = 38;
const hexHeight = Math.sqrt(3) * hexRadius;
const hexWidth = 2 * hexRadius;
const vertDist = hexHeight;
const horizDist = 3/2 * hexRadius;

let t = 0;

function drawHex(x, y, r, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 3 * i;
    ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let rows = Math.ceil(canvas.height / vertDist) + 2;
  let cols = Math.ceil(canvas.width / horizDist) + 2;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = col * horizDist + ((row % 2) * horizDist / 2);
      let y = row * vertDist * 0.87;
      // Hiệu ứng động: alpha thay đổi theo sóng
      let alpha = 0.25 + 0.25 * Math.sin(t + x * 0.01 + y * 0.01);
      drawHex(x, y, hexRadius, "#ff9d5cff", alpha);
    }
  }
  t += 0.02;
  requestAnimationFrame(animate);
}
animate();