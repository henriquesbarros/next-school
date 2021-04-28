const { Aluno, AlunoDisciplina, Disciplina, sequelize, QueryTypes } = require('../models')
const { modulo } = require('../lib/utils')
const { Op } = require('sequelize')

const alunosController = {
    login: (req, res) => {
        return res.render('aluno/login')
    },
    auth: (req, res) => {
        return res.send('Página de autenticação do login')
    },
    criar: (req, res) => {
        return res.render('admin/create-student')
    },
    show: async (req, res) => {
        const { id } = req.params;
        const result = await Aluno.findOne({
            where: { id },
            include: "boletim"
        })

        result.modulo_id = modulo(result.modulo_id)
        return res.render('aluno/show', { aluno: result })
    },
    boletim: async (req, res) => {
        const { id } = req.params;
        // const users = await sequelize.query(`
        // SELECT disciplinas.nome as'disciplina', alunos_disciplina.nota as 'notas'
        // from alunos_disciplina
        // inner join disciplinas on disciplinas.id = disciplinas_id        
        // where aluno_id =` + id,
        //     {types: QueryTypes.SELECT}); 
        
        const result = await Aluno.findOne({
            where: { id },
            include: "boletim"
        })
        result.modulo_id = modulo(result.modulo_id)
        return res.render('aluno/grades', { aluno: result })
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
        const { filter } = req.query;
        if (filter) {
            const alunosEncontrados = await Aluno.findAll({
                where: {
                    nome: {[Op.like]: `%${filter}%`}
                }
            })
            // result.modulo_id = modulo(result.modulo_id)
            return res.render('professor/listing', { alunos: alunosEncontrados})
        } else {
            const alunosEncontrados = await Aluno.findAll()
            return res.render('admin/student-listing', { alunos: alunosEncontrados})
        }
    },
    editar: (req, res) => {
        return res.render('admin/student-edit')
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
        const delAaluno = await Aluno.destroy({
            where: {
                id
            }
        })

        return res.json(delAaluno)
    }
}

module.exports = alunosController;