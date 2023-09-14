const { MongoClient } = require('mongodb');

const dbConnection = async (req,res) =>{
    try {
        this.client = new MongoClient(process.env.MONGO_URI);
        await this.client.connect();
        this.db = this.client.db(process.env.DB_NAME);
        console.log('Conexión exitosa a MongoDB');
       } catch (error) {
        console.log(error);
        throw new Error('DB CANT INICIALIZATED')
       }


}

module.exports = dbConnection;