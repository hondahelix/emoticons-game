var character = document.getElementById("character");
var attack = document.getElementById("attack");
var interval;
var both = 0;
var facing  = "right";
// function characterJump(){
//     if(character.classList !== "animate"){
//         character.classList.add("animate");
//     }
//     setTimeout(()=>{character.classList.remove("animate")},500);
// }


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
        character.style.left = left - 2+"px";
        facing  = "left";
    }
}

function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<540){
        character.style.left = left + 2+"px";
        facing  = "right";
    }
    
}

function handleAttack(){
    
    // var startAttackLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    // var startAttackTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    // attack.style.left = startAttackLeft + 15+ "px";
    // attack.style.top = startAttackTop + "px";
    //need to get this to move accross the board"
    attack.classList.remove("hidden");

}

document.addEventListener('keyup', event => {
    clearInterval(interval);
    both = 0;
})