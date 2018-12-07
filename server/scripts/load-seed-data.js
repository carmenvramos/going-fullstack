const client = require('../db-client');
const superfoods = require('./superfoods.json');
const health_categories = require('./health_categories');

// "Promise all" does a parallel execution of async tasks
Promise.all(
  health_categories.map(health_category => {
    return client.query(`
      INSERT INTO health_category (name, short_name)
      VALUES ($1, $2);
    `,
    [health_category.name, health_category.shortName]);
  })
)
  .then(() => {
    return Promise.all(
      superfoods.map(superfood => {
        return client.query(`
          INSERT INTO superfoods (name, health_category_id, benefits, is_anti_inflammatory)
            SELECT 
              $1 as name,
              id as health_category_id, 
              $2 as benefits,
              $4 as is_anti_inflammatory
            FROM health_category
            WHERE short_name = $3;
        `,
        [superfood.name, superfood.benefits, superfood.health_category, superfood.is_anti_inflammatory]);
      })
    );
  })
  .then(
    () => console.log('seed data load complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
