import { Game } from "./game";

let stopBtn = document.getElementById('stop');
stopBtn.addEventListener('click', () => {
    game.stop();
});

let game = new Game();