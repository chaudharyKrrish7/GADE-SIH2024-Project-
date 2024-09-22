// Check if the browser supports speech recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true; // Keep listening after the result is processed

// Selecting the button and output div
const startBtn = document.getElementById('startBtn');
const outputDiv = document.getElementById('output');

// Toggle listening status
let isListening = false;

startBtn.addEventListener('click', () => {
    if (isListening) {
        recognition.stop();
        startBtn.textContent = "Start Listening";
        isListening = false;
    } else {
        recognition.start();
        startBtn.textContent = "Stop Listening";
        isListening = true;
    }
});

// Action commands
const commands = {    
    "show leaderboard": () => window.location.href = "/leaderboard",
    "reload page": () => location.reload(),
    "open new tab": () => window.open('https://www.example.com', '_blank'),
    "close this website": () => window.close(),
    "take me to seat tutorials":() => window.location.href = '/tut.html',
    "take me to see tutorials":() => window.location.href = '/tut.html',
    "take me to c tutorials":() => window.location.href = '/tut.html',
    "take me to leaderboards":() => window.location.href = '/leaderboard.html',
    "i want to see my profile":() => window.location.href = '/profile.html',
    "lets play some games":() => window.location.href = '/games.html',
    "let's play some games":() => window.location.href = '/games.html',
    "go back to home":() => window.location.href = '/index.html',
    "go back home":() => window.location.href = '/index.html',

};

// Listen for speech recognition result
recognition.addEventListener('result', (event) => {
    const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
        .toLowerCase(); // Convert to lowercase to make the commands case insensitive

    outputDiv.textContent = transcript;

    // Check if the spoken words match any command
    for (const command in commands) {
        if (transcript.includes(command)) {
            commands[command](); // Execute the matched command
        }
    }
});

// When speech recognition ends
recognition.addEventListener('end', () => {
    if (isListening) recognition.start(); // Restart recognition to keep it listening
});
