const express = require('express');
const dbConnection = require('../database/config');

class Server{

constructor(){
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {

        usuario: '/api/usuarios',
        medico: '/api/medicos',
        genero: '/api/generos',
        cita: '/api/citas',
        acudiente: '/api/acudientes',
        consultorio: '/api/consultorios',
        especialidad: '/api/especialidades',
        estado_cita: '/api/estadoCitas',
        tipo_documento: '/api/tipoDocs'
    }

    this.middlewares();

    this.routes();
    
    this.connectionDB();

    
}

    async connectionDB(){
       await dbConnection()

    }

    middlewares(){
        this.app.use(express.json());

    }

    routes(){
        this.app.use(this.paths.usuario, require('../routes/usuarios.routes.js'));
        this.app.use(this.paths.medico, require('../routes/medico.routes.js'));
        this.app.use(this.paths.genero, require('../routes/genero.routes.js'));
        this.app.use(this.paths.cita, require('../routes/cita.routes.js'));
        this.app.use(this.paths.acudiente, require('../routes/acudiente.routes.js'));
        this.app.use(this.paths.consultorio, require('../routes/consultorio.routes.js'));
        this.app.use(this.paths.especialidad, require('../routes/especialidad.routes.js'));
        this.app.use(this.paths.tipo_documento, require('../routes/tipo_documento.routes.js'));
        this.app.use(this.paths.estado_cita, require('../routes/estado_cita.routes.js'));
        
        
    }

    listen(){

        this.app.listen(this.port ,()=>{
            console.log(`Server listening in port: ${this.port}`);
        })

    }

}

module.exports = Server;