var express = require('express');
var router = express.Router();
const professoresController = require('../controllers/professoresController')

//aluno
router.get('/entrar', professoresController.login)
router.get('/:id', professoresController.show)
router.get('/alunos/:filter', professoresController.listAlunos)
router.get('/notas/:id', professoresController.notas)
router.put('/notas/:idAluno/:idDisciplina', professoresController.putNotas)

// POST NÃO IREMOS PRECISAR, PQ A INSERÇÃO DE NOTAS É UMA ATUALIZAÇÃO E NÃO CRIAÇÃO.
// router.post('/:id/notas', professoresController.postNotas)


module.exports = router; 
