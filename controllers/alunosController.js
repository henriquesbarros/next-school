const { Aluno, alunoDisciplina, Disciplina } = require('../models')

const alunosController = {
    login: (req, res) => {
        return res.send("Página de login do aluno.")
    },
    criar: (req, res) => {
        return res.send("Página para registrar aluno.")
    },
    show: (req, res) => {
        return res.send("Página do aluno.")
    },
    boletim: (req, res) => {
        return res.send("Página de notas do aluno.")
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
            alunoDisciplina.create({
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