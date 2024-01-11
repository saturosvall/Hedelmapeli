const animals = ['🌈', '🦝', '🦊', '🐍', '🕊️']; // Rullan elementit
const logo = '🐾';
let balance = 100; // Aloitusraha
let lockedReels = [false, false, false, false]; // Aloitusrullan lukitustilanne
let winnings = 0; // Voittojen seuranta
let currentRound = 1;
let lockedRound = 0;

function spin() {
  // panoksen asetukset
  const bet = parseInt(document.getElementById('betInput').value, 10);

  if (isNaN(bet) || bet < 1) {
    alert('Aseta panokseksi vähintään 1');
    return;
  }

  if (bet > balance) {
    alert('Rahat ei riitä, aseta pienempi panos');
    return;
  }

  const reels = document.querySelectorAll('.reel');

  // Panoksen vähennys saldosta
  balance -= bet;
  updateBalance();

  // Elementtien valinta rullista
  reels.forEach((reel, index) => {
    if (!lockedReels[index]) {
      const symbol = getRandomSymbol();
      reel.textContent = symbol;
    }
  });

  // Kierroslaskuri lukitusehdon takia
  currentRound++;
  lockedRound = 0;
  
  
  
  updateRounds();

  // Voiton tarkistus
  const winAmount = calculateWin(reels, bet);

  balance += winAmount;
  winnings = winAmount;
  updateBalance();
  updateWinnings();

  // Lukittujen rullien resetointi
  lockedReels = [false, false, false, false];
  updateLockedrounds();
  resetLockButtons();
}

// Rullien lukitus
function toggleLock(reelIndex) {
  lockedRound++;
  const lockButton = document.getElementById(`lock${reelIndex}`);
  const reel = document.getElementById(`reel${reelIndex}`);

  //if (currentRound % 2 === 0 || lockedRound === 0) {
    if (!lockedReels[reelIndex - 1]) {
      lockedReels[reelIndex - 1] = true;
      lockButton.disabled = true;
      lockButton.textContent = 'Lukittu';
      reel.classList.add('locked');
      
    } else {
      alert('Pyöräytä välillä!');
    }
  } /*else {
    alert('Pittää pyöräyttää välillä!');
  }*/
//}

function resetLockButtons() {
  for (let i = 1; i <= 4; i++) {
    const lockButton = document.getElementById(`lock${i}`);
    lockButton.disabled = false;
    lockButton.textContent = `Lukitse ${i}`;
  }
}

// Elementin haku symbolilistasta
function getRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * animals.length);
  return animals[randomIndex];
}

// Voittotuloksen laskeminen
function calculateWin(reels, bet) {
  // Tarkista onko kaikissa rullissa sama symboli
  /*const firstSymbol = reels[0].textContent;
  
  if (Array.from(reels).every((reel) => reel.textContent === firstSymbol)) {
    // Laske voitot symbolin perusteella
    switch (firstSymbol) {
      case '🌈':
        return bet * 10;
      case '🦝':
        return bet * 6;
      case '🦊':
        return bet * 5;
      case '🐍':
        return bet * 4;
      case '🕊️':
        return bet * 3;
      default:
        return 0;
    }    
  } else {*/
    // Tarkistetaan onko megapotti 3 x rullissa
    const specificSymbol = '🌈'; // Megapotti
    if (isObjectInReels(specificSymbol, Array.from(reels), 2)) {
      switch (specificSymbol) {
        case '🌈':
          return bet * 20; 
        default:
          return 0;
      }
    } else {
      return 0;
    }
  }
//}
// Tarkastetaan onko megapotti kolmessa tietyssä määrässä rullia
function isObjectInReels(object, reels, count) {
  const objectCount = reels.filter(reel => reel === object).length;
  return objectCount >= count;
}

function updateBalance() {
  document.getElementById('balance').textContent = `Balance: ${balance} coins`;
}

function updateWinnings() {
  document.getElementById('winnings').textContent = `Winnings: ${winnings} coins`;
}

function updateRounds() {
  document.getElementById('rounds').textContent = `Rounds: ${currentRound} `;
}

function updateLockedrounds() {
  document.getElementById('lockedrounds').textContent = `Locked rounds: ${lockedRound} `;
}
