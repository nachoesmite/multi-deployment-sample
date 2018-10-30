const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json({ limit: '500k', extended: true }));
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/:service/:servicePath', (req, res) => {
  const result = Object.assign({}, { body: req.body }, req.params);
  res.json(result);
});
app.post('/fail/:service/:servicePath', (req, res) => res.status(500).json(Object.assign({ status: 'ERROR' }, { body: req.body }, req.params)));

app.get('/payload', (req,res) => res.json(req.body));

app.get('/endpoints', (req, res) => res.json(
  ['POST:/:service/:servicePath', 'POST:/fail/:service/:servicePath', 'GET:/payload']
));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
