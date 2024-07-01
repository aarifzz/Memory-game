gobutton=document.getElementById('gobutton');
gobutton.onclick=function(){


  const frame=document.getElementById('frame');
  frame.style.display='none';
}
const cards = document.querySelectorAll('.card');

 const cardss = Array.from(document.querySelectorAll('.card'));

let firstCard = null;
let secondCard = null;
let matchedcard=0;
let remainingtime=60;



let timer=document.getElementById('timer')

function startgame(){
  shuffle(cardss);

  starttimer();
}
function shuffle(array){
   for(let i= array.length - 1 ; i>0;i--){
    const random= Math.floor(Math.random()*(i+1));

    [array[i], array[random]]= [array[random], array[i]];
   }
   const parent = document.querySelector('.container'); // Update this selector to match the parent element of your cards
   array.forEach(card => parent.appendChild(card));
}
function starttimer(){
  timerunning=true;
  interval=setInterval(updatetimer,1000)
}

function stoptimer(){
  clearInterval(interval);
    timerunning=false;

}

function updatetimer(){
  remainingtime--
  if(remainingtime>=0){
    timer.textContent=` ${pad(Math.floor(remainingtime / 60))}:${pad(remainingtime % 60)}`;
  }
  else{
    stoptimer();
    gameover();
  }

}

function pad(val) {
  return val < 10 ? `0${val}` : val;
}

gobutton.addEventListener('click', startgame);

cards.forEach(card => {
  card.addEventListener('click', () => {
    // Ignore clicks if both cards are already flipped
    if ((firstCard && secondCard) || card === firstCard) return;

    // Flip the clicked card
    card.classList.add('flip');

    // Assign the card to firstCard or secondCard
    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      // Delay the check for a match to ensure the second card flips first
      setTimeout(checkForMatch, 500);
    }
  });
});

function checkForMatch() {
  let img1 = firstCard.querySelector('img');
  let img2 = secondCard.querySelector('img');
  if (img1.alt===img2.alt) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedcard+=2;
    if(matchedcard===cards.length){
      congratulate();
    }
    resetCards();
  } else {
    // Wait for 1 second before flipping back the cards
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetCards();
      subtracttime(2);
    }, 1000);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}

function resetgame() {
  stoptimer();
  remainingtime = 60;
  timer.textContent = ` ${pad(Math.floor(remainingtime / 60))}:${pad(remainingtime % 60)}`;
  matchedcard = 0;
  cards.forEach(card => {
    card.classList.remove('flip', 'matched');
  });
  document.querySelectorAll('.congratulation, .gameover, .tryagain').forEach(element => {
    element.remove();
  });
}

function congratulate(){
  resetgame();
  const message=document.createElement('div');
  message.classList.add('congratulation');
  message.textContent='Congratulations! YOU WON';
  document.body.appendChild(message);
}

function gameover() {

  const message = document.createElement('div');
  message.classList.add('gameover');
  message.textContent = 'TOO LATE!';
  document.body.appendChild(message);

  const tryagain=document.createElement('div');
  tryagain.textContent='Try Again!';
  tryagain.classList.add('tryagain');
  tryagain.addEventListener('click', ()=>{
    resetgame();

    startgame();
  });
  document.body.appendChild(tryagain);
}


// function subtracttime(seconds){
//   remainingtime-=seconds;
//   if(remainingtime<0){
//     remainingtime=0;
//     stoptimer();
//     gameover();
//   }
//   timer.textContent = ` ${pad(Math.floor(remainingtime / 60))}:${pad(remainingtime % 60)}`;
// }




const notification = document.createElement('div');
notification.classList.add('notification');
document.body.appendChild(notification);




  