function renderBoard(container, board, isEnemy = false) {
  container.innerHTML = '';
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;

      const value = board.grid[x][y];
      if (value !== null && !isEnemy) {
        cell.classList.add('ship');
      }

      if (board.missedShots.some(m => m[0] === x && m[1] === y)) {
        cell.classList.add('miss');
      }

      // Optional: highlight hits by checking value & ship state

      container.appendChild(cell);
    }
  }
}

function bindAttackEvents(enemyContainer, game, renderAll) {
  enemyContainer.addEventListener('click', (e) => {
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    if (isNaN(x) || isNaN(y)) return;

    game.player.attack(game.computer, x, y);
    game.computer.randomAttack(game.player);

    renderAll();

    if (game.player.board.areAllShipsSunk()) {
      alert('Computer wins!');
    } else if (game.computer.board.areAllShipsSunk()) {
      alert('Player wins!');
    }
  });
}

function bindPlacementEvents(container, game, renderAll) {
  function handleClick(e) {
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    if (isNaN(x) || isNaN(y)) return;

    const placed = game.placePlayerShip(x, y);
    if (placed) {
      renderAll();

      // 👇 Check if all ships placed
      if (!game.isSetupPhase()) {
        container.removeEventListener('click', handleClick);
        bindAttackEvents(document.getElementById('enemy-board'), game, renderAll);
        alert('All ships placed! Begin attacking.');
      }
    }
  }

  container.addEventListener('click', handleClick);

  // Optional rotate support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
      game.rotateDirection();
    }
  });
}



module.exports = { renderBoard, bindAttackEvents, bindPlacementEvents };
