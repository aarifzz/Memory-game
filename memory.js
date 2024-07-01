let startbutton=document.getElementById('start');
startbutton.disabled=true;
document.getElementById('gobutton').onclick=function(){
  startbutton.disabled=false;

  const frame=document.getElementById('frame');
  frame.style.display='none';
}
const cards = document.querySelectorAll('.card1, .card2 , .card3, .card4, .card5, .card6, .card7, .card8, .card9, .card10, .card11, .card12, .card13, .card14, .card15, .card16');
let firstCard = null;
let secondCard = null;
let matchedcard=0;
let remainingtime=60;



let timer=document.getElementById('timer')

function startgame(){
  startbutton.disabled=true;
  starttimer();
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

startbutton.addEventListener('click', startgame);

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
  message.textContent = 'Game Over! You lost.';
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


function subtracttime(seconds){
  remainingtime-=seconds;
  if(remainingtime<0){
    remainingtime=0;
    stoptimer();
    gameover();
  }
  timer.textContent = ` ${pad(Math.floor(remainingtime / 60))}:${pad(remainingtime % 60)}`;
}


const notification = document.createElement('div');
notification.classList.add('notification');
document.body.appendChild(notification);



  