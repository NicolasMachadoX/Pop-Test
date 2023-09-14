const {Router} = require('express');
const {getNamesAlp} = require('../controllers/usuarios.controllers');
const router = Router();

router.get('/getAlp', getNamesAlp);


module.exports = router;