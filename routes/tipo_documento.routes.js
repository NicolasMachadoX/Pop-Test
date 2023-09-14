const {Router} = require('express');
const getAll = require('../controllers/tipo_documento.controllers');

const router = Router();

router.get('/getAll', getAll);


module.exports = router;