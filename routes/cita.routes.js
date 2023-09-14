const {Router} = require('express');
const {getFechas, getCita, getDiaEspecifico, getMedicos} = require('../controllers/cita.controllers');

const router = Router();

router.get('/fechaEspecifica', getFechas).get('/getCitas', getCita).get('/getDiaEspecifica', getDiaEspecifico).get('/getMedicos', getMedicos);


module.exports = router;

