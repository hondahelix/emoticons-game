var character = document.getElementById("character");
var attack = document.getElementById("attack");
var interval;
var both = 0;
var facing  = "right";

var characterHp = {hp:5 , type:"characterHp"}
var enemyHp = {hp:3 , type:"enemyHp"};

setHp(characterHp);
setHp(enemyHp);

function setHp(data){
    let div = document.getElementById(data.type);
    console.log(div);
    for(let i =0; i<data.hp; i++){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode("<3"));
        li.setAttribute("class", "heart");
        div.appendChild(li)
    }
}

document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code === 'KeyW') {
      console.log('w pressed');
      if(character.classList !== "jump"){
        character.classList.add("jump");
        }
        setTimeout(()=>{character.classList.remove("jump")},500);

    }
    if((event.code === 'Space')){
        handleAttack()
    }
    //catches to make sure both left and right not being pressed
    if(both ===0){
        both++;
        if(event.code === 'KeyD'){
            interval = setInterval(moveRight, 1);
        }
        if(event.code === 'KeyA'){
            interval = setInterval(moveLeft, 1);
        }
    }
  });

function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
        character.style.left = left - 1+"px";
        facing  = "left";
    }
}

function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<760){
        character.style.left = left + 1+"px";
        facing  = "right";
    }
    
}

function handleAttack(){
    
    var startAttackLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var startAttackTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        attack.style.top = startAttackTop-40 + "px";
        attack.style.left = startAttackLeft +40+ "px";
        attack.classList.remove("hidden");
}

document.addEventListener('keyup', event => {
    clearInterval(interval);
    both = 0;
    attack.classList.add("hidden");
})

