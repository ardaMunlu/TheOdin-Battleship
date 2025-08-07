const { Gameboard } = require('./gameboard');

function Player(isComputer = false) {
  const board = Gameboard();
  const previousMoves = new Set();

  function attack(enemyPlayer, x, y) {
    enemyPlayer.board.receiveAttack(x, y);
    previousMoves.add(`${x},${y}`);
  }

  function randomAttack(enemyPlayer) {
    let x, y, key;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (previousMoves.has(key));

    attack(enemyPlayer, x, y);
  }

  return {
    board,
    isComputer,
    attack,
    randomAttack
  };
}

module.exports = { Player };