let oneVisible = false;
let turnCounter = 0;
let imageVisible;
let lock = false;   
let checkId; 
let size = "small";
let level = "easy";
let pairsLeft = 4;
let sizeTab = 8;
const tab = [];
const tabImg = []

NewGame();
document.getElementById('newGame').addEventListener("click", function() {Game()});

function NewGame(){

    //Game level
    document.getElementById('easy').addEventListener("click", function() { changeLevel(level="easy")});
    document.getElementById('medium').addEventListener("click", function() { changeLevel( level="medium")});
    //Game Size
    document.getElementById('small').addEventListener("click", function() {changeSize(size="small")});
    document.getElementById('large').addEventListener("click", function() {changeSize(size="large")});
}

function Settings(){
    //if choosen level is medium add motion//default: No motion
    if(level == "medium"){
        console.log(level);
        let tabTop = document.querySelectorAll(".cardT");
        let tabBottom = document.querySelectorAll(".cardB");

        for(i=0; i<tabTop.length; ++i){
            tabTop[i].classList.add("MoveT");
            tabBottom[i].classList.add("MoveB");
            console.log(tabTop[i]);
            console.log(tabBottom[i]);
        }
    }
    //if choosen size is small remove ten cards//default: 18 cards       
    if(size == "small"){
        let deck = document.querySelectorAll(".card");
        for(let i=8; i<deck.length; ++i){   
            var smallDeck = document.querySelector('.cards');
            smallDeck.removeChild(smallDeck.lastElementChild);
       }
       document.querySelector(".cards").style.gridTemplateColumns = "repeat(4, 100px)";
       document.querySelector(".cards").style.gridTemplateRows = "repeat(2, 140px)";
    }

}

function Game(){

    Settings();
    document.querySelector('.startWindow').style.opacity='0';
    document.querySelector('.cards').style.opacity='1';
    document.querySelector('.playOption').innerHTML=('<button class="reset off" >Reset</button>');

    document.querySelector('.reset').addEventListener("click", function() {location.reload();});
    document.querySelector('.settings').innerHTML=('Turn: 0<br>Pairs left:' + pairsLeft);
    shuffleCards(); 
}

function shuffleCards() {

    while(tab.length !== sizeTab){
        let img = Math.floor(Math.random()*sizeTab+1);
        let found = tab.find(function(element) { 
            return element == img; 
        });
        if(found == undefined){
            tab.push(img);
            img = Math.ceil(img/2);
            tabImg.push("img" + img + ".jpg");
        }
    }
    
    for(let i=0; i<tab.length; ++i){
            let id = "card" + i;  
            choosenCard = document.getElementById(id);
            console.log(id);
            console.log(tabImg[i]);

            choosenCard.addEventListener("click", function() {revealCard(id, tabImg[i])});
        }
}

//A mechanism of checking, showing, removig and hiding Cards
function revealCard(id, imgVis){
    
    choosenCard = document.getElementById(id);
    var opacity = window.getComputedStyle(choosenCard).getPropertyValue("opacity");   
    
    if(opacity != 0 && lock == false && id != checkId){       
        checkId = id;
        opacity = 0;
        lock = true;
        choosenCard.style.backgroundImage="url('img/" + imgVis + "')";
        choosenCard.classList.add("cardVisible");
        

        if(oneVisible == false){  
            console.log(id);
            choosenCard = document.getElementById(id);
            choosenCard.style.backgroundImage="url('img/" + imgVis + "')";
            choosenCard.classList.add("cardVisible");

            imageVisible = imgVis;
            choosenCardFirst = choosenCard;
            oneVisible = true;
            lock = false;

        }else{
            choosenCardSecond = document.getElementById(id);
            choosenCardSecond.style.backgroundImage="url('img/" + imgVis + "')";
            choosenCardSecond.classList.add("cardVisible");

            ++turnCounter;
            document.querySelector('.settings').innerHTML='Turn: '+ turnCounter + '<br>Pairs left:' + pairsLeft;

                if(imageVisible == imgVis){
                    setTimeout(function() {restore2Cards(choosenCardSecond)}, 1000);
                }else{
                    setTimeout(function() { hide2Cards(choosenCardSecond) }, 1000);
                }
                oneVisible = false;
            }
    }
}

function hide2Cards(choosenSecond) {
    choosenCardFirst.style.backgroundImage="url(img/ReverseCard1.png)";
    choosenCardFirst.classList.remove("cardVisible");
    choosenCardSecond.style.backgroundImage="url(img/ReverseCard1.png)";
    choosenCardSecond.classList.remove("cardVisible");
    lock = false;
}

function restore2Cards(choosenSecond) {
    choosenCardFirst.style.opacity='0';
    choosenCardSecond.style.opacity='0';
    lock = false;
    --pairsLeft;
    
    if(pairsLeft == 0){
        document.querySelector('.container').innerHTML=('<h1>You win!<br>Done in '+turnCounter+' turns</h1>');
    }
}

function changeLevel(level){
       if(level == "easy"){
            document.getElementById('easy').classList.add("on");
            document.getElementById('easy').classList.remove("off");  
            document.getElementById('medium').classList.remove("on");  
            document.getElementById('medium').classList.add("off");        
       }else if(level == "medium"){
            document.getElementById('medium').classList.add("on");
            document.getElementById('medium').classList.remove("off");   
            document.getElementById('easy').classList.remove("on");
            document.getElementById('easy').classList.add("off");     
       }
}

function changeSize(size){
   if(size == "small"){
    document.getElementById('small').classList.add("on");
    document.getElementById('small').classList.remove("off");  
    document.getElementById('large').classList.remove("on");  
    document.getElementById('large').classList.add("off"); 
    sizeTab = 8;  
    pairsLeft = 4;
   }else if(size == "large"){
    document.getElementById('large').classList.add("on");
    document.getElementById('large').classList.remove("off");  
    document.getElementById('small').classList.remove("on");  
    document.getElementById('small').classList.add("off");
    sizeTab = 18;  
    pairsLeft = 9;
   }
}

