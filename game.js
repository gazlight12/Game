// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set fullscreen with a fixed wider width
function resizeCanvas() {
    canvas.width = window.innerWidth; // Use the full width of the window
    canvas.height = window.innerHeight; // Use the full height of the window
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Set initial size

let gameStarted = false;

// Load background
let bgImage = new Image();
bgImage.src = "assets/background.png"; // Ensure the file exists
let bgX = 0; // Background X position
let bgSpeed = 0; // Background speed now controlled by player

// Load character
let player = {
    x: 100,
    y: canvas.height - 120,
    width: 50,
    height: 50,
    speed: 6,
    dx: 0,
    dy: 0,
    jumping: false,
    gravity: 0.5,
    jumpPower: -12
};

let playerImage = new Image();
playerImage.src = "assets/player.png"; // Ensure the file exists

// Key controls
const keys = { w: false, a: false, d: false };

// Event listeners for key presses
document.addEventListener("keydown", (event) => {
    if (event.key === "w" && !player.jumping) {
        player.jumping = true;
        player.dy = player.jumpPower; // Jump power
    }
    if (event.key === "a") keys.a = true;
    if (event.key === "d") keys.d = true;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "a") keys.a = false;
    if (event.key === "d") keys.d = false;
});

// Game loop
function update() {
    if (!gameStarted) return;

    // Reset movement
    player.dx = 0;

    // Move left
    if (keys.a) {
        player.dx = -player.speed;
    }

    // Move right
    if (keys.d) {
        player.dx = player.speed;
    }

    // Apply movement
    player.x += player.dx;

    // Update background position based on player movement
    bgX -= player.dx; // Scroll background with player

    // Prevent background from scrolling infinitely
    if (bgX > 0) bgX = 0;
    if (bgX < -canvas.width) bgX = -canvas.width;

    // Jumping & Gravity
    if (player.jumping) {
        player.y += player.dy;
        player.dy += player.gravity;
        if (player.y >= canvas.height - 120) {
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

    // Draw background (attached to player)
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
