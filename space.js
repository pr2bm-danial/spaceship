let keySpace = false;
let keyUp = false;
let keyDown = false;
let backgroundImage = new Image();

let canvas;
let ctx;

let spaceShip = {
    x: 30,
    y: 200,
    width: 100,
    height: 50,
    src: "spaceship.png"
};

let alien = [];
let shoot = [];
let shooting = false; // Neue Variable, um den Schussstatus zu überwachen

let moveUp = false; // Neue Variable, um den nach oben Button zu benutzen

document.addEventListener("keydown", function (e) {
    if (e.key == " ") { // Leertaste gedrückt
        if (!shooting) { // Überprüfen Sie, ob bereits ein Schuss abgefeuert wird
            keySpace = true;
            shooting = true; // Setzen Sie den Schussstatus auf "true"
            createShoot();
        }
    }

    if (e.key == "ArrowUp") { // Nach oben gedrückt
        keyUp = true;
    }

    if (e.key == "ArrowDown") { // Nach unten gedrückt
        keyDown = true;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('shootButton').addEventListener('click', function() {
        if (!shooting) {
            shooting = true; // Setzen Sie den Schussstatus auf "true"
            createShoot();
            shooting = false;
           
        }
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
let moveUpButton = document.getElementById('nachOben');
let moveUpInterval;

moveUpButton.addEventListener('mousedown', function() {
    // Beginnen Sie das Intervall, wenn die Taste gedrückt wird
    moveUpInterval = setInterval(function() {
        spaceShip.y -= 5;
    }, 1000 / 25);
});

moveUpButton.addEventListener('mouseup', function() {
    // Beenden Sie das Intervall, wenn die Taste losgelassen wird
    clearInterval(moveUpInterval);
});

moveUpButton.addEventListener('mouseleave', function() {
    // Beenden Sie das Intervall, wenn der Mauszeiger das Button-Element verlässt
    clearInterval(moveUpInterval);
});
})


document.addEventListener('DOMContentLoaded', function() {
    let moveUpButton = document.getElementById('nachUnten');
    let moveUpInterval;
    
    moveUpButton.addEventListener('mousedown', function() {
        // Beginnen Sie das Intervall, wenn die Taste gedrückt wird
        moveUpInterval = setInterval(function() {
            spaceShip.y += 5;
        }, 1000 / 25);
    });
    
    moveUpButton.addEventListener('mouseup', function() {
        // Beenden Sie das Intervall, wenn die Taste losgelassen wird
        clearInterval(moveUpInterval);
    });
    
    moveUpButton.addEventListener('mouseleave', function() {
        // Beenden Sie das Intervall, wenn der Mauszeiger das Button-Element verlässt
        clearInterval(moveUpInterval);
    });
    })




document.addEventListener("keyup", function (e) {
    if (e.key == " ") { // Leertaste losgelassen
        keySpace = false;
        shooting = false; // Setzen Sie den Schussstatus auf "false"
    }

    if (e.key == "ArrowUp") { // Nach oben losgelassen
        keyUp = false;
    }

    if (e.key == "ArrowDown") { // Nach unten losgelassen
        keyDown = false;
    }
});

function startGame() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    loadImages();
    setInterval(update, 1000 / 25);
    setInterval(createAliens, 5000);
    setInterval(checkForCollision, 1000 / 25);
    draw();
}

function checkForCollision() {
    for (let i = alien.length - 1; i >= 0; i--) {
        const currentAlien = alien[i];
        if (spaceShip.x + spaceShip.width > currentAlien.x
            && spaceShip.y + spaceShip.height > currentAlien.y
            && spaceShip.x < currentAlien.x
            && spaceShip.y < currentAlien.y) {
            spaceShip.img.src = "explosion.png";
            console.log("collision with alien!");
            alien.splice(i, 1);
            alert("Game Over!");
        }
    }
    
    for (let i = shoot.length - 1; i >= 0; i--) {
        const currentShot = shoot[i];
        for (let j = alien.length - 1; j >= 0; j--) {
            const currentAlien = alien[j];
            if (currentAlien.x + currentAlien.width > currentShot.x
                && currentAlien.y + currentAlien.height > currentShot.y
                && currentAlien.x < currentShot.x
                && currentAlien.y < currentShot.y) {
                console.log("collision with shot!");
                currentAlien.img.src = "explosion.png"
                alien.splice(j, 1);
                shoot.splice(i, 1);
                break; // Beenden Sie die innere Schleife, da ein Schuss nur einmal auf ein UFO treffen kann
            }
        }
    }
}


function createShoot() {
    let shot = {
        x: spaceShip.x + spaceShip.width, // Stellen Sie sicher, dass der Laserstrahl vom rechten Rand des Raumschiffs ausgeht
        y: spaceShip.y + spaceShip.height / 2 - 15, // Positionieren Sie den Laserstrahl in der Mitte des Raumschiffs
        width: 50,
        height: 30,
        src: "shoot.png",
        img: new Image(),
    };
    shot.img.src = shot.src;
    shoot.push(shot);
    
}

function createAliens() {
    let aliens = {
        x: 750,
        y: Math.floor(Math.random() * 480) + 5,
        width: 100,
        height: 50,
        src: "alien.png",
        img: new Image(),
    };
    aliens.img.src = aliens.src;
    alien.push(aliens);
}

function update() {
    if (keyUp) {
        spaceShip.y -= 5;
    }
    if (keyDown) {
        spaceShip.y += 5;
    }

    alien.forEach(function (alien) {
        alien.x -= 5;
    });

    // Bewegen Sie die Laserstrahlen nach rechts
    shoot.forEach(function (shot) {
        shot.x += 8;
    });

    // Entfernen Sie Laserstrahlen, die den Bildschirmrand erreichen
    shoot = shoot.filter(function (shot) {
        return shot.x < canvas.width;
    });
}

function loadImages() {
    backgroundImage.src = "sky.png";
    spaceShip.img = new Image();
    spaceShip.img.src = spaceShip.src;

    alien.img = new Image();
    alien.img.src = alien.src;
}

function draw() {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(spaceShip.img, spaceShip.x, spaceShip.y, spaceShip.width, spaceShip.height);

    alien.forEach(function (alien) {
        ctx.drawImage(alien.img, alien.x, alien.y, alien.width, alien.height);
    });

    shoot.forEach(function (shot) {
        ctx.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height);
    });

    requestAnimationFrame(draw);
}
