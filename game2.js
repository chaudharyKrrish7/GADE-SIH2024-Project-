const syntaxes = [
    '<html>', '<head>', '<body>', 'document.getElementById()', 'console.log()', 'padding: 10px;', 'font-size: 16px;', 
    'const', 'let', 'for (let i = 0; i < 10; i++) {}', 'if (x === y)', 'function myFunction() {}', '<div>', '<script>', 
    'background-color: #000;', 'return;', 'window.addEventListener()', 'width: 100%;', 'height: auto;', 
    'addEventListener()', 'setTimeout()', 'JSON.parse()', 'JSON.stringify()', 'async function fetchData() {}', 
    'try { } catch (err) { }', 'Promise.resolve()', 'await fetch()', 'const [state, setState] = useState()'
  ];
  
  let currentSyntax;
  let score = 0;
  let level = 1;
  let lives = 3;
  let highScore = localStorage.getItem('highScore') || 0;
  let baseTime = 10; // Increased base time to 10 seconds
  let time;
  let isGameOver = false;
  let timerInterval;
  
  const syntaxDisplay = document.getElementById('syntax-display');
  const syntaxInput = document.getElementById('syntax-input');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const levelDisplay = document.getElementById('level');
  const livesDisplay = document.getElementById('lives');
  const highScoreDisplay = document.getElementById('high-score');
  const gameOverDisplay = document.getElementById('game-over');
  const finalScoreDisplay = document.getElementById('final-score');
  const restartBtn = document.getElementById('restart-btn');
  
  // Initialize high score
  highScoreDisplay.textContent = `High Score: ${highScore}`;
  
  // Function to get random syntax
  function getRandomSyntax() {
    return syntaxes[Math.floor(Math.random() * syntaxes.length)];
  }
  
  // Function to start the game
  function startGame() {
    resetGame();
    nextSyntax();
  }
  
  // Function to reset the game
  function resetGame() {
    score = 0;
    level = 1;
    lives = 3;
    baseTime = 10; // Reset the base time
    isGameOver = false;
    gameOverDisplay.classList.add('hidden');
    syntaxInput.disabled = false;
    scoreDisplay.textContent = `Score: ${score}`;
    levelDisplay.textContent = `Level: ${level}`;
    livesDisplay.textContent = `Lives: ${lives}`;
    timerDisplay.textContent = `Time: ${baseTime}`;
  }
  
  // Function to calculate time based on syntax length
  function calculateTime(syntax) {
    // Base time is 10 seconds + additional time based on the length of the syntax
    return baseTime + Math.floor(syntax.length / 5); // For every 5 characters, add 1 second
  }
  
  // Function to start a new syntax
  function nextSyntax() {
    currentSyntax = getRandomSyntax();
    syntaxDisplay.textContent = currentSyntax;
    resetTimer();
  }
  
  // Function to reset the timer
  function resetTimer() {
    clearInterval(timerInterval);
    time = calculateTime(currentSyntax); // Set time based on the length of the syntax
    timerDisplay.textContent = `Time: ${time}`;
    
    timerInterval = setInterval(() => {
      time--;
      timerDisplay.textContent = `Time: ${time}`;
      if (time === 0) {
        loseLife();
      }
    }, 1000);
  }
  
  // Function to handle loss of life
  function loseLife() {
    lives--;
    livesDisplay.textContent = `Lives: ${lives}`;
    if (lives === 0) {
      endGame();
    } else {
      nextSyntax();
    }
  }
  
  // Function to end the game
  function endGame() {
    clearInterval(timerInterval);
    isGameOver = true;
    finalScoreDisplay.textContent = score;
    gameOverDisplay.classList.remove('hidden');
    syntaxInput.disabled = true;
  
    // Save high score
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
  }
  
  // Function to level up the game
  function levelUp() {
    level++;
    levelDisplay.textContent = `Level: ${level}`;
    
    // Increase difficulty by adding more complex syntaxes and slightly decreasing base time
    syntaxes.push(
      'async function myFunction() {}', 'try { } catch (e) {}', 'const result = await fetch()',
      'document.querySelector()', 'class MyClass { constructor() {} }'
    );
    if (level % 3 === 0) {
      baseTime--; // Decrease base time by 1 second every 3 levels
    }
  }
  
  // Event listener for input
  syntaxInput.addEventListener('input', () => {
    if (isGameOver) return;
    
    if (syntaxInput.value === currentSyntax) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      syntaxInput.value = '';
      if (score % 5 === 0) {
        levelUp();
      }
      nextSyntax();
    }
  });
  
  // Restart game button event listener
  restartBtn.addEventListener('click', () => {
    startGame();
  });
  
  // Event listener for keypress to restart the game
  document.addEventListener('keydown', (e) => {
    if (isGameOver && e.key === 'Enter') {
      startGame();
    }
  });
  
  // Initialize game
  startGame();
  