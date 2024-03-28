const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors'); 

const app = express();
app.use(cors({
    origin: 'https://thiago-caffaro.github.io'
}));
app.use(express.json());

// Permitir qualquer dominio
// app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//    next();
// });

const port = 3000;
const url = 'mongodb+srv://ThiagoCaffaro:adminPassword@banco-1.zljf1bi.mongodb.net/?retryWrites=true&w=majority&appName=Banco-1';
const dbName = 'projetoLivroRpg';

const client = new MongoClient(url);

client.connect()
    .then(() => {
        console.log("Conectado com sucesso ao servidor");
        const db = client.db(dbName);
        const collection = db.collection('talesFromTheLoop');

        app.get('/', async (req, res) => {
            try {
                const docs = await collection.find({}).toArray();
                res.json(docs);
            } catch (err) {
                console.log(err.stack);
                res.status(500).send('Ocorreu um erro ao buscar os documentos');
            }
        });

        app.post('/add', async (req, res) => {
            try {
                const result = await collection.insertOne(req.body);
                res.json(result);
            } catch (err) {
                console.log(err.stack);
                res.status(500).send(`Ocorreu o erro ao inserir o documento: ${err.stack}`);
            }
        });

        app.listen(port, '0.0.0.0', () => {
            console.log(`A API está rodando em http://0.0.0.0:${port}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao servidor MongoDB:', err);
    });
