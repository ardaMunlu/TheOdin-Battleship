// Gameboard artık kendi içinde export ediliyor.
export function Gameboard() {
  const grid = Array.from({ length: 10 }, () => Array(10).fill(null));
  const ships = [];
  const missedShots = [];

  function placeShip(ship, [x, y], direction = 'horizontal') {
    for (let i = 0; i < ship.length; i++) {
      if (direction === 'horizontal') {
        grid[x][y + i] = ship;
      } else {
        grid[x + i][y] = ship;
      }
    }
    ships.push(ship);
  }

  function receiveAttack(x, y) {
    const target = grid[x][y];
    if (target && typeof target.hit === 'function') {
      target.hit();
    } else {
      missedShots.push([x, y]);
    }
  }

  function areAllShipsSunk() {
    return ships.every(ship => ship.isSunk());
  }

  return {
    grid,
    missedShots,
    placeShip,
    receiveAttack,
    areAllShipsSunk,
  };
}
