const express = require('express')
const router = express.Router()
const alunosController = require('../controllers/alunosController')
const professoresController = require('../controllers/professoresController')

// Alunos
router.get('/alunos/index', alunosController.index)
router.post('/alunos/criar/', alunosController.create)
router.put('/alunos/atualizar/:id', alunosController.update)
router.delete('/alunos/deletar/:id', alunosController.delete)

// Professores
router.get('/professores/index', professoresController.index)
router.post('/professores/criar', professoresController.create)
router.put('/professores/atualizar/:id', professoresController.update)
router.delete('/professores/deletar/:id', professoresController.delete)

module.exports = router