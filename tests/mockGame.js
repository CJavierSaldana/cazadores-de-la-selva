class Vector {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }
  clone() { return new Vector(this.x, this.y); }
  add(v) { this.x += v.x; this.y += v.y; return this; }
  distanceTo(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.hypot(dx, dy);
  }
}

function createGameState() {
  return {
    bullets: [],
    enemies: [],
    obstacles: [],
    score: 0,
  };
}

function updateBullets(state, delta) {
  for (let i = state.bullets.length - 1; i >= 0; i--) {
    const bullet = state.bullets[i];
    bullet.position.add(bullet.userData.velocity.clone().multiply(delta));
    bullet.userData.lifeTime -= delta;
    if (bullet.userData.lifeTime <= 0) {
      state.bullets.splice(i, 1);
      continue;
    }
    // enemy collision first
    for (let j = state.enemies.length - 1; j >= 0; j--) {
      const enemy = state.enemies[j];
      if (bullet.position.distanceTo(enemy.position) < bullet.userData.radius + enemy.userData.radius) {
        state.enemies.splice(j, 1);
        state.bullets.splice(i, 1);
        state.score += 10;
        break;
      }
    }
    if (i >= state.bullets.length) continue;
    for (const rock of state.obstacles) {
      if (bullet.position.distanceTo(rock.position) < bullet.userData.radius + rock.userData.radius) {
        state.bullets.splice(i, 1);
        break;
      }
    }
  }
}

Vector.prototype.multiply = function(s) { return new Vector(this.x * s, this.y * s); };

module.exports = { Vector, createGameState, updateBullets };
