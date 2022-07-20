// for dark theme

function dark_theme(){
    var element =document.body;
    element.classList.toggle("dark_mode");
}

//variables

let inputDir = {x:0, y:0};
const moveSound = new Audio('media used\\mixkit-acute-guitar-single-string-2325.wav');
const foodSound=new Audio('media used\\mixkit-unlock-game-notification-253.wav');
const gameOverSound=new Audio('media used\\tmpowozkazf.mp3');

let score=0;
let speed=5;
let lastPaintTime=0;
let snakeArr = [{x: 13,y: 15}];
let snakeFood={x: 6,y:7};

function main(ctime) {                                      // this function is used for loop
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snakeArr){                    /* this function is used to detect collision between with itself and with grid walls*/

// if snake collide with itself
for(let i=1;i<snakeArr.length;i++){
    if((snakeArr[i].x == snakeArr[0].x) && (snakeArr[i].y == snakeArr[0].y)){
            return true;
    }
}

// if snake collide with wall(max grid)
if(((snakeArr[0].x >=18) || (snakeArr[0].x <= 0)) || ((snakeArr[0].y >= 18) || (snakeArr[0].y <= 0))){
    return true;
  }  
}


function gameEngine() {
// updating the snake array and food
if(isCollide(snakeArr)){
    gameOverSound.play();
    inputDir={x:0, y:0};
    alert("Game Over. Press any key to play again!");
    snakeArr=[{x:13,y:15}]
    score=0;

}

// if snake have eaten the food, increase the score and regenerate the food
if(snakeArr[0].y==snakeFood.y && snakeArr[0].x==snakeFood.x) {
    foodSound.play();
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    score++;
    
    if(score>highest){
        highest=score;
        localStorage.setItem("highscore",JSON.stringify(highest));
        high_score_card.innerHTML = "High Score : " + highest;
    }

    score_card.innerHTML="Score : "+score;
    

    let a=2;
    let b=16;
    snakeFood={x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};

}


// Moving the snake
for(let i=snakeArr.length-2;i>=0;i--){
    snakeArr[i+1] = {...snakeArr[i]};      /* ... is called spread operator. Eg., arr1=[1, 2, 3];
                                                                                  arr2=[4, 5, 6];
                                                                                  arr=[...arr1, ...arr2]; so that arr contains [1, 2, 3, 4, 5, 6]*/
}
snakeArr[0].x = snakeArr[0].x + inputDir.x;
snakeArr[0].y = snakeArr[0].y + inputDir.y;


// display the snake head on screen
board.innerHTML="";
snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

 // display the food on screen
foodElement = document.createElement('div');
foodElement.style.gridRowStart=snakeFood.y;
foodElement.style.gridColumnStart=snakeFood.x;
foodElement.classList.add('food');
board.appendChild(foodElement);

}


//logic

// to store highest score in local storage
let highscore = localStorage.getItem("highscore");
 if(highscore==null){
    highest=0;
    localStorage.setItem("highscore",JSON.stringify(highest));
}
else{
    highest=JSON.parse(highscore);
    high_score_card.innerHTML = "High Score : " + highest;
    
}


// to give commands to the snake through arrow buttons
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir= {x:0, y:1};                                 // start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp" : console.log("ArrowUp");
                         inputDir.x=0;
                         inputDir.y=-1;
                         break;

        case "ArrowDown" : console.log("ArrowDown");
                           inputDir.x=0;
                           inputDir.y=1;
                           break;

        case "ArrowLeft" : console.log("ArrowLeft");
                           inputDir.x=-1;
                           inputDir.y=0;
                           break;

        case "ArrowRight" : console.log("ArrowRight");
                            inputDir.x=1;
                            inputDir.y=0;
                            break;

        default:
        break;
    }

})