var express = require('express');
var router = express.Router();
const professoresController = require('../controllers/professoresController')

//aluno
router.get('/entrar', professoresController.login)
router.get('/:id', professoresController.show)
router.get('/alunos', professoresController.listAlunos)
router.get('/:id/notas', professoresController.notas)
router.post('/:id/notas', professoresController.postNotas)
router.put('/:id/notas', professoresController.putNotas)


module.exports = router; 
