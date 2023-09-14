const {Router} = require('express');
const {getEspecialidad, getAll,getConsultorios} = require('../controllers/medico.controllers');

const router = Router();

router.get('/getAll', getAll)
.get('/especialidad', getEspecialidad).get('/consultorios', getConsultorios);


module.exports = router;

