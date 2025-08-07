const { Player } = require('./player');
const { Gameboard } = require('./gameboard');
const { Ship } = require('./ship');

test('player can attack enemy board and hit a ship', () => {
  const player = Player();
  const enemy = Player();

  const ship = Ship(1);
  enemy.board.placeShip(ship, [0, 0], 'horizontal');

  player.attack(enemy, 0, 0);

  expect(ship.getHits()).toBe(1);
});

test('computer player makes a valid random attack', () => {
  const computer = Player(true);
  const enemy = Player();

  const before = enemy.board.missedShots.length;

  computer.randomAttack(enemy);

  const after = enemy.board.missedShots.length;

  expect(after).toBe(before + 1);
});

test('computer does not attack same coordinate twice', () => {
  const computer = Player(true);
  const enemy = Player();

  const allAttacks = new Set();

  for (let i = 0; i < 100; i++) {
    computer.randomAttack(enemy);
    const last = enemy.board.missedShots.at(-1);
    allAttacks.add(last.toString());
  }

  expect(allAttacks.size).toBe(100); // No repeats
});
