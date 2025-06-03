# Tests

This project does not use any external test framework due to environment limits.
Tests can be executed with Node.js directly.

Run the following command from the repository root:

```bash
node tests/test.js
```

The test simulates a bullet intersecting an enemy positioned next to a rock.
It asserts that the enemy is removed and the score increases, verifying that
enemy collision is processed before rock collision.
