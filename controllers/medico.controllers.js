const { MongoClient } = require('mongodb');

client = new MongoClient(process.env.MONGO_URI);

const getAll = async (req, res) => {
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection('medico');
        
      const data = await collection.find().toArray();
        console.log(data);
      
      res.json(data);
    } catch (error) {
      console.error('Error al obtener datos de MongoDB:', error);
      res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
    }
  };

  const getEspecialidad = async (req, res) => {
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection('medico');
        
      const especialidad = "Cardiología";

    const data = await collection.aggregate([
                   {
               $match: {
                 especialidad: especialidad
               }
             }
]).toArray();

      res.json(data);
    } catch (error) {
      console.error('Error al obtener datos de MongoDB:', error);
      res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
    }
  };


  const getConsultorios = async (req, res) => {
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection('medico');
    
      const data = await collection.aggregate([{

        $lookup:{
          from: "consultorio",  
          localField: "consultorio",  
          foreignField: "codigo", 
          as: "consultorio" 
        }

      }]).toArray();

      res.json({data});
    } catch (error) {
      console.error('Error al obtener datos de MongoDB:', error);
      res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
    }
  };

  
  
  module.exports = { getAll,getEspecialidad,getConsultorios}


