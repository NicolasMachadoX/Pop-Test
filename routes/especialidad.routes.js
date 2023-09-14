const {Router} = require('express');
const getAll = require('../controllers/especialidad.controllers');

const router = Router();

router.get('/getAll', getAll);


module.exports = router;