let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d');
const UNIT = 20;
let imgLeft = document.getElementById("left");
let imgApple = document.getElementById("Apple");
let score = 0;
function Vector2d (x,y) {
    this.x = x;
    this.y = y;
}
function Snake() {
    let SnakeBody = [
        new Vector2d (UNIT * 15,UNIT * 15),
        new Vector2d (UNIT * 16,UNIT * 15),
        new Vector2d (UNIT * 17,UNIT * 15),
    ]
    this.draw = function () {
        ctx.drawImage(imgLeft,SnakeBody[0].x,SnakeBody[0].y,UNIT,UNIT)
        function clearCanvas(color) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 760,20);}
        clearCanvas("darkolivegreen")
        ctx.fillStyle = 'yellow'
        for (let i = 1; i < SnakeBody.length; i++) {
            ctx.fillRect(SnakeBody[i].x,SnakeBody[i].y, UNIT-1, UNIT-1)
        }
    }
    this.clear = function () {
        ctx.fillStyle = 'black'
        for (let i = 0; i < SnakeBody.length; i++) {
            ctx.fillRect(SnakeBody[i].x,SnakeBody[i].y, UNIT, UNIT)
        }
    }
    this.speed = new Vector2d(-1, 0)
    this.move = function() {
        this.clear()
        for (let i = SnakeBody.length - 1; i>=1; i--) {
            SnakeBody[i].x = SnakeBody[i-1].x
            SnakeBody[i].y = SnakeBody[i-1].y
        }
        SnakeBody[0].x += this.speed.x*UNIT
        SnakeBody[0].y += this.speed.y*UNIT
        this.draw()
    }

    this.Eat = function (food) {
        let head = SnakeBody[0];
        if(food.x === head.x && food.y === head.y) {
            score++;
            new Audio("./audio/eat.mp3").play();
        }
        return food.x === head.x && food.y === head.y // boolean cả 2 cùng đúng thì if mới đc chạy
    }

    this.Grow = function () {
        let X = SnakeBody[SnakeBody.length-1].x - SnakeBody[SnakeBody.length-2].x;
        let Y = SnakeBody[SnakeBody.length-1].y - SnakeBody[SnakeBody.length-2].y;
        let newPart = new Vector2d(SnakeBody[SnakeBody.length-1].x + X, SnakeBody[SnakeBody.length-1].y + Y,)
        SnakeBody.push(newPart)
        this.draw()
    }

    function gameOverStyle () {
        ctx.font = "60px Algerian";
        ctx.fillStyle = "red"
        ctx.fillText("GAME OVER", 225,350)
        new Audio("hit.mp3")
    }

    this.Death = function () {
            if (SnakeBody[0].x < 0 || SnakeBody[0].x === 760 || SnakeBody[0].y < 20 || SnakeBody[0].y === 720) {
                clearInterval(myInterval)
                gameOverStyle ()
                new Audio("./audio/hit.mp3").play()
            }
            for (let i = 1; i < SnakeBody.length-1; i++) {
                if (SnakeBody[i].x === SnakeBody[0].x && SnakeBody[i].y === SnakeBody[0].y) {
                    clearInterval(myInterval)
                    gameOverStyle ()
                    new Audio("./audio/hit.mp3").play()
                }
            }
}

}
function Food () {
    this.getRandomNumber = function() {
        let randomNumber = Math.floor(Math.random() * 700);
        randomNumber = randomNumber - randomNumber % UNIT;
        console.log(randomNumber);
        return randomNumber;
    }
    this.draw = function () {
        this.x = this.getRandomNumber();
        this.y = this.getRandomNumber() + UNIT;
        console.log(this.x);
        console.log(this.y);
        ctx.drawImage(imgApple,this.x, this.y, UNIT, UNIT);
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 8, 16);
}

let player = new Snake();
setTimeout(function (){
    player.draw()
},30)
let apple = new Food();
setTimeout(function (){
    apple.draw()
},30)
let myInterval;
function startGame() {
        new Audio("./audio/start.mp3").play()
        myInterval = setInterval(function (){
        player.move();
        player.Death();
        drawScore();
        if(player.Eat(apple)) {
            player.Grow();
            setTimeout(function (){
                apple.draw()
            },100);
        }
    },100);

}
console.log(document.querySelector("body").style.backgroundImage)
document.onkeydown = function (evt){
        switch (evt.keyCode) {
            case 37:
                imgLeft.src = "./Picture/Left.jpg"
                if (player.speed.x === 1) {
                    break
                }
                player.speed = new Vector2d(-1, 0)
                break;
            case 39:
                imgLeft.src = "./Picture/Right.jpg"
                if (player.speed.x === -1) {
                    break
                }
                player.speed = new Vector2d(1, 0)
                break;
            case 38:
                imgLeft.src = "./Picture/Up.jpg"
                if (player.speed.y === 1) {
                    break
                }
                player.speed = new Vector2d(0, -1)
                break;
            case 40:
                imgLeft.src = "./Picture/Down.jpg"
                if (player.speed.y === -1) {
                    break
                }
                player.speed = new Vector2d(0, 1)
                break;
        }
    }

    //Change back-ground
let index = 0;
function changeBackGround() {
    let backImg = ['url("./Picture/Stage2.jpg")','url("./Picture/Stage.jpg")','url("./Picture/Stage1.jpg")',
                   'url("./Picture/Stage3.jpg")','url("./Picture/Stage4.jpg")']
    new Audio("./audio/button.mp3").play()
    if (index === 4) {
        index = 0;
        document.querySelector("body").style.backgroundImage = backImg[index];
    } else {
        index++;
        document.querySelector("body").style.backgroundImage = backImg[index];
    }
}