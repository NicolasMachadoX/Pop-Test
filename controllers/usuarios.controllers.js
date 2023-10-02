const { MongoClient } = require('mongodb');


client = new MongoClient(process.env.MONGO_URI);

const getNamesAlp = async (req, res) => {
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection('usuarios');
        
      const data = await collection.distinct('nombre')
        console.log(data);
      
      res.json(data);
    } catch (error) {
      console.error('Error al obtener datos de MongoDB:', error);
      res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
    }
  };

 
const nuevoPaciente = async (req,res)=>{
  
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection('usuarios');
  const nuevoUsuario = req.body;

  const usuarioExistente = await collection.findOne({
    
    nombre: nuevoUsuario.nombre,

  segundo_nombre: nuevoUsuario.segundo_nombre,

  primer_apellido: nuevoUsuario.primer_apellido,

  telefono: nuevoUsuario.telefono,

  direccion: nuevoUsuario.direccion,

  email: nuevoUsuario.email,

  tipodoc: nuevoUsuario.tipodoc,

  genero: nuevoUsuario.genero,

  acudiente: nuevoUsuario.acudiente,

    tipodoc: nuevoUsuario.tipodoc,
    documento: nuevoUsuario.documento,
 
  });

  if (usuarioExistente) {

    console.log('El usuario ya existe en la colección.');
    res.json({ msg: 'El usuario ya existe en la colección' });

  } else {
  
    try {
  
      if(nuevoUsuario )
      if(nuevoUsuario.tipodoc === "T.I" && nuevoUsuario.acudiente === undefined){
        console.log('El paciente es menor de edad, debes ingresar un acudiente');
        res.json({msg:'El paciente es menor de edad, debes ingresar un acudiente'})
  
      }else{
        const data = await collection.insertOne(nuevoUsuario);
        res.json({data, msg: "Usuario Registrado"});
      }
   
     
    } catch (error) {
      console.error('Error al obtener datos de MongoDB:', error);
      res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
    }


  }



 
}


 module.exports = {

    getNamesAlp,
    nuevoPaciente
    
 }
