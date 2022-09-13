const express = require('express');
const alumnoController = require('../controllers/alumno_controller');

const router = express.Router();

// INDEX GET
router.get('/');

// SHOW GET
router.get('/show/:clase', alumnoController.aluShow);

// REGISTRAR GET
router.get('/registrar', alumnoController.aluRegistrar);

// REGISTRAR POST
router.post('/registrar', alumnoController.aluRegistrarPost);

// EDITAR GET
router.get('/editar/:id', alumnoController.aluEditar); 

// EDITAR PUT
router.post('/editar/:id', alumnoController.aluEditarPut);

// DELETE
router.delete('/:id', alumnoController.aluDelete); 

module.exports = router;
