const client = require('../db-client');

client.query(`
  DROP TABLE IF EXISTS superfoods;
  DROP TABLE IF EXISTS health_category;  
`)
  .then(
    () => console.log('drop tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });