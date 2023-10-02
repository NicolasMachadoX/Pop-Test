const {Router} = require('express');
const {getNamesAlp, nuevoPaciente} = require('../controllers/usuarios.controllers');
const router = Router();

router.get('/getAlp', getNamesAlp)
.post('/new', nuevoPaciente);


module.exports = router;