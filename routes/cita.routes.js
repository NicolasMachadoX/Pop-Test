const {Router} = require('express');
const {getFechas, getCita, getDiaEspecifico, getMedicos,getDiaEspecificoMedico,getConsultoriosCita,getCitaGenero,getCitasCanceladas} = require('../controllers/cita.controllers');

const router = Router();

router.get('/fechaEspecifica', getFechas).get('/getCitas', getCita).get('/getDiaEspecifica', getDiaEspecifico)
.get('/getMedicos', getMedicos).get("/getDiaEspecificoMedico", getDiaEspecificoMedico)
.get("/getConsultoriosCita",getConsultoriosCita).get("/getCitaGenero", getCitaGenero).get("/getCitasCanceladas",getCitasCanceladas);


module.exports = router;

