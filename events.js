

// --------------------------------------
// KEY EVENTS

/* key down */
function handleKeyDown(event) {
    let char = String.fromCharCode(event.keyCode);

    if (char == "A" || char == "D" || char == "W" || char == "S")
        movement.push(char);
    else
        movement = [];

    event.preventDefault();
}

/* key up */
function handleKeyUp(event) {
    let char = String.fromCharCode(event.keyCode);
    
    if (char == "A" || char == "D" || char == "W" || char == "S")
        movement = [];

    event.preventDefault();
}
//


// --------------------------------------
// MOUSE EVENTS
function handleMouseUp(event) {
    if (status == -1) {
        hideReplay();

        start = true;
        status = 0;

        changeState(1);
    }
    event.preventDefault();
}