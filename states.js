

// --------------------------------------
// GAMEOVER

function gameover() {
    for (let i = 0; i < scene.children.length; i++) {
        scene.remove(scene.children[i]);
    }

    player = null;
    points = [];
    trashGroup = [];
    bubbles = [];

    showReplay();
}
//


// --------------------------------------
// GAME

/* start game */
function startGame() {

    // game scene
    createGame();

    // game state
    changeState(2);
}


/* gameplay */
function gameplay() {

    // ui
    ui();

    if (status == 0) {
        if (start) {
            if (player.position.y > 0) {
                player.position.y -= 2;

                if (player.rotation.x < 0) {
                    player.rotation.x += 0.5 * (Math.PI / 180);
                }
            }
            else {
                start = false;
            }
        }
        else {
            // player movement
            updatePlayer();

            // player collision box
            playerBox = new THREE.Box3().setFromObject(player);

            // create trash
            if (it < 600) {
                let f = randomIndex(1, 200);
                if (it % f == 0) {
                    f = randomIndex(1, 200);
                    createTrash();
                }
                it++;
            }
            else {
                it = 0;
            }

            // trash movement
            updateTrash();

            // trash player collision
            collisionTrash();

            // create points
            if (ip < 1200) {
                let f = randomIndex(1, 600);
                if (ip % f == 0) {
                    f = randomIndex(0, 600);
                    createPoint();
                }
                ip++;
            }
            else {
                ip = 0;
            }

            // point movement
            updatePoint();

            // point player collision
            collisionPoint();

            // gameover
            if (lives == 0) {
                status = 1;
            }
        }
    }
    else if (status == 1) {
        player.position.y += 2;

        if (player.rotation.x > -Math.PI / 2) {
            player.rotation.x += 5 * (Math.PI / 180);
        }

        fishPivot.tail.rotation.z = fishPivot.leftFin.rotation.z = fishPivot.rightFin.rotation.z = 0;

        if (player.position.y >= 200) {
            status = -1;
        }
    }
    else {
        changeState(3);
    }
}
//