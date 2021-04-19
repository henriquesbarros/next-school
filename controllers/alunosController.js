const { Aluno } = require('../models')

const alunosController = {
    create: async (req, res) => {
        const { nome, cpf, img_perfil } = req.body
        const novoAluno = await Aluno.create({
            nome,
            cpf,
            img_perfil
        })

        // const disciplinas = await Disciplina.findAll({
        //     where: {
        //         modulos_id
        //     }
        // })

        // const alunoDiscPromise = disciplinas.map(disciplina => {
        //     alunoDisciplina.create({
        //         alunos_id: novoAluno.id,
        //         disciplinas_id: disciplina.id
        //     })
        // })

        // const promisesFinalized = await Promise.all(alunoDiscPromise)
        return res.json(novoAluno)
    }
}

module.exports = alunosController;