const express = require('express');
const app = express();
// const morgan = require('morgan');
const client = require('./db-client');

// enhanced logging
// app.use(morgan('dev'));

// register the json "middleware" body parser
app.use(express.json());

/* Defined routes: METHOD, URL PATH */
// method == app.<method>
// path = app.get('/this/is/path', ...)

app.get('/api/health_category', (req, res) => {
  client.query(`
    SELECT id, name, short_name as "shortName"
    FROM health_category
    ORDER BY name
  `)
    .then(result => {
      res.json(result.rows);
    });
});

app.get('/api/superfoods', (req, res) => {
  client.query(`
    SELECT 
      superfoods.id,
      superfoods.name as name,
      health_category.id  as "healthCategoryId",
      health_category.short_name as health_category
    FROM superfoods
    JOIN health_category
    ON superfoods.health_category_id = health_category.id
    ORDER BY name   
  `)
    .then(result => {
      res.json(result.rows);
    });

});

app.get('/api/superfoods/:id', (req, res) => {
  client.query(`
    SELECT * FROM superfoods WHERE id = $1;
  `,
  [req.params.id])
    .then(result => {
      res.json(result.rows[0]);
    });
});

app.post('/api/superfoods', (req, res) => {
  const body = req.body;

  client.query(`
    INSERT INTO superfoods (name, benefits, is_anti_inflammatory)
    VALUES($1, $2, $3)
    RETURNING id, name, benefits, is_anti_inflammatory;
  `,
  [body.name, body.benefits, body.is_anti_inflammatory])
    .then(result => {
      res.json(result.rows[0]);
    });
});

/* end defined routes */

/* configure and start the server */
const PORT = 3000;

app.listen(PORT, () => {
  console.log('server app started on port', PORT);
});

/* end configure and server start */

