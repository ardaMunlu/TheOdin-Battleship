const { Player } = require('./player');

function Game() {
  const player = Player(false);
  const computer = Player(true);

  function start() {
    // TODO: Replace with real placement later
    placeShipsRandomly(player.board);
    placeShipsRandomly(computer.board);
  }

  function placeShipsRandomly(board) {
    const lengths = [5, 4, 3, 3, 2]; // Example ship lengths

    for (const length of lengths) {
      let ship, x, y, dir;
      do {
        ship = require('./ship').Ship(length);
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        dir = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      } while (!canPlace(board, ship.length, x, y, dir));

      board.placeShip(ship, [x, y], dir);
    }
  }

  function canPlace(board, length, x, y, dir) {
    if (dir === 'horizontal') {
      if (y + length > 10) return false;
      return board.grid[x].slice(y, y + length).every(cell => cell === null);
    } else {
      if (x + length > 10) return false;
      return board.grid.slice(x, x + length).every(row => row[y] === null);
    }
  }

  let isSetupPhase = true;
let currentShipIndex = 0;
const shipLengths = [5, 4, 3, 3, 2];
let currentDirection = 'horizontal';

function getNextShip() {
  if (currentShipIndex >= shipLengths.length) return null;
  return require('./ship').Ship(shipLengths[currentShipIndex]);
}

function placePlayerShip(x, y) {
  if (!isSetupPhase) return;

  const ship = getNextShip();
  if (!ship) return;

  if (canPlace(player.board, ship.length, x, y, currentDirection)) {
    player.board.placeShip(ship, [x, y], currentDirection);
    currentShipIndex++;

    if (currentShipIndex >= shipLengths.length) {
      isSetupPhase = false;
      placeShipsRandomly(computer.board); // Start game
    }
    return true;
  }
  return false;
}

function rotateDirection() {
  currentDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
}

  return {
  player,
  computer,
  start,
  placePlayerShip,
  rotateDirection,
  isSetupPhase: () => isSetupPhase
};
}

module.exports = { Game };