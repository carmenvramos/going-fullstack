const client = require('../db-client');

client.query(`
  CREATE TABLE IF NOT EXISTS health_category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    short_name VARCHAR(12) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS superfoods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    health_category_id INTEGER NOT NULL REFERENCES health_category(id),
    benefits VARCHAR(256)
  );

`)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });