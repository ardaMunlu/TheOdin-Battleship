// ship.js
export default function Ship(length) {
  let hits = 0;

  return {
    length,
    hit() {
      if (hits < length) hits++;
    },
    getHits() {
      return hits;  
    },
    isSunk() {
      return hits >= length;
    },
  };
}

  module.exports = {
    Ship
  };

