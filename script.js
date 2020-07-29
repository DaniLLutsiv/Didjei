const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const place = new Image();
place.src = "img/place.jpg";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 100;;
let score = 0; 

let food = {
	x: Math.floor((Math.random() * 8 )) * box , 
	y: Math.floor((Math.random() * 8 )) * box , 
};

let snake = [];
snake[0] = {
	x: 4 * box,
	y: 4 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(){
	if (event.keyCode == 37 && dir !="right") {
		dir = "left";
	}
	if (event.keyCode == 38 && dir !="down") {
		dir = "up";
	}
	if (event.keyCode == 39 && dir !="left") {
		dir = "right";
	}
	if (event.keyCode == 40 && dir !="up") {
		dir = "down";
	}
}



function drawGame(){
	ctx.drawImage(place , 0 ,0);
	ctx.drawImage(foodImg, food.x, food.y);
	for (var i = 0; i < snake.length; i++) {
		ctx.fillStyle = 'green';
		ctx.fillRect(snake[i].x, snake[i].y , box, box)
	}
	ctx.fillStyle = 'red';
	ctx.font = '50px Arial';
	ctx.fillText(score, 10 , 50)

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
		x: Math.floor((Math.random() * 8 )) * box , 
		y: Math.floor((Math.random() * 8 )) * box , 
	  	};
	}else {
		snake.pop();
	}

	if (snakeX < box || snakeX > box* 8 ||snakeY < box || snakeY > box* 8) 
		clearInterval(game);
	

	if (dir == 'left') snakeX -= box;
	if (dir == 'right') snakeX += box;
	if (dir == 'up') snakeY -= box;
	if (dir == 'down') snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};
	snake.unshift(newHead);
}


let game = setInterval(drawGame,200);