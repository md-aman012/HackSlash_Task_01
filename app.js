let body = document.querySelector("body")
let level = document.querySelector("h3")
let playground = document.querySelector(".playground")
let box = document.querySelectorAll(".box")
let helpbtn = document.querySelector('.help')

let started = false;
let memArr = []
let userArr = []
let levelnum = 0

let num = 0;
let clicks = 0; //this will count the user logic

let score =0;

body.addEventListener('keydown', () => {
   if(started==false){
    started= true;
    selectBox()
   }
})

function selectBox(){
    level.innerText = `Level ${levelnum}`
    levelnum++;

    let randVal = Math.floor((Math.random() *4))
    
    flashRandom(randVal)

    memArr.push(box[randVal].id)
}

function flashRandom(randVal){
    box[randVal].classList.add('memoryflash')
    setTimeout( () => {
        box[randVal].classList.remove('memoryflash')
    },250)
}

playground.addEventListener('click' ,(event) => {
    if(started){
        if(event.target.className == 'box'){
           userFlash(event.target)
            clicks++;
            // console.log(clicks);
            console.log(memArr)
            console.log(userArr)
            userArr.push(event.target.id)
            checker()
            
        }
    }
})

function checker (){
    // memarr = [1,3,4,2]
    //usrArr : [1]

    if(userArr[clicks-1] != memArr[clicks-1]){
        level.innerText = `You Have Lost Game & Your Score is ${score}`
        started = false 
        memArr = []
        userArr =[]
        clicks= 0;
        num = 0;
        score =0;

        body.classList.add('gameOver')
        console.log(body.classList);

        setTimeout(() => {
            body.classList.remove('gameOver')
        }, 500)
        
        levelnum = 1
    } else{
        num++;

    }
    if(num == memArr.length && num !=0){
        score += 10;
        userArr=[]
        clicks = 0
        num =0
        setTimeout(selectBox , 500)
    }
}

function userFlash (box) {
    box.classList.add('userFlash');

    setTimeout(() => {
        box.classList.remove('userFlash')
    }, 200)
}

helpbtn.addEventListener('click', () => {
    let initText = level.innerText;

    level.innerText = `Memory array is : ${memArr}`

    setTimeout(() => {
        level.innerText = initText
    }, 2000)
})