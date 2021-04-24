const express = require('express')
const router = express.Router()
const alunosController = require('../controllers/alunosController')
const professoresController = require('../controllers/professoresController')
const admController = require('../controllers/admController')

router.get('/entrar', admController.login)
// http://localhost:3000/admin/entrar

router.get('/selecionar', admController.select)
// http://localhost:3000/admin/selecionar


// Alunos
router.get('/criar/aluno', alunosController.criar)
// http://localhost:3000/admin/criar/aluno

router.post('/criar/aluno', alunosController.post)
// http://localhost:3000/admin/criar/aluno

router.get('/alunos', alunosController.listagem)
// http://localhost:3000/admin/alunos

router.get('/alunos/:id', alunosController.editar)
router.put('/alunos/:id', alunosController.put)
router.delete('/alunos/:id', alunosController.delete)
// http://localhost:3000/admin/alunos/:id


// Professores
router.get('/criar/professor', professoresController.criar)
router.post('/criar/professor', professoresController.post)
// http://localhost:3000/admin/criar/professor

router.get('/professores', professoresController.listagem)
// http://localhost:3000/admin/professores

router.get('/professores/:id', professoresController.editar)
router.put('/professores/:id', professoresController.put)
router.delete('/professores/:id', professoresController.delete)
// http://localhost:3000/admin/professores/:id


module.exports = router