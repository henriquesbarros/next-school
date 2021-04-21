const express = require('express')
const router = express.Router()
const alunosController = require('../controllers/alunosController')
const professoresController = require('../controllers/professoresController')
const admController = require('../controllers/admController')

router.get('/entrar', admController.login)
router.get('/selecionar', admController.select)

// Alunos
router.get('/criar/aluno', alunosController.criar)
router.post('/alunos/criar', alunosController.post)
router.get('/alunos/index', alunosController.index)
router.get('/alunos/editar', alunosController.editar)
router.put('/alunos/atualizar/:id', alunosController.put)
router.delete('/alunos/deletar/:id', alunosController.delete)

// Professores
router.get('/criar/professor', professoresController.criar)
router.post('/professores/criar', professoresController.post)
router.get('/professores/index', professoresController.index)
router.get('/professores/editar', professoresController.editar)
router.put('/professores/atualizar/:id', professoresController.put)
router.delete('/professores/deletar/:id', professoresController.delete)

module.exports = router