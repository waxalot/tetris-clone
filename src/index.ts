import { Game } from "./game";

let stopBtn = document.getElementById('reset');
stopBtn.addEventListener('click', () => {
    game.reset();
});

let game = new Game();