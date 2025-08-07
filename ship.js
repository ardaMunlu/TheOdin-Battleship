// Named export: bunu import { Ship } şeklinde alacağız.
export function Ship(length) {
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
