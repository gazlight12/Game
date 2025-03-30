// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let gameStarted = false;

// Load background
let bgImage = new Image();
bgImage.src = "assets/background.png"; // Make sure the file exists in the assets folder
let bgX = 0;
let bgSpeed = 2;

// Load character
let player = {
    x: 100,
    y: 280,
    width: 50,
    height: 50,
    speed: 4,
    dx: 0,
    dy: 0,
    jumping: false
};

let playerImage = new Image();
playerImage.src = "assets/player.png"; // Make sure the file exists in the assets folder

// Key controls
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false
};

// Event listeners for key presses
document.addEventListener("keydown", (event) => {
    if (event.key === "w") keys.w = true;
    if (event.key === "a") keys.a = true;
    if (event.key === "s") keys.s = true;
    if (event.key === "d") keys.d = true;
    if (event.code === "Space" && !player.jumping) {
        player.jumping = true;
        player.dy = -10;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "w") keys.w = false;
    if (event.key === "a") keys.a = false;
    if (event.key === "s") keys.s = false;
    if (event.key === "d") keys.d = false;
    if (event.code === "Space") keys.space = false;
});

// Game update function
function update() {
    if (!gameStarted) return;

    // Scroll the background
    bgX -= bgSpeed;
    if (bgX < -canvas.width) bgX = 0;

    // Move player
    player.dx = 0;
    if (keys.a) player.dx = -player.speed;
    if (keys.d) player.dx = player.speed;

    player.x += player.dx;

    // Jumping physics
    if (player.jumping) {
        player.y += player.dy;
        player.dy += 0.5; // Gravity

        if (player.y >= 280) { // Ground level
            player.y = 280;
            player.jumping = false;
        }
    }

    draw();
    requestAnimationFrame(update);
}

// Draw everything on canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background (scrolling)
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
