const { MongoClient } = require('mongodb');

client = new MongoClient(process.env.MONGO_URI);

const getAll = async (req, res) => {
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection('cita');
        
      const data = await collection.find().toArray();
        console.log(data);
      
      res.json(data);
    } catch (error) {
      console.error('Error al obtener datos de MongoDB:', error);
      res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
    }
  };

  const getFechas = async (req, res) => {
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection('cita');
        
      const fechaEspecifica = new Date("2023-09-21");

    const data = await collection.aggregate([
                   {
               $match: {
                 fecha: fechaEspecifica
               }
             }
]).toArray();

      res.json(data);
    } catch (error) {
      console.error('Error al obtener datos de MongoDB:', error);
      res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
    }
  };


const getCita = async (req, res) => {
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection('cita');
        
      const idPaciente = "6503439873d0edc346e5d437";

    const data = await collection.aggregate([
                   {
               $match: {
                datosUsuario: idPaciente
               }
             }
    ]).toArray();
    res.json(data);
    } catch (error) {
      console.error('Error al obtener datos de MongoDB:', error);
      res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
    }
};

const getDiaEspecifico = async (req, res) => {
  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('cita');
      
    const diaEspecifico = new Date("2023-09-29");

  const data = await collection.aggregate([
                 {
             $match: {
               fecha: diaEspecifico
             }
           }
]).toArray();

    res.json(data);
  } catch (error) {
    console.error('Error al obtener datos de MongoDB:', error);
    res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
  }
};

const getDiaEspecificoMedico = async (req, res) => {
  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('cita');
      
    const diaEspecifico = new Date("2023-09-20");
    const medicoEspecifico = 123456789
  /*   const diaEspecifico = req.body.fecha
    const medicoEspecifico = req.body.medico
 */
  const data = await collection.aggregate([
                 {
             $match: {
               fecha: diaEspecifico,
               medico: medicoEspecifico
             }
           }
]).toArray();

    res.json(data);
  } catch (error) {
    console.error('Error al obtener datos de MongoDB:', error);
    res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
  }
};

const getMedicos = async (req, res) => {
  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('cita');
      
    const medicoEsp = 234567890;

  const data = await collection.aggregate([
    {
      $match: {
        medico: medicoEsp,
      }
    }
  ]).toArray();

  res.json(data);

  } catch (error) {
    console.error('Error al obtener datos de MongoDB:', error);
    res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
  }
};

const getConsultoriosCita = async (req, res) => {
  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('cita');
  
    const data = await collection.aggregate([{

      $lookup:{
        from: "consultorio",  
        localField: "consultorioCita",  
        foreignField: "codigo", 
        as: "consultorioCita" 
      }

    }]).toArray();

    res.json({data});
  } catch (error) {
    console.error('Error al obtener datos de MongoDB:', error);
    res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
  }
};


const getCitaGenero= async (req, res) => {
  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('cita');
  
    const data = await collection.aggregate([{
     
      $lookup:{
        from: "usuarios",  
        localField: "datosUsuario",  
        foreignField: "_id", 
        as: "datosUsuario" 
      }

    },{

      $lookup:{
        from: "estado_cita",  
        localField: "estadoCita",  
        foreignField: "codigoEstado", 
        as: "estadoCita" 
      }

    }, {
      $unwind: "$datosUsuario" 
    }, {
      $unwind: "$estadoCita" 
    },
    { $match:{
       "estadoCita.estadoCita": "Atendida",
      "datosUsuario.genero": req.body.query
      
       
    }
  }
  ]).toArray();

    res.json({data});
  } catch (error) {
    console.error('Error al obtener datos de MongoDB:', error);
    res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
  }
};

const getCitasCanceladas = async (req, res) => {
  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('cita');
  
    const mesEspecifico = req.body.query
    const data = await collection.aggregate([{
      $lookup:{
        from: "medico",  
        localField: "medico",  
        foreignField: "matriculaProfesional", 
        as: "medico" 
      }
    },
    {
      $match: {
    
        $expr: {
          $eq: [{ $month: '$fecha' }, mesEspecifico],
        },
        estadoCita: 4
        
      },
    }
    ]).toArray();

    res.json({data});
  } catch (error) {
    console.error('Error al obtener datos de MongoDB:', error);
    res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
  }
};



  
  


  
  
  module.exports = { getAll, getFechas, getCita, getDiaEspecifico,getMedicos,getDiaEspecificoMedico,getConsultoriosCita,getCitaGenero,getCitasCanceladas}


