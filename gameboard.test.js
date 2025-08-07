const { Gameboard } = require('./gameboard');
const { Ship } = require('./ship');

it('places ship at coordinates', () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(ship, [0, 0], 'horizontal');

  expect(board.grid[0][0]).toBe(ship);
  expect(board.grid[0][1]).toBe(ship);
  expect(board.grid[0][2]).toBe(ship);
});

test('receiveAttack hits a ship', () => {
  const board = Gameboard();
  const ship = Ship(2);
  board.placeShip(ship, [0, 0], 'horizontal');

  board.receiveAttack(0, 0);

  expect(ship.getHits()).toBe(1);
});

test('receiveAttack records missed shot', () => {
  const board = Gameboard();
  board.receiveAttack(5, 5);

  expect(board.missedShots).toContainEqual([5, 5]);
});

test('reports all ships sunk', () => {
  const board = Gameboard();
  const ship = Ship(1);
  board.placeShip(ship, [0, 0], 'horizontal');

  board.receiveAttack(0, 0);

  expect(board.areAllShipsSunk()).toBe(true);
});