let oneVisible = false;
let turnCounter = 0;
let imageVisible;
let lock = false;    


function NewGame(){
    const tab = [];
    const tabImg = []
    //shuffle card 
    while(tab.length !== 8){
        let img = Math.floor(Math.random()*8+1);
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
            choosenCard.addEventListener("click", function() {revealCard(id, tabImg[i])});
    }
}

//A mechanism of checking, showing, removig and hiding Cards
function revealCard(id, imgVis){
    
    choosenCard = document.getElementById(id);
    var opacity = window.getComputedStyle(choosenCard).getPropertyValue("opacity");   
    
    if(opacity != 0 && lock == false){

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

                if(imageVisible == imgVis){
                    setTimeout(function() {restore2Cards(choosenCardSecond)}, 750);
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
}


NewGame();