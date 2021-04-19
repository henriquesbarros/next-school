var express = require('express');
var router = express.Router();
const professoresController = require('../controllers/professoresController')

//aluno
router.get('/entrar', professoresController.login)
router.get('/:id', professoresController.show)
router.get('/index', professoresController.index)
router.get('/:id/notas', professoresController.notas)
router.post('/:id/notas', professoresController.digitar)
router.put('/:id/notas', professoresController.atualizarNota)


module.exports = router; 
