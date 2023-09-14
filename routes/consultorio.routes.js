const {Router} = require('express');
const getAll = require('../controllers/consultorio.controllers');

const router = Router();

router.get('/c', getAll);


module.exports = router;