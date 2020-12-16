var character = document.getElementById("character");

// function characterJump(){
//     if(character.classList !== "animate"){
//         character.classList.add("animate");
//     }
//     setTimeout(()=>{character.classList.remove("animate")},500);
// }


document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code === 'Space') {
      console.log('Space pressed');
      if(character.classList !== "animate"){
        character.classList.add("animate");
        }
        setTimeout(()=>{character.classList.remove("animate")},500);

    }
  })