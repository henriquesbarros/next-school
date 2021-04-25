var express = require('express');
var router = express.Router();
const professoresController = require('../controllers/professoresController')

//aluno
router.get('/entrar', professoresController.login)
// http://localhost:3000/professor/entrar

router.post('/entrar', professoresController.auth)
// http://localhost:3000/professor/entrar

router.get('/show/:id', professoresController.show)
// http://localhost:3000/professor/show/:id

router.get('/listagem', professoresController.listagemAlunos)
// http://localhost:3000/professor/listagem

router.get('/notas/:id', professoresController.notas)
router.put('/notas/:id', professoresController.putNotas)
// http://localhost:3000/professor/notas/:id

module.exports = router; 
