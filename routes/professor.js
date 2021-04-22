var express = require('express');
var router = express.Router();
const professoresController = require('../controllers/professoresController')

//aluno
router.get('/entrar', professoresController.login)
// VERIFICACR O PQ /:id não funciona
// router.get('/professor/:id', professoresController.show)

//verificar se assim funciona
router.get('/:id', professoresController.show)
router.get('/listagem', professoresController.listagemAlunos)
router.get('/notas/:id', professoresController.notas)
router.put('/notas/:id', professoresController.putNotas)

module.exports = router; 
