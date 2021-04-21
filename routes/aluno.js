var express = require('express');
var router = express.Router();
const alunosController = require('../controllers/alunosController')

//aluno
router.get('/entrar', alunosController.login)
router.get('/:id', alunosController.show)
router.get('/:id/boletim', alunosController.boletim)


module.exports = router; 
