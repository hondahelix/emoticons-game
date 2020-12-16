var character = document.getElementById("character");
var enemy = document.getElementById("enemy");
var attack = document.getElementById("attack");
var interval;
var both = 0;
var facing  = "right";

var characterHp = {hp:5 , type:"characterHp"}
var enemyHp = {hp:3 , type:"enemyHp"};


function setHp(data){
    let div = document.getElementById(data.type);
    div.innerHTML = '';
    console.log(div);
    for(let i =0; i<data.hp; i++){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode("<3"));
        li.setAttribute("class", "heart");
        div.appendChild(li)
    }
}
setHp(characterHp);
setHp(enemyHp);

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

  const hitDetection = setInterval(function(){
    //need to check it character is touching enemy
    var charLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var charTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    var enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));
    var enemyTop = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));
    //console.log(charLeft,charTop,enemyLeft,enemyTop)
    if((charLeft > enemyLeft-30 && charLeft < enemyLeft+45) && charTop === enemyTop+20){
        //console.log("hit");
        character.style.left = charLeft - 100+"px";
        characterHp.hp = characterHp.hp-1;
        if(characterHp.hp<=0){
            alert("you lose");
            
        }
        else{
            setHp(characterHp);
        }
    }

},10);

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


