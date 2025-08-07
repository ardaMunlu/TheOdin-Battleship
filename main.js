const { Game } = require('./game');
const { renderBoard, bindAttackEvents, bindPlacementEvents } = require('./dom');

const game = Game();


const playerBoardDiv = document.getElementById('player-board');
const enemyBoardDiv = document.getElementById('enemy-board');

function renderAll() {
  renderBoard(playerBoardDiv, game.player.board, false);
  renderBoard(enemyBoardDiv, game.computer.board, true);
}

bindPlacementEvents(playerBoardDiv, game, renderAll);
renderAll();
