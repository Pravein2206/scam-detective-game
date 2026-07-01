# Beat the Scam: Learn While You Play

**Play it now:** https://pravein2206.github.io/scam-detective-game/

## What is this?

Beat the Scam is a browser-based board game, inspired by Snake & Ladder, that teaches players how to recognize and avoid common financial scams. It's built for 2–4 players and works entirely in your web browser — no installs needed.

As you move around the board, landing on a ❓ square triggers a real-world scam awareness question. Answer correctly and you jump ahead 3 squares as a reward. Answer wrong and you slide back 3 squares. First player to reach the 🏆 finish square wins.

## How to play

1. Open the game link above.
2. Choose how many players (2–4) and enter each player's name.
3. On your turn, click **Roll Dice** and then **Move Piece** to move your token forward.
4. If you land on a ❓ square, a quiz question pops up. Pick an answer:
   - ✅ Correct → move forward 3 extra squares.
   - ❌ Wrong → move back 3 squares.
5. Take turns until someone reaches the trophy square 🏆.

## Running it locally

No build tools or installs are required — it's plain HTML, CSS, and JavaScript.

```bash
git clone https://github.com/Pravein2206/scam-detective-game.git
cd scam-detective-game
```

Then just open `index.html` in your browser, or serve it locally:

```bash
python3 -m http.server 8000
```

and visit `http://localhost:8000` in your browser.

## Project structure

```
scam-detective-game/
├── index.html      # Game screens (welcome, setup, board, quiz popup)
├── style.css        # All styling, including mobile-responsive layout
├── game.js           # Game logic: dice rolls, movement, quiz handling, turns
└── images/            # Dice faces and background art
```

## Tech stack

- HTML5, CSS3, vanilla JavaScript — no frameworks or dependencies.
- Fully responsive: the board stacks above the dice/player panel on mobile screens.

## Contributing

This is a student project built for educational purposes. Suggestions and pull requests to add more scam-awareness questions or improve gameplay are welcome.