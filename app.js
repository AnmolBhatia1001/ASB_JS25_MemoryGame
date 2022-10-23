const cards = document.querySelectorAll(".card");
let score = 0;
let moves = 0;
let isCardFlipped = false;
let boardFreez = false;
let firstSelection ;
let secondSelection ;
randomization()
function flipCard(){
    if(boardFreez) return ;
    if(this === firstSelection) return ;
    this.classList.add("flip")

    if(!isCardFlipped){
        firstSelection = this;
        isCardFlipped = true
    }else{
        secondSelection = this;
        isCardFlipped = false

        console.log(firstSelection);
        console.log(secondSelection);
        console.log(firstSelection === secondSelection);

        if(firstSelection.dataset.character === secondSelection.dataset.character){
            firstSelection.removeEventListener("click", flipCard)
            secondSelection.removeEventListener("click", flipCard)
            score++
            moves++
        }else{
            boardFreez = true
            setTimeout(()=>{
                firstSelection.classList.remove("flip")
                secondSelection.classList.remove("flip")

                isCardFlipped = false ;
                boardFreez = false ;
                firstSelection = null ;
                secondSelection = null ;
            },1250)
            moves++
        }
    }
    document.getElementById("score").innerText = score
    document.getElementById("moves").innerText = moves

}

function randomization(){
    // Fisher–Yates shuffle Algorithm
    for (let i = ((cards.length)-1); i > 0 ; i--) {
        let randomIndex = Math.floor(Math.random() * (i+1))
        cards[randomIndex].style.order = i;
        cards[i].style.order = randomIndex;
    }
}

cards.forEach(card => card.addEventListener("click" ,flipCard));