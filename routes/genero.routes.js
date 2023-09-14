const {Router} = require('express');
const getAll = require('../controllers/genero.controllers');

const router = Router();

router.get('/getAll', getAll);


module.exports = router;