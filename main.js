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

function revealCard(id, imgVis){

    choosenCard = document.getElementById(id);
    choosenCard.style.backgroundImage="url('img/" + imgVis + "')";
    choosenCard.classList.add("cardVisible");
    //choosenCard.classList.remove("card");


    if(oneVisible == false){
        choosenCard = document.getElementById(id);
        choosenCard.style.backgroundImage="url('img/" + imgVis + "')";
        choosenCard.classList.add("cardVisible");

        imageVisible = imgVis;
        choosenCardFirst = choosenCard;
        oneVisible = true;
    }else{
        choosenCard = document.getElementById(id);
        choosenCard.style.backgroundImage="url('img/" + imgVis + "')";
        choosenCard.classList.add("cardVisible");

        ++turnCounter;
        oneVisible = false;

            if(imageVisible == imgVis){
                setTimeout(function() {
                choosenCard.classList.remove("card");
                choosenCard.style.backgroundImage="none";
                choosenCardFirst.classList.remove("card");
                choosenCardFirst.style.backgroundImage="none";
            }, 750);

            }else{
                setTimeout(function() {
                choosenCard.style.backgroundImage="url(img/ReverseCard1.png)";
                choosenCard.classList.remove("cardVisible");
                choosenCardFirst.style.backgroundImage="url(img/ReverseCard1.png)";
                choosenCardFirst.classList.remove("cardVisible");
                }, 1000);
            }
    }
    console.log(imageVisible)
    console.log(imgVis);

    //id.classList.add("card1");
}

//let pictureName = "url('img/"+ j +".jpg')";
//document.getElementById(tab[i]).style.backgroundImage=pictureName;

NewGame();