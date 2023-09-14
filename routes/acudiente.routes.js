const {Router} = require('express');
const getAll = require('../controllers/acudiente.controllers');

const router = Router();

router.get('/getAll', getAll);


module.exports = router;