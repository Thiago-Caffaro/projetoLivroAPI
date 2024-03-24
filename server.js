const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Olá, Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
