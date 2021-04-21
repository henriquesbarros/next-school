const { Aluno, AlunoDisciplina, Disciplina, sequelize } = require('../models')
const moduloFuncao = require('../lib/utils')
const { QueryTypes } = require('sequelize')

const alunosController = {
    login: (req, res) => {
        return res.send("Página de login do aluno.")
    },
    criar: (req, res) => {
        return res.send("Página para registrar aluno.")
    },
    // VER COM HENDY COMO FAZER JOIN PELO SEQUELIZE    
    show: async (req, res) => {
        const { id } = req.params;
        const users = await sequelize.query(`SELECT alunos.nome as 'nome', disciplinas.nome as'disciplina', alunos_disciplina.notas as 'notas'
        from alunos_disciplina
        inner join disciplinas on disciplinas.id = disciplinas_id
        inner join alunos on alunos.id = alunos_id
        where alunos_id =` + id,
            {types: QueryTypes.SELECT});    
        return res.send(users) 
    },
    boletim: async (req, res) => {
        const { id } = req.params;
        const users = await sequelize.query(`SELECT disciplinas.nome as'disciplina', alunos_disciplina.notas as 'notas'
        from alunos_disciplina
        inner join disciplinas on disciplinas.id = disciplinas_id        
        where alunos_id =` + id,
            {types: QueryTypes.SELECT});    
        return res.send(users)        
    },
    post: async (req, res) => {
        const { modulos_id, nome, cpf, img_perfil } = req.body
        const novoAluno = await Aluno.create({
            nome,
            cpf,
            img_perfil,
            modulos_id
        })

        const disciplinas = await Disciplina.findAll({
            where: {
                modulos_id
            }
        })

        const alunoDiscPromise = disciplinas.map(disciplina => {
            AlunoDisciplina.create({
                alunos_id: novoAluno.id,
                disciplinas_id: disciplina.id
            })
        })

        const promisesFinalized = await Promise.all(alunoDiscPromise)
        return res.json(promisesFinalized)
    },
    listagem: async (req, res) => {
        const alunosEncontrados = await Aluno.findAll()
        return res.json(alunosEncontrados)
    },
    editar: (req, res) => {
        return res.send("Página para editar um aluno.")
    },
    put: async (req, res) => {
        const { id } = req.params
        const { nome } = req.body

        const attAluno = await Aluno.update({
            nome
        }, 
        {
            where: {
                id
            }
        })

        return res.json(attAluno)
    },
    delete: async (req, res) => {
        const { id } = req.params
        const delAaluno = Aluno.destroy({
            where: {
                id
            }
        })

        return res.json(delAaluno)
    }
}

module.exports = alunosController;