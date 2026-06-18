/*Home Page to start screen*/
function showScreen(id) {
  document.querySelectorAll('.card').forEach(c => c.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

/*Start Game JS*/
const PLAYER_COLORS = ['#EF4444', '#3B82F6', '#F59E0B', '#8B5CF6'];
const DEFAULT_NAMES  = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

let selectedCount = 2;
let players = [];
let currentPlayer = 0;

function selectCount(n, btn) {
  selectedCount = n;

  
  document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  
  buildNameInputs(n);
}

function buildNameInputs(n) {
  const container = document.getElementById('name-inputs');
  container.innerHTML = ''; 

  for (let i = 0; i < n; i++) {
    const div = document.createElement('div');
    div.className = 'name-field';
    div.innerHTML = `
      <div class="player-dot" style="background: ${PLAYER_COLORS[i]}"></div>
      <input
        type="text"
        id="player-${i}"
        placeholder="${DEFAULT_NAMES[i]}"
        maxlength="16"
      />
    `;
    container.appendChild(div);
  }
}

function startGame() {
  players = [];
  for (let i = 0; i < selectedCount; i++) {
    const input = document.getElementById(`player-${i}`);
    const name = input.value.trim() || DEFAULT_NAMES[i];
    players.push({ name, color: PLAYER_COLORS[i], position: 0 });
  }

  currentPlayer = 0;
  showScreen('screen-game');
  renderPieces();
  updateTurnBanner();
}


function renderPieces() {
  document.querySelectorAll('.piece').forEach(p => p.remove());

  players.forEach(function(player, i) {
    const square = document.getElementById('sq-' + player.position);
    if (!square) return;

    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.style.background = player.color;
    piece.style.bottom = '2px';
    piece.style.left = (2 + i * 14) + 'px';
    square.appendChild(piece);
  });
}

function updateTurnBanner() {
  const p = players[currentPlayer];
  document.getElementById('turn-banner').textContent = p.name + "'s turn";
  document.getElementById('turn-banner').style.borderLeft = '4px solid ' + p.color;
}


buildNameInputs(2);

/*dice rolling*/
const DICE_IMAGES = [
  'images/dice-one.png',
  'images/dice-two.png',
  'images/dice-three.png',
  'images/dice-four.png',
  'images/dice-five.png',
  'images/dice-six.png'
];

function rollDice() {
  
  const roll = Math.floor(Math.random() * 6) + 1;

  document.getElementById('dice-face').src = DICE_IMAGES[roll - 1];

  document.getElementById('dice-result').textContent = 'You rolled a ' + roll + '!';

  
  movePlayer(roll);
}

function movePlayer(roll) {
  const p = players[currentPlayer];

  let newPos = p.position + roll;

  
  const lastSquare = 44;
  if (newPos > lastSquare) newPos = lastSquare;


  p.position = newPos;
  renderPieces();

  const square = document.getElementById('sq-' + newPos);

  if (square.classList.contains('finish')) {
    setTimeout(() => alert('🏆 ' + p.name + ' wins!'), 300);
    return;
  }

  if (square.classList.contains('quiz')) {
    setTimeout(() => showQuiz(), 300);
    return;
}

  nextTurn();
}

function nextTurn() {
  currentPlayer = (currentPlayer + 1) % players.length;
  updateTurnBanner();
}

/*Quiz Questions*/
const QUESTIONS = [
  {
    question: "You receive a message saying 'You won RM5,000! Click here to claim.' What should you do?",
    choices: ["Click the link immediately", "Tell a trusted adult and ignore it", "Share your bank details", "Forward it to friends"],
    correct: 1,
    explanation: "If you never joined a contest, you cannot win. This is a prize scam!"
  },
  {
    question: "A message pretending to be your bank asks for your password. What is this called?",
    choices: ["A friendly reminder", "A phishing scam", "A bank promotion", "A lucky message"],
    correct: 1,
    explanation: "This is phishing — real banks never ask for your password through messages."
  },
  {
    question: "Someone online offers a loan with zero interest and no documents needed. What should you think?",
    choices: ["Great deal, take it!", "It is suspicious — real loans need documents", "All phone loans are safe", "Zero interest loans are common"],
    correct: 1,
    explanation: "Real banks always check documents. Too easy offers are usually scams!"
  },
  {
    question: "An ad says invest RM100 today and get RM1,000 back in one week guaranteed. What is the warning sign?",
    choices: ["The amount is small", "High returns guaranteed in a short time", "The ad is online", "They promise to return money"],
    correct: 1,
    explanation: "No real investment guarantees huge returns in a short time. This is an investment scam!"
  },
  {
    question: "Someone your parent only knows online keeps asking for money saying they are stuck abroad. This is most likely a?",
    choices: ["Real emergency", "Love scam", "Government request", "Safe situation"],
    correct: 1,
    explanation: "This is a love scam. Criminals build fake relationships to ask for money."
  }
];

let currentQuestion = null;
let quizPlayerPos = 0;

function showQuiz() {

  const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
  currentQuestion = QUESTIONS[randomIndex];

  
  document.getElementById('quiz-question').textContent = currentQuestion.question;

  
  document.getElementById('quiz-feedback').textContent = '';
  const choicesDiv = document.getElementById('quiz-choices');
  choicesDiv.innerHTML = '';

  
  currentQuestion.choices.forEach(function(choice, i) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.onclick = function() { checkAnswer(i); };
    choicesDiv.appendChild(btn);
  });

  
  document.getElementById('quiz-overlay').style.display = 'flex';
}

function checkAnswer(selectedIndex) {
  
  document.querySelectorAll('.choice-btn').forEach(function(btn, i) {
    btn.disabled = true;
    if (i === currentQuestion.correct) btn.classList.add('correct');
    if (i === selectedIndex && selectedIndex !== currentQuestion.correct) btn.classList.add('wrong');
  });

  const p = players[currentPlayer];
  const feedback = document.getElementById('quiz-feedback');

  if (selectedIndex === currentQuestion.correct) {
    
    feedback.textContent = '✅ Correct! Move forward 3 steps!';
    feedback.style.color = '#0F6E56';
    setTimeout(function() {
      let newPos = p.position + 3;
      const lastSquare = 44;
      if (newPos > lastSquare) newPos = lastSquare;
      p.position = newPos;
      renderPieces();
      closeQuiz();
    }, 1500);
  } else {
    
    feedback.textContent = '❌ Wrong! Go back 3 steps. ' + currentQuestion.explanation;
    feedback.style.color = '#991B1B';
    setTimeout(function() {
      let newPos = p.position - 3;
      if (newPos < 0) newPos = 0;
      p.position = newPos;
      renderPieces();
      closeQuiz();
    }, 2000);
  }
}

function closeQuiz() {
  document.getElementById('quiz-overlay').style.display = 'none';
  nextTurn();
}