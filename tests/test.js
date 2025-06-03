const assert = require('assert');
const { Vector, createGameState, updateBullets } = require('./mockGame');

function setupScenario() {
  const state = createGameState();
  // enemy positioned right next to rock
  const rock = { position: new Vector(1, 0), userData: { radius: 0.5 } };
  const enemy = { position: new Vector(1, 0), userData: { radius: 0.5 } };
  state.obstacles.push(rock);
  state.enemies.push(enemy);

  // bullet fired from origin towards enemy/rock
  const bullet = {
    position: new Vector(0, 0),
    userData: {
      velocity: new Vector(10, 0),
      radius: 0.2,
      lifeTime: 1
    }
  };
  state.bullets.push(bullet);
  return state;
}

function testEnemyPriority() {
  const state = setupScenario();
  updateBullets(state, 0.1); // move bullet forward
  assert.strictEqual(state.enemies.length, 0, 'Enemy should be removed');
  assert.strictEqual(state.score, 10, 'Score should increase by 10');
  console.log('Test passed: enemy collision takes priority over rock');
}

try {
  testEnemyPriority();
} catch (err) {
  console.error('Test failed:', err.message);
  process.exit(1);
}
