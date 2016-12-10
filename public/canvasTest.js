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

    var playerStand = new Image();
    playerStand.src = sprites[0].fileName;
    console.log(playerStand);

    var playerStep = new Image();
    playerStep.src = sprites[1].fileName;

    var playerLastStep = new Image();
    playerLastStep.src = sprites[2].fileName;

    var animations = [playerStand, playerStep, playerLastStep];
    console.log(animations[0]);

    var player = playerStand;

    var background = new Image();
    background.src = 'ui/test-background.png';
    background.onload = function() {
        game.drawImage(background, 0, 0, 800, 600);
    }


    function draw() {
        game.drawImage(background, 0, 0, theScreen.width, theScreen.height);

        function movement(event) {
            if (event.keycode == 97) {
                player = 
            }
        }
    }
}
