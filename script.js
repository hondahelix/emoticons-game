var character = document.getElementById("character");
var enemy = document.getElementById("enemy");
var attack = document.getElementById("attack");
var interval;
var both = 0;
var facing  = "right";
var gameRunning = true;

var characterHp = {hp:5 , type:"characterHp"}
var enemyHp = {hp:3 , type:"enemyHp"};

var charLeft;
var charTop;

var enemyLeft;
var enemyTop;

var attackLeft;
var attackTop;


if(gameRunning === true){

    const checkPosition = setInterval(() => {

        charLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        charTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));
        enemyTop = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));

        attackLeft = parseInt(window.getComputedStyle(attack).getPropertyValue("left"));
        attackTop = parseInt(window.getComputedStyle(attack).getPropertyValue("top"));

    }, 10);

    function setHp(data){
        let div = document.getElementById(data.type);
        div.innerHTML = '';
        //console.log(div);
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
        if(gameRunning === true){
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
        }
    });

    const hitDetection = setInterval(function(){
        //console.log(enemyTop);
        if((enemyLeft > attackLeft-35 && enemyLeft < attackLeft+35) && enemyTop === attackTop+20 && facing ==="right"){
            //console.log("hit");
            enemyHp.hp = enemyHp.hp-1;
            if(enemyLeft<645 && facing ==="right"){
                enemy.style.left = enemyLeft + 100+"px";
            }
            else if(enemyLeft>645 && facing ==="right"){
                enemy.style.left = 745+"px"
            }
        }
        //need to get hit to work for facing left
        //console.log(enemyLeft);
        if((enemyLeft < attackLeft+35 && enemyLeft > attackLeft -75) && enemyTop === attackTop && facing ==="left"){
            console.log("hit");
            enemyHp.hp = enemyHp.hp-1;
            if(enemyLeft>100 && facing ==="left"){
                enemy.style.left = enemyLeft - 100+"px";
            }
            else if(enemyLeft<100 && facing ==="left"){
                enemy.style.left = 30+"px"
            }
 
        }
        if(enemyHp.hp<=0){
            endGame("win");
            
        }
        else{
            setHp(enemyHp);
        }
        if((charLeft > enemyLeft-30 && charLeft < enemyLeft+45) && charTop === enemyTop+20){
            //console.log("hit");
            if(charLeft>100){
                character.style.left = charLeft - 100+"px";
            }
            else{character.style.left = 10+"px"}
            
            characterHp.hp = characterHp.hp-1;
            if(characterHp.hp<=0){
                endGame("lose");
                
                
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
        if(facing === "right"){
            attack.style.top = startAttackTop-40 + "px";
            attack.style.left = startAttackLeft +40+ "px";
            attack.classList.remove("hidden");
        }
        else{
            console.log(startAttackLeft)
            console.log(startAttackTop)
            attack.style.top = startAttackTop -20 + "px";
            attack.style.left = startAttackLeft + "px";
            attack.classList.add("leftAttack");
            attack.classList.remove("hidden");
        }
    }


    const enemyMovement = setInterval(() => {
        var randomNum = Math.floor(Math.random() * 4);
        if(randomNum === 0){
            if(enemy.classList !== "enemy1Jump"){
                enemy.classList.add("enemy1Jump");
                }
                setTimeout(()=>{enemy.classList.remove("enemy1Jump")},500);
        }
        else if(randomNum === 1 || randomNum === 3 ){
            if(enemyLeft>10){
                enemy.style.left = enemyLeft - 10+"px";
            }
            else{enemy.style.left = 30+"px"}
            
        }
        else if(randomNum === 2  && enemyLeft<735){
            enemy.style.left = enemyLeft + 10+"px";

        }
    }, 500);

    document.addEventListener('keyup', event => {
        if(gameRunning === true){
            clearInterval(interval);
            attack.classList.remove("leftAttack");
            both = 0;
            attack.classList.add("hidden");
            attack.style.left = -150+"px"
        }
    })

    function endGame(gameResults){
        var game = document.getElementById("game");
        setHp(characterHp);
        setHp(enemyHp);
        gameRunning = false;
        clearInterval(interval);
        clearInterval(checkPosition);
        clearInterval(hitDetection);
        clearInterval(enemyMovement);
        if(gameResults === "win"){
            var win = document.createElement("div");
            win.appendChild(document.createTextNode("You Win!!!"));
            win.setAttribute("class", "win");
            game.appendChild(win);
        }
        else{
            var lose = document.createElement("div");
            lose.appendChild(document.createTextNode("You Lose :("));
            lose.setAttribute("class", "lose");
            game.appendChild(lose);
        }
    }

}



