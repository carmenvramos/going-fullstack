const express = require('express');
const app = express();
const shortid = require('shortid');

/* This code is our very very simple database */

const fs = require('fs');

function readData() {
  // we don't normally use sync, but fine for today
  const data = fs.readFileSync('./data/superfoods.json', 'utf8');
  return JSON.parse(data);
}

function saveData(superfoods) {
  const json = JSON.stringify(superfoods, true, 2);
  fs.writeFileSync('./data/superfoods.json', json);
}
/* end database stuff */

// register the json "middleware" body parser
app.use(express.json());

/* Defined routes: METHOD, URL PATH */

// method == app.<method>
// path = app.get('/this/is/path', ...)
app.get('/api/superfoods', (req, res) => {
  const superfoods = readData();

  // do we have a name query param?
  if(req.query.name) {
    // filter superfoods that start with name
    const match = req.query.name.toLowerCase();
    const filtered = superfoods.filter(s => {
      return s.name.toLowerCase().startsWith(match);
    });
    res.json(filtered);
  }
  else {
    // send back all students
    res.json(superfoods);
  }
});

app.post('/api/superfoods', (req, res) => {

  const superfoods = readData();
  const superfood = req.body;
  superfood.id = shortid.generate();
  // superfood.created = new Date();
  superfoods.push(superfood);
  saveData(superfoods);

  res.json(superfood);
});

/* end defined routes */

/* configure and start the server */
const PORT = 3000;

app.listen(PORT, () => {
  console.log('server app started on port', PORT);
});

/* end configure and server start */