import { Game } from "./game";

let gameContainer = document.getElementById('gameContainer');
let game = new Game(gameContainer);
game.showMenu();