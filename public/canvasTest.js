var sprites;

$.get('/avatars', function(data) {
    console.log(data);
    var sprites = data;
    console.log(data);
    renderImages(data);
});


function renderImages(data) {
    var sprites = data;
    var theScreen = document.getElementById('myCanvas');
    var game = theScreen.getContext('2d');
    var x = 0;
    var y = 0;
    var xSpeed = 0;
    var ySpeed = 0;
    var startTime = Date.now() + 3000;
    var height = 50;
    var imageRatio = 1;

    var playerStep = new Image();
    playerStep.src = sprites[1].fileName;

    var playerLastStep = new Image();
    playerLastStep.src = sprites[2].fileName;

    var playerLeftStand = new Image();
    playerLeftStand.src = sprites[3].fileName;

    var playerLeftStep = new Image();
    playerLeftStep.src = sprites[4].fileName;

    var playerLastLeftStep = new Image();
    playerLastLeftStep.src = sprites[5].fileName;

    var background = new Image();
    background.src = 'ui/test-background.png';
    background.onload = function() {
        game.drawImage(background, 0, 0, 800, 600);
    }

    var playerStand = new Image();
    playerStand.src = sprites[0].fileName;
    playerStand.onload = function() {
        imageRatio = playerStand.width / playerStand.height;
    }

    //player = playerStand;

    function draw() {
        game.clearRect(0, 0, theScreen.width, theScreen.height);
        game.drawImage(background, 0, 0, theScreen.width, theScreen.height);
        game.font = "10px Arial";
        game.fillStyle = 'white';
        x = x + xSpeed;
        y = y + ySpeed;

        if (x < 0) {
            x = 0;
            player = playerLeftStand;
        }
        if (x >= 0) {
            player = playerStand;
        }
        if (y >= 0) {
            y = 0;
        }

        if (y < 0) {
            y = 0;
        }

        if (x > theScreen.width - 30) {
            x = theScreen.width - 30;
        }


//        document.onkeyDown = movement();

        game.drawImage(player, x, y, height * imageRatio, height);
    }
    var updateGame = setInterval(draw, 20);


    //document.onkeydown = movement();
    function movement(event) {
        if (event.keyCode == 37) {
            xSpeed = -5;
        }
        if (event.keyCode == 39) {
            xSpeed = 5;
        }

        game.width = game.width;
        game.drawImage(player, x, y, height * imageRatio, height);
        game.stroke();
    }

    document.onkeydown = movement;

}
