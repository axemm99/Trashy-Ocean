

// --------------------------------------
window.onload = function init() {

    // key handling
    initInput();

    // scene
    createScene();

    // game state
    changeState(1);

    // loop
    animate();
}
//


// --------------------------------------
// ANIMATE
function animate() {
    switch (gameState) {
        case 0:
            intro()
            break
        case 1:
            startGame()
            break
        case 2:
            gameplay()
            break
        case 3:
            gameover()
            break
    }

    // render
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}
//


// --------------------------------------
// GAME STATE
function changeState(state) {
    switch (state) {
        case 0: // Intro
        case 1: // Start Game
        case 2: // Gameplay
        case 3: // Game Over
            gameState = state;
            break;
    }
}
//


// --------------------------------------
// EVENTS INPUT
function initInput() {
    window.addEventListener('keydown', handleKeyDown, false)
    window.addEventListener('keyup', handleKeyUp, false)
    window.addEventListener('mouseup', handleMouseUp, false);
}
//


// --------------------------------------
// RANDOM INDEX GENERATOR
function randomIndex(min, max) {
    return parseInt(Math.random() * (max - min) + min)
}
//


// --------------------------------------
// REPLAY MESSAGE
function showReplay() {
    document.getElementById('replay').style.display = "block";
}

function hideReplay() {
    document.getElementById('replay').style.display = "none";
}
//