var character = document.getElementById("character");
var interval;
var both = 0;
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
    character.style.left = left - 2+"px";
}

function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    character.style.left = left + 2+"px";
}

document.addEventListener('keyup', event => {
    clearInterval(interval);
    both = 0;
})