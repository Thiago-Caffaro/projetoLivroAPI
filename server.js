const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Substitua <sua-string-de-conexao> pela sua string de conexão do MongoDB Atlas
mongoose.connect('mongodb+srv://ThiagoCaffaro:adminPassword@banco-1.zljf1bi.mongodb.net/?retryWrites=true&w=majority&appName=Banco-1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Defina um esquema para os usuários
const userSchema = new mongoose.Schema({}, { collection: 'users' });

// Crie um modelo para os usuários
const User = mongoose.model('User', userSchema, 'users');

app.get('/', (req, res) => {
  // Faça uma consulta para buscar todos os usuários
  User.find({}, function(err, users) {
    if (err) {
      console.error(err);
      res.send('Erro ao buscar usuários');
    } else {
      res.send(users);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
