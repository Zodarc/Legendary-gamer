// === Typing Animation Script ===

const phrases = ["your loadout", "your power", "your legend"];
let currentPhraseIndex = 0;
let currentLetterIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const eraseSpeed = 50;
const delayBetweenPhrases = 1500;
const typedText = document.getElementById("typed-text");

function typeLoop() {
  const currentPhrase = phrases[currentPhraseIndex];
  
  if (isDeleting) {
    typedText.textContent = currentPhrase.slice(0, --currentLetterIndex);
  } else {
    typedText.textContent = currentPhrase.slice(0, ++currentLetterIndex);
  }

  if (!isDeleting && currentLetterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeLoop, delayBetweenPhrases);
  } else if (isDeleting && currentLetterIndex === 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    setTimeout(typeLoop, 300);
  } else {
    setTimeout(typeLoop, isDeleting ? eraseSpeed : typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", typeLoop);

