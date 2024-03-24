const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors'); 

const app = express();
app.use(cors({
    origin: 'https://thiago-caffaro.github.io'
}));
  
// Permitir qualquer dominio
// app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//    next();
// });
  
const port = 3000;

// URL de conexão
const url = 'mongodb+srv://ThiagoCaffaro:adminPassword@banco-1.zljf1bi.mongodb.net/?retryWrites=true&w=majority&appName=Banco-1';

// Nome do banco de dados
const dbName = 'projetoLivroRpg';

// Cria uma nova instância do MongoClient
const client = new MongoClient(url);

// Aqui é feito um get no endpoint users onde será retornado em uma resposta os dados em json
app.get('/', async (req, res) => {
    try {
        // Conecta ao servidor
        await client.connect();

        console.log("Conectado com sucesso ao servidor");

        const db = client.db(dbName);

        // Acessa a coleção
        const collection = db.collection('talesFromTheLoop');

        // Busca alguns documentos
        const docs = await collection.find({}).toArray();
        
        // Envia os documentos como resposta
        res.json(docs);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send('Ocorreu um erro ao buscar os documentos');
    } finally {
        // Fecha a conexão
        await client.close();
    }
});
app.post('/add', async (req, res) => {
    try {
        // Conecta ao servidor
        await client.connect();

        console.log("Conectado com sucesso ao servidor");

        const db = client.db(dbName);

        // Acessa a coleção
        const collection = db.collection('talesFromTheLoop');

        // Insere um documento
        const result = await collection.insertOne(req.body);
        
        // Envia a resposta
        res.json(result);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send(`Ocorreu o erro ao inserir o documento: ${err.stack}`);
    } finally {
        // Fecha a conexão
        await client.close();
    }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`A API está rodando em http://0.0.0.0:${port}`);
});