const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const dbUrl = require('./config');

const app = express();
// Permitir apenas este domínio
// app.use(cors({
//     origin: 'https://thiago-caffaro.github.io'
// }));
// app.use(express.json());

// Permitir qualquer dominio
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
});

const port = 3000;
const url = dbUrl;
const dbName = 'projetoLivroRpg';

const client = new MongoClient(url);

client.connect()
    .then(() => {
        console.log("Conectado com sucesso ao servidor");
        const db = client.db(dbName);
        const rpgBaseCollection = db.collection('talesFromTheLoop');
        const rpgImageCollection = db.collection('talesFromTheLoop');

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
            if (req.body) {
                try {
                  const result = await rpgBaseCollection.insertOne(req.body);
                  res.json(result);
                } catch (err) {
                  console.log(err.stack);
                  res.status(500).send(`Ocorreu o erro ao inserir o documento: ${err.stack}`);
                }
              } else {
                res.status(400).send('Nenhum corpo de requisição foi enviado');
              }
        });
        app.post('/addImages', upload.array('cardsArray'),async (req, res) => {
            if (req.body) {
                try {
                  const result = await rpgImageCollection.insertOne(req.body);
                  res.json(result);
                } catch (err) {
                  console.log(err.stack);
                  res.status(500).send(`Ocorreu o erro ao inserir o documento: ${err.stack}`);
                }
              } else {
                res.status(400).send('Nenhum corpo de requisição foi enviado');
              }
        });
        app.listen(port, '0.0.0.0', () => {
            console.log(`A API está rodando em http://0.0.0.0:${port}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao servidor MongoDB:', err);
    });
