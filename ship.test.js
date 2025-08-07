import { Ship } from './ship.js';

test('ship is created with correct length', () => {
  const ship = Ship(3);
  expect(ship.length).toBe(3);
});