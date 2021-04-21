const express = require('express')
const router = express.Router()
const alunosController = require('../controllers/alunosController')
const professoresController = require('../controllers/professoresController')
const admController = require('../controllers/admController')

router.get('/entrar', admController.login)
router.get('/selecionar', admController.select)

// Alunos
router.get('/criar/aluno', alunosController.criar)
router.post('/criar/aluno', alunosController.post)
router.get('/alunos', alunosController.listagem)
router.get('/alunos/:id', alunosController.editar)
router.put('/alunos/:id', alunosController.put)
router.delete('/alunos/:id', alunosController.delete)

// Professores
router.get('/criar/professor', professoresController.criar)
router.post('/criar/professor', professoresController.post)
router.get('/professores', professoresController.listagem)
router.get('/professores/:id', professoresController.editar)
router.put('/professores/:id', professoresController.put)
router.delete('/professores/:id', professoresController.delete)

module.exports = router