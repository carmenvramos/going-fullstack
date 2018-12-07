const client = require('../db-client');

client.client.query(`

// Add another table here
// CREATE
// );

      CREATE TABLE IF NOT EXISTS superfoods (
        id SERIAL PRIMARY KEY,
        name VARCHAR(256) NOT NULL,
        benefits VARCHAR(256),
        is_anti_inflammatory BOOLEAN
      );
    `)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });