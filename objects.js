

// --------------------------------------
// SCENE
function createScene() {
    winHeight = window.innerHeight;
    winWidth = window.innerWidth;

    // empty scene
    scene = new THREE.Scene();

    // camera
    cameraParams.fov = 60;
    cameraParams.aspect = winWidth / winHeight;
    cameraParams.near = 1;
    cameraParams.far = 1000;
    camera = new THREE.PerspectiveCamera(cameraParams.fov, cameraParams.aspect, cameraParams.near, cameraParams.far);
    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

    // render and render size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(colors.seaBlue);

    // add the output of the renderer to the DIV with id "world"
    document.getElementById('world').appendChild(renderer.domElement);

    // window resize
    window.addEventListener('resize', handleWindowResize, false);

    calculateLimits();
}
//


// --------------------------------------
// WINDOW
function handleWindowResize() {
    winHeight = window.innerHeight;
    winWidth = window.innerWidth;

    renderer.setSize(winWidth, winHeight);
    camera.aspect = winWidth / winHeight;
    camera.updateProjectionMatrix();

    calculateLimits();
}

function calculateLimits() {
    let ang = (cameraParams.fov / 2) * Math.PI / 180;

    winLimits.bottom = camera.position.z * Math.tan(ang);
    winLimits.right = winLimits.bottom * camera.aspect;
    winLimits.left = -winLimits.bottom * camera.aspect;

    /*****/
    /*const geo1 = new THREE.BoxGeometry(0, 50, 500);
    const geo2 = new THREE.BoxGeometry(500, 0, 500);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xcc0132 }); // vermelho
    const material2 = new THREE.MeshBasicMaterial({ color: 0x538e6d }); // verde
    const material3 = new THREE.MeshBasicMaterial({ color: 0x35e6dc }); // azul
    const material4 = new THREE.MeshBasicMaterial({ color: 0xebd315 }); // amarelo
    const box1 = new THREE.Mesh(geo1, material1);
    const box2 = new THREE.Mesh(geo1, material2);
    const box3 = new THREE.Mesh(geo2, material3);
    const box4 = new THREE.Mesh(geo2, material4);

    box1.position.x = winLimits.right;
    box2.position.x = winLimits.left;
    box3.position.y = winLimits.bottom + winOffset / 2;
    box4.position.y = -winLimits.bottom;

    scene.add(box1);
    scene.add(box2);
    scene.add(box3);
    scene.add(box4);*/
}
//


// // --------------------------------------
// // MENUS

// /* intro */
// function menuIntro() {
// }
// //



// --------------------------------------
// GAME
function createGame() {
    // axis helper
    /*let axis = new THREE.AxesHelper(100);
    scene.add(axis);*/

    // camera
    camera.position.x = 0;
    camera.position.z = 300;
    camera.position.y = 50;

    // controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // lights
    createLights();

    // player
    createPlayer();

    lives = 3;
    score = 0;
}
//


// --------------------------------------
// LIGHTS
function createLights() {

    // hemisphere light
    hemisphereLight = new THREE.HemisphereLight(colors.grey, colors.white, 0.5);
    scene.add(hemisphereLight);

    // ambient light
    ambientLight = new THREE.AmbientLight(colors.strongPink, 0.2);
    scene.add(ambientLight);

    // directional light
    directionalLight = new THREE.DirectionalLight(colors.white, 0.8);
    directionalLight.position.set(0, 200, 0);
    scene.add(directionalLight);

    //var helper = new THREE.DirectionalLightHelper(directionalLight, 5);
    //scene.add(helper);
}
//


// --------------------------------------
// UI
function ui() {
    document.getElementById("scoreValue").innerHTML = score;
    document.getElementById("livesValue").innerHTML = lives;
}
//


// --------------------------------------
// OBJECTS

/* player */
function createPlayer() {
    const fishColors = [bodyColors[randomIndex(0, 4)], colors.yellow, colors.white];

    player = new THREE.Object3D();

    // body
    const bodyGeom = new THREE.BoxGeometry(20, 25, 25);
    const bodyMaterial = new THREE.MeshLambertMaterial({
        color: fishColors[0],
        flatShading: true
    });

    bodyGeom.vertices[0].y = bodyGeom.vertices[5].y -= 10;

    fishPivot.body = new THREE.Object3D;
    fish.body = new THREE.Mesh(bodyGeom, bodyMaterial);

    fishPivot.body.add(fish.body);
    player.add(fishPivot.body);

    // mouth
    const topMouthGeom = new THREE.BoxGeometry(20, 25, 6);
    const bottomMouthGeom = new THREE.BoxGeometry(20, 25, 10);

    topMouthGeom.vertices[1].z = topMouthGeom.vertices[4].z += 2.5;
    topMouthGeom.vertices[2].y = topMouthGeom.vertices[3].y = topMouthGeom.vertices[6].y = topMouthGeom.vertices[7].y += 6;

    bottomMouthGeom.vertices[0].y = bottomMouthGeom.vertices[1].y = bottomMouthGeom.vertices[4].y = bottomMouthGeom.vertices[5].y -= 18;

    fish.topMouth = new THREE.Mesh(topMouthGeom, bodyMaterial);
    fish.bottomMouth = new THREE.Mesh(bottomMouthGeom, bodyMaterial);

    fish.topMouth.position.z = fish.bottomMouth.position.z -= 15;

    fish.body.add(fish.topMouth);
    fish.body.add(fish.bottomMouth);

    // tail
    const tailGeom = new THREE.CylinderGeometry(0, 10, 10, 4);
    const tailMaterial = new THREE.MeshLambertMaterial({
        color: fishColors[1],
        flatShading: true
    });

    fishPivot.tail = new THREE.Object3D;
    fish.tail = new THREE.Mesh(tailGeom, tailMaterial);

    fish.tail.position.y -= 5

    fishPivot.tail.add(fish.tail);

    fishPivot.tail.rotation.x = -Math.PI / 2;
    fishPivot.tail.scale.x /= 3;
    fishPivot.tail.position.z += 10;
    fishPivot.tail.position.y -= 5;

    fish.body.add(fishPivot.tail);

    // fins
    const finGeom = new THREE.CylinderGeometry(0, 10, 14, 4);
    const finMaterial = new THREE.MeshLambertMaterial({
        color: fishColors[1],
        flatShading: true
    });

    fishPivot.leftFin = new THREE.Object3D;
    fishPivot.rightFin = new THREE.Object3D;
    fish.leftFin = new THREE.Mesh(finGeom, finMaterial);
    fish.rightFin = new THREE.Mesh(finGeom, finMaterial);

    fish.leftFin.scale.x = fish.rightFin.scale.x /= 5;
    fish.leftFin.rotation.y = fish.rightFin.rotation.y = -Math.PI / 2;
    fish.leftFin.rotation.z = fish.rightFin.rotation.z = Math.PI / 2;

    fishPivot.leftFin.add(fish.leftFin);
    fishPivot.rightFin.add(fish.rightFin);

    fishPivot.leftFin.position.x -= fishPivot.rightFin.position.x += 10;
    fishPivot.leftFin.position.y = fishPivot.rightFin.position.y -= 8;

    fish.body.add(fishPivot.leftFin);
    fish.body.add(fishPivot.rightFin);

    // eyes
    const eyeGeom = new THREE.BoxGeometry(2, 8, 5);
    const eyeMaterial = new THREE.MeshLambertMaterial({
        color: fishColors[2],
        flatShading: true
    });

    fish.leftEye = new THREE.Mesh(eyeGeom, eyeMaterial);
    fish.rightEye = new THREE.Mesh(eyeGeom, eyeMaterial);

    fish.leftEye.position.x -= fish.rightEye.position.x += 10;
    fish.leftEye.position.y = fish.rightEye.position.y += 2;
    fish.leftEye.position.z = fish.rightEye.position.z -= 10;

    fish.body.add(fish.leftEye);
    fish.body.add(fish.rightEye);

    player.rotation.x = -Math.PI / 3;
    player.position.y = 200;
    player.position.z = 100;

    scene.add(player);

    player.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
}

function updatePlayer() {
    let v = 2;

    angTail += Math.PI / 8;
    angFin += Math.PI / 16;

    fishPivot.tail.rotation.z = Math.cos(angTail) * 0.4;
    fishPivot.leftFin.rotation.z = Math.cos(angFin) * 0.2;
    fishPivot.rightFin.rotation.z = -Math.cos(angFin) * 0.2;

    if (player.position.z > 100 ) {
        player.position.z -= 0.5;
    }

    if (movement.includes("A")) {
        if (player.position.x - playerSize.w / 2 <= Math.round(winLimits.left)) {
            player.position.x = player.position.x;
        }
        else {
            player.position.x -= v;
            if (player.rotation.y < Math.PI / 6) {
                player.rotation.y += Math.PI / 160;
                if (player.rotation.z < Math.PI / 16) {
                    player.rotation.z += Math.PI / 80;
                }
            }
        }
    }

    if (movement.includes("D")) {
        if (player.position.x + playerSize.w / 2 >= Math.round(winLimits.right)) {
            player.position.x = player.position.x;
        }
        else {
            player.position.x += v;
            if (player.rotation.y > -Math.PI / 6) {
                player.rotation.y -= Math.PI / 160;
                if (player.rotation.z > -Math.PI / 16) {
                    player.rotation.z -= Math.PI / 80;
                }
            }
        }
    }

    if (movement.includes("W")) {
        if (player.position.y + playerSize.h / 2 >= -Math.round(winLimits.bottom) + Math.round(camera.position.z) + winOffset - playerSize.h * 2) {
            player.position.y = player.position.y;
        }
        else {
            player.position.y += v;
            if (player.rotation.x < Math.PI / 6) {
                player.rotation.x += Math.PI / 160;
            }
        }
    }

    if (movement.includes("S")) {
        if (player.position.y <= (Math.round(winLimits.bottom) - Math.round(camera.position.z) + winOffset)) {
            player.position.x = player.position.x;
        }
        else {
            player.position.y -= v;
            if (player.rotation.x > -Math.PI / 6) {
                player.rotation.x -= Math.PI / 160;
            }
        }
    }

    if (movement.length == 0) {
        player.rotation.x = 0;
        player.rotation.y = 0;
        player.rotation.z = 0;
    }

    // create bubbles
    createBubble();

    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].bubble.scale.x += 0.001;
        bubbles[i].bubble.scale.y += 0.001;
        bubbles[i].bubble.scale.z += 0.001;
        bubbles[i].bubble.position.x += bubbles[i].vx;
        bubbles[i].bubble.position.y += bubbles[i].vy;
        bubbles[i].bubble.position.z += bubbles[i].vz;

        if (bubbles[i].bubble.position.y > 120) {
            scene.remove(bubbles[i].bubble);
            bubbles.splice(i, 1);
        }
    }
}


/* trash */
function createTrash() {
    let minX = winLimits.left;
    let maxX = winLimits.right;
    let minY = Math.round(winLimits.bottom) - Math.round(camera.position.z) + winOffset;
    let maxY = Math.round(camera.position.z) - Math.round(winLimits.bottom) - (winOffset / 2);

    t = randomIndex(0, 100);

    if (t >= 0 && t <= 50) {
        trashType = 1;
    }
    else if (t > 50 && t <= 100) {
        trashType = 0;
    }

    trash = new THREE.Object3D();
    trashLoader = new THREE.OBJLoader();

    if (trashType == 0) {
        objLink = './models/bottle.obj';
        material = new THREE.MeshPhongMaterial({
            color: 0x436700,
            shininess: 50,
            flatShading: true
        });
        name = "bottle";
    }
    else {
        objLink = './models/bag1.obj';
        material = new THREE.MeshLambertMaterial({
            color: 0x3a3a3a,
            flatShading: true
        });
        name = "bag";
    }

    trashLoader.load(objLink, function (object) {
        trash = object;

        trash.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
        trash.name = name;

        trash.scale.set(0.5, 0.5, 0.5);

        trash.position.x = randomIndex(minX, maxX);
        trash.position.y = randomIndex(minY, maxY);
        trash.position.z = -800;

        trash.rotation.z = randomIndex(Math.PI / 2, 2 * Math.PI);

        trash.castShadow = true;
        trash.receiveShadow = true;

        scene.add(trash);
        trashGroup.push(trash);
    });
}

function updateTrash() {
    for (let i = 0; i < trashGroup.length; i++) {
        trashGroup[i].traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.position.z += v;
                child.rotation.x = child.rotation.y = child.rotation.z += 0.2 * (Math.PI / 180);

                // removes 1st point from array
                if (child.position.z >= 2100) {
                    scene.remove(trashGroup[i]);
                    trashGroup.shift();
                }
            }
        })
    }
    v += 0.001;
}

function collisionTrash() {
    for (let i = 0; i < trashGroup.length; i++) {
        // trash collision box
        const trashBox = new THREE.Box3().setFromObject(trashGroup[i]);

        if (trashBox.intersectsBox(playerBox)) {
            player.position.z += 15;
            lives--;

            ambientLight.intensity = 1.5;

            scene.remove(trashGroup[i]);
            trashGroup.splice(i, 1);
        }
        else {
            if (ambientLight.intensity > 0.2) {
                ambientLight.intensity -= 0.005;
            }
        }
    }
}


/* points */
function createPoint() {
    let minX = winLimits.left;
    let maxX = winLimits.right;
    let minY = Math.round(winLimits.bottom) - Math.round(camera.position.z) + winOffset;
    let maxY = Math.round(camera.position.z) - Math.round(winLimits.bottom) - (winOffset / 2);

    p = randomIndex(0, 100);

    if (j % p == 0) {
        pointType = 1;
        pointValue = 15;
    }
    else {
        pointType = 0;
        pointValue = 5;
    }
    j++;

    points.push({
        point: newPoint(randomIndex(minX, maxX), randomIndex(minY, maxY), pointType),
        value: pointValue
    });
}

function newPoint(x, y, pointType) {
    point = new THREE.Object3D();

    const geometry = new THREE.IcosahedronGeometry(8, 0);
    const normalMaterial = new THREE.MeshLambertMaterial({
        color: colors.pink,
        flatShading: true
    });
    const extraMaterial = new THREE.MeshLambertMaterial({
        color: colors.strongPink,
        flatShading: true
    });
    const basicPoint = new THREE.Mesh(geometry, normalMaterial);
    const extraPoint = new THREE.Mesh(geometry, extraMaterial);

    basicPoint.castShadow = extraPoint.castShadow = true;
    basicPoint.receiveShadow = extraPoint.receiveShadow = true;

    if (pointType == 0) {
        point = basicPoint;
    }
    else {
        point = extraPoint;
    }

    point.castShadow = true;
    point.receiveShadow = true;

    point.position.x = x;
    point.position.y = y;
    point.position.z = -300;

    scene.add(point);
    return point;
}

function updatePoint() {
    for (let i = 0; i < points.length; i++) {
        points[i].point.position.z += 1;
        points[i].point.rotation.x = points[i].point.rotation.y = points[i].point.rotation.z += 0.5 * (Math.PI / 180);

        // removes 1st point from array
        if (points[i].point.position.z >= 300) {
            points.shift();
        }
    }
}

function collisionPoint() {
    for (let i = 0; i < points.length; i++) {
        // point collision box
        const pointBox = new THREE.Box3().setFromObject(points[i].point);

        if (pointBox.intersectsBox(playerBox)) {
            score += points[i].value;

            let x = points[i].point.position.x;
            let y = points[i].point.position.y;
            let z = points[i].point.position.z;

            scene.remove(points[i].point);
            points.splice(i, 1);

            // create particles
            /*for (let i = 0; i < 10; i++) {
                createParticle(x, y, z);
            }*/
        }
    }
}


/* bubbles */
function createBubble() {
    const geometry = new THREE.SphereGeometry(1, 12, 12);
    const material = new THREE.MeshBasicMaterial({
        color: 0xf1f1f1,
        transparent: true
    });
    bubble = new THREE.Mesh(geometry, material);

    let vx = Math.random() * 0.15 - 0.1;
    let vy = Math.random() * 0.4 - 0.1;
    let vz = Math.random() * 0.2 - 0.1;

    bubble.position.x = player.position.x;
    bubble.position.y = player.position.y - 10;
    bubble.position.z = player.position.z + 10;
    bubble.material.opacity = 0.2;

    if (bubbles.length < 500) {
        scene.add(bubble);
        bubbles.push({ bubble: bubble, vx: vx, vy: vy, vz: vz });
    }
}

/* particles */
/*function createParticle(x, y, z) {
    var geom = new THREE.TetrahedronGeometry(3, 0);
    var mat = new THREE.MeshPhongMaterial({
        color: 0x009999,
        shininess: 0,
        specular: 0xffffff,
        flatShading: true
    });
    particle = new THREE.Mesh(geom, mat);

    particle.position.x = x;
    particle.position.y = y;
    particle.position.z = z;

    scene.add(particle);
    particles.push(particle);
}

function updateParticle() {
    for (let i = 0; i < particles.length; i++) {
        //particles[i].rotation.x = particles[i].rotation.y = particles[i].rotation.z = randomIndex(Math.PI / 2, 2 * Math.PI);
        particles[i].position.x = particles[i].position.x * randomIndex(-1, 1);
        //particles[i].position.y += randomIndex(-1, 1);

        console.log(i + "  -  " + particles[i].position.x)

        console.log(timer)
        if (timer < 0) {
            scene.remove(particles[i]);
            particles.splice(i, 1);
        }
        timer--
    }     
}*/