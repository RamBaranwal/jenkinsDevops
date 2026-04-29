const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to the app</h1>\n<h2>Name: Rohit Kumar</h2>`);
});

app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  const a = Number(num1);
  const b = Number(num2);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({
      error: 'Invalid input. Both num1 and num2 should be numbers.'
    });
  }
  return res.json({ result: a + b });
});

module.exports = app;
