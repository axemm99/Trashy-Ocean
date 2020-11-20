

// --------------------------------------
// THREEJS
let scene, renderer, controls;
let camera;
let cameraParams = {
    fov: 0,
    aspect: 0,
    near: 0,
    far: 0
};
let winLimits = {
    left: 0,
    right: 0,
    bottom: 0
};
let winWidth, winHeight, winOffset = 40;
//


// --------------------------------------
// LIGTHS
let hemisphereLight, ambientLight, directionalLight;
//


// --------------------------------------
// OBJECTS

/* player */
let player, playerBox;
let playerSize = {
    w: 0,
    h: 0,
    d: 0
};
let fish = {
    body: "",
    topMouth: "",
    bottomMouth: "",
    tail: "",
    leftFin: "",
    rightFin: "",
    leftEye: "",
    rightEye: ""
};
let fishPivot = {
    tail: "",
    leftFin: "",
    rightFin: ""
};
let angTail = angFin = 0;
let bubbles = [], bubble;


/* trash */
let trashGroup = [], trash, trashBoxes = [], trashBox, trashType = 0;
let trashSize = {
    w: 0,
    h: 0,
    d: 0
};
//let collisionTrash = false;


/* points */
let points = [], point, pointBoxes = [], pointBox, pointType, pointValue;
let pointSize = {
    w: 0,
    h: 0,
    d: 0
};


/* particles */
let particles = [], particle;


/* colors */
let colors = {
    white: 0xffffff,
    black: 0x202020,
    grey: 0xbfbfbf,
    pink: 0xffb6c1,
    strongPink: 0xfd3e5b,
    salmon: 0xf67070,
    violet: 0xac89ff,
    orange: 0xff9e62,
    yellow: 0xffdc00,
    blue: 0x008080,
    seaBlue: 0x1ea7ba
};
let bodyColors = [colors.salmon, colors.violet, colors.orange, colors.blue];
//


// --------------------------------------
// GAME
let gameState, start = true, status = 0, replay, v = 2;
let movement = [];
let ip = it = 0;
let j = k = 1;
let p = t = 100;
let score, lives;
//