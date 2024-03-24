const MongoClient = require('mongodb').MongoClient;

// URL de conexão
const url = 'mongodb+srv://ThiagoCaffaro:adminPassword@banco-1.zljf1bi.mongodb.net/?retryWrites=true&w=majority&appName=Banco-1';

// Nome do banco de dados
const dbName = 'sample_mflix';

// Cria uma nova instância do MongoClient
const client = new MongoClient(url);

async function run() {
    try {
        // Conecta ao servidor
        await client.connect();

        console.log("Conectado com sucesso ao servidor");

        const db = client.db(dbName);

        // Acessa a coleção
        const collection = db.collection('users');

        // Busca alguns documentos
        const docs = await collection.find({}).toArray();
        console.log(docs);
    } catch (err) {
        console.log(err.stack);
    } finally {
        // Fecha a conexão
        await client.close();
    }
}

run().catch(console.dir);
