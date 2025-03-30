// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set fullscreen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Call once to set initial size

let gameStarted = false;

// Load background
let bgImage = new Image();
bgImage.src = "assets/background.png"; // Make sure the file exists
let bgX = 0;
let bgSpeed = 4; // Background scroll speed

// Load character
let player = {
    x: 100,
    y: canvas.height - 120, // Position at bottom
    width: 50,
    height: 50,
    speed: 6,
    dx: 0,
    dy: 0,
    jumping: false,
    gravity: 0.5
};

let playerImage = new Image();
playerImage.src = "assets/player.png"; // Make sure the file exists

// Key controls
const keys = {
    w: false,
    a: false,
    d: false
};

// Event listeners for key presses
document.addEventListener("keydown", (event) => {
    if (event.key === "w" && !player.jumping) {
        player.jumping = true;
        player.dy = -12; // Jump power
    }
    if (event.key === "a") keys.a = true;
    if (event.key === "d") keys.d = true;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "a") keys.a = false;
    if (event.key === "d") keys.d = false;
});

// Game update function
function update() {
    if (!gameStarted) return;

    // Reset movement
    player.dx = 0;
    let moving = false;

    // Move left
    if (keys.a) {
        player.dx = -player.speed;
        bgX += bgSpeed; // Move background right
        moving = true;
    }

    // Move right
    if (keys.d) {
        player.dx = player.speed;
        bgX -= bgSpeed; // Move background left
        moving = true;
    }

    // Prevent background from scrolling infinitely
    if (bgX > 0) bgX = 0;
    if (bgX < -canvas.width) bgX = -canvas.width;

    // Apply movement
    player.x += player.dx;

    // Apply gravity and jumping physics
    if (player.jumping) {
        player.y += player.dy;
        player.dy += player.gravity; // Gravity effect

        if (player.y >= canvas.height - 120) { // Ground level
            player.y = canvas.height - 120;
            player.jumping = false;
        }
    }

    draw();
    requestAnimationFrame(update);
}

// Draw everything on canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background (only moves when player moves)
    ctx.drawImage(bgImage, bgX, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, bgX + canvas.width, 0, canvas.width, canvas.height);

    // Draw player
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

// Start game when clicking "Play"
document.getElementById("startButton").addEventListener("click", () => {
    gameStarted = true;
    document.getElementById("startButton").style.display = "none";
    update();
});
