const container = document.getElementById('container');
const resetBtn = document.getElementById('resetBtn');
const messageCountEl = document.getElementById('messageCount');
const unlockedMessagesEl = document.getElementById('unlockedMessages');

const colorModeSelect = document.getElementById('colorMode');
const singleColorPicker = document.getElementById('singleColor');
let currentColorMode = 'rainbow';
let currentSingleColor = '#3498db';

let unlockedMessages = new Set();

const feelGoodMessages = [
  "Amazing! You're so good at this!",
  "Fantastic! Keep going!",
  "You are SO great!",
  "Did you know this world can't exist without you?",
  "You're wonderful as you are",
  "You made me smile today",
  "Just by existing, you make a difference!",
  "You're beautiful inside and out!",
  "Gold isn't worth as much as you!",
  "You're like a ray of sunshine!",
  "You lift up my day",
  "You're a treasure!",
  "You're one of a kind!",
  "You're irreplaceable!",
  "Someone is glad you're you",
  "You matter!",
  "You are enough!",
  "You are loved!",
  "You are SO special!",
  "You are a gift to this entire world",
  "You are a true artist!",
  "You are a star!",
  "You light up the world!",
  "You are a legend!",
  "You are a true champion!"
];

function updateMessageTracker() {
  messageCountEl.textContent = `${unlockedMessages.size}/${feelGoodMessages.length}`;
  
  unlockedMessagesEl.innerHTML = '';
  
  Array.from(unlockedMessages).forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-item';
    messageDiv.textContent = message;
    unlockedMessagesEl.appendChild(messageDiv);
  });
  
  if (unlockedMessages.size === feelGoodMessages.length) {
    setTimeout(() => {
      showFeelGoodMessage("YAY! You unlocked ALL the messages! Now quick, go do something! But I thank you kindly for playing this clickyfull game.");
    }, 500);
  }
}

function updateColorControls() {
  const singleColorOption = singleColorPicker.parentElement;
  
  singleColorOption.style.display = 'none';
  
  if (currentColorMode === 'single') {
    singleColorOption.style.display = 'block';
  }
}

function getSquareColor() {
  if (currentColorMode === 'rainbow') {
    const rainbowColors = [
      { r: 255, g: 0, b: 0 },     
      { r: 255, g: 165, b: 0 },   
      { r: 255, g: 255, b: 0 },  
      { r: 0, g: 255, b: 0 },     
      { r: 0, g: 0, b: 255 },     
      { r: 75, g: 0, b: 130 },    
      { r: 238, g: 130, b: 238 }  
    ];
    return rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  } else if (currentColorMode === 'single') {
    const hex = currentSingleColor.replace('#', '');
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    };
  } else if (currentColorMode === 'blackwhite') {
    const grayValue = Math.floor(Math.random() * 256);
    return {
      r: grayValue,
      g: grayValue,
      b: grayValue
    };
  }
}

function getRandomMessage() {
  const selectedMessage = feelGoodMessages[Math.floor(Math.random() * feelGoodMessages.length)];
  
  unlockedMessages.add(selectedMessage);
  updateMessageTracker();
  
  return selectedMessage;
}

function showFeelGoodMessage(message) {
  const popup = document.createElement('div');
  popup.textContent = message;
  popup.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px 25px;
    border-radius: 15px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    font-size: 1.1rem;
    font-weight: bold;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
    font-family: Arial, sans-serif;
    max-width: 280px;
    text-align: center;
  `;
  
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 300);
  }, 3000);
}

function createGrid(size) {
  container.innerHTML = ''; 
  const squareSize = (960 - (size * 2)) / size; 

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.dataset.darkness = 0;
    square.dataset.maxSteps = 5; 
    square.dataset.remainingSteps = 5; 

    square.textContent = '5';
    square.style.display = 'flex';
    square.style.alignItems = 'center';
    square.style.justifyContent = 'center';
    square.style.fontSize = `${Math.max(8, squareSize / 4)}px`;
    square.style.fontWeight = 'bold';
    square.style.color = currentColorMode === 'blackwhite' ? 'hotpink' : '#666';
    square.style.transition = 'all 0.2s ease';

    square.addEventListener('mouseover', () => {
      const color = getSquareColor();
      let r = color.r;
      let g = color.g;
      let b = color.b;

      let darkness = parseFloat(square.dataset.darkness);
      let remainingSteps = parseInt(square.dataset.remainingSteps);
      
      if (darkness < 1 && remainingSteps > 0) {
        darkness += 0.1;
        remainingSteps--;
        square.dataset.darkness = darkness.toFixed(1);
        square.dataset.remainingSteps = remainingSteps;
        
        if (remainingSteps > 0) {
          square.textContent = remainingSteps.toString();
          if (currentColorMode === 'blackwhite') {
            square.style.color = 'hotpink';
          } else {
            square.style.color = darkness > 0.5 ? '#fff' : '#070101ff';
          }
        } else {
          square.textContent = '🎁';
          square.style.color = currentColorMode === 'blackwhite' ? 'hotpink' : '#fff';
          square.style.fontSize = `${Math.max(12, squareSize / 3)}px`;
          square.dataset.isComplete = 'true';
          
          if (!square.dataset.hasGiftListener) {
            square.addEventListener('click', (e) => {
              e.stopPropagation();
              if (square.dataset.isComplete === 'true' && !square.dataset.isOpened) {
                showFeelGoodMessage(getRandomMessage());
                
                square.textContent = '📦'; 
                square.dataset.isOpened = 'true';
                square.style.opacity = '0.7'; 
                square.style.cursor = 'default'; 
                
                square.style.transform = 'scale(1.2)';
                setTimeout(() => {
                  square.style.transform = 'scale(1)';
                }, 200);
              }
            });
            square.dataset.hasGiftListener = 'true';
          }
        }
      }

      square.style.backgroundColor = `rgb(${r * (1 - darkness)}, ${g * (1 - darkness)}, ${b * (1 - darkness)})`;
    });

    container.appendChild(square);
  }
}

resetBtn.addEventListener('click', () => {
  let newSize = parseInt(prompt('Enter number of squares per side (max 100):'));
  if (newSize && newSize > 0 && newSize <= 100) {
    unlockedMessages.clear();
    updateMessageTracker();
    createGrid(newSize);
  } else {
    alert('Please enter a valid number between 1 and 100. - Remember to choose wisely...');
  }
});

colorModeSelect.addEventListener('change', (e) => {
  currentColorMode = e.target.value;
  updateColorControls();
});

singleColorPicker.addEventListener('input', (e) => {
  currentSingleColor = e.target.value;
});

createGrid(16);
updateMessageTracker();
updateColorControls();

