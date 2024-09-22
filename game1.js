const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const textInput = document.getElementById("textInput");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

const words = ["enemy", "spaceship", "destroy", "code", "battle","javascript","hackathon","study", "variables", "innovation", "library", "hacking", "gaming", "university", "science", "health", "books", "laptop", "adaptor", "document", "apple", "food", "temple"];
let enemies = [];

function createEnemy() {
  const word = words[Math.floor(Math.random() * words.length)];
  const x = Math.random() * canvas.width;
  const y = 0;
  const speed = Math.random() * 2 + 1;
  
  enemies.push({ word, x, y, speed });
}

function drawEnemies() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  enemies.forEach((enemy, index) => {
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(enemy.word, enemy.x, enemy.y);
    enemy.y += enemy.speed;

    if (enemy.y > canvas.height) {
      enemies.splice(index, 1);
    }
  });
}

function update() {
  drawEnemies();
  requestAnimationFrame(update);
}

setInterval(createEnemy, 2000);
update();

textInput.addEventListener("input", (e) => {
  const typedWord = e.target.value.trim().toLowerCase();

  enemies.forEach((enemy, index) => {
    if (typedWord === enemy.word.toLowerCase()) {
      enemies.splice(index, 1);
      e.target.value = "";  // Clear input
    }
  });
});
