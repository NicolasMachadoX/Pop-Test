const {Router} = require('express');
const getAll = require('../controllers/estado_cita.controllers');

const router = Router();

router.get('/getAll', getAll);


module.exports = router;