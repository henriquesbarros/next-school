const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { Professor, Aluno, AlunoDisciplina, Modulo, Disciplina, sequelize } = require('../models')
const { Op } = require('sequelize')
const { QueryTypes } = require('sequelize')
const { modulo } = require('../lib/utils')

const professorController = {
    login: (req, res) => {
        return res.render('professor/login')
    },
    auth: (req, res) => {
        return res.send('Página de autenticação do login')
    },
    criar: async (req, res) => {
        // const modulos = await sequelize.query('SELECT `id`, `nome` FROM `modulos` AS `Modulo`', {types: QueryTypes.SELECT});
        const modulos = await Modulo.findAll();
        return res.render('admin/create-teacher', { modulos })
    },
    show: async (req, res) => {
        const { id } = req.params;
        const mostrarProfessor = await Professor.findOne({
            where: {
                id
            }
        })
        mostrarProfessor.modulo_id = modulo(mostrarProfessor.modulo_id)
        return res.render('professor/show', { professor: mostrarProfessor })
    },
    listagemAlunos: async (req, res) => {
        const { filter } = req.query;
        let alunos = []
        if (filter) {
            alunos = await Aluno.findAll({
                where: {
                    nome: { [Op.like]: `%${filter}%` }
                }
            })
        } else {
            alunos = await Aluno.findAll()
        }

        alunos.map(aluno => {
            aluno.modulo_id = modulo(aluno.modulo_id)
        })

        return res.render('professor/listing', { alunos })
    },
    notas: async (req, res) => {
        const notasAluno = []
        const { id } = req.params;
        const Notas = await Aluno.findOne({
            where: { id },
            include: "boletim"
        })
        const notasJson = Notas.toJSON()        

        for (let resultado of notasJson.boletim) {
            const disciplinas = await Disciplina.findOne({
                where: { id: resultado.disciplina_id }
            })
            const alunos = await Aluno.findOne({
                where:{id: resultado.aluno_id}
            })
            const obj = Object.assign({},alunos.toJSON(), disciplinas.toJSON(), resultado);
            notasAluno.push(obj)
        }
        //console.log(nomeDisciplina);
        return res.render('professor/grades', { notasAluno})
    },
    putNotas: async (req, res) => {
        const { id } = req.params
        const keys = Object.keys(req.body)

        let disciplina_1 = 0
        let disciplina_2 = 0
        let disciplina_3 = 0
        let disciplina_4 = 0

        const result = Object.keys(req.body).map(key => {
            return [req.body[key]]
        })

        if (keys[2].slice(-2) > 10) {
            disciplina_1 = keys[0].slice(-2)
            disciplina_2 = keys[1].slice(-2)
            disciplina_3 = keys[2].slice(-2)
            disciplina_4 = keys[3].slice(-2)
        } else {
            disciplina_1 = keys[0].slice(4)
            disciplina_2 = keys[1].slice(4)
            disciplina_3 = keys[2].slice(4)
            disciplina_4 = keys[3].slice(4)
        }

        const notas = [
            { "disciplina": Number(disciplina_1), "nota": result[0][0] },
            { "disciplina": Number(disciplina_2), "nota": result[1][0] },
            { "disciplina": Number(disciplina_3), "nota": result[2][0] },
            { "disciplina": Number(disciplina_4), "nota": result[3][0] }
        ]


        for (let nota of notas) {
            await AlunoDisciplina.update({
                nota: nota.nota
            }, {
                where: {
                    [Op.and]: [
                        { aluno_id: id },
                        { disciplina_id: nota.disciplina }
                    ]
                }
            })
        }

        return res.json({ mensagem: "Atualizado com sucesso!" })
    },
    post: async (req, res) => {
        const { nome, senha_professor, cpf, img_perfil, modulo_id } = req.body;
        const senhaCrypt = bcrypt.hashSync(senha_professor, 10)
        const id = uuidv4()
        const { filename } = req.file
        let novoProfessor = await Professor.create({
            id,
            nome,
            senha_professor: senhaCrypt,
            cpf,
            img_perfil: filename,
            modulo_id
        })
        return res.redirect('/admin/professores')
    },
    listagemAdminProfessores: async (req, res) => {
        const { filter } = req.query;

        let professores = []

        if (filter) {
            professores = await Professor.findAll({
                where: {
                    nome: { [Op.like]: `%${filter}%` }
                }
            })
        } else {
            professores = await Professor.findAll()
        }

        professores.map(professor => {
            professor.modulo_id = modulo(professor.modulo_id)
        })

        return res.render('admin/teacher-listing', { professores })
    },
    editar: async (req, res) => {
        const { id } = req.params
        const professor = await Professor.findOne({
            where: { id }
        })

        const modulos = await Modulo.findAll()
        return res.render('admin/teacher-edit', { professor, modulos })
    },
    put: async (req, res) => {
        let { id } = req.params
        let { nome, cpf, modulo_id, senha_professor } = req.body;
        let atualizarProfessor = await Professor.update({
            nome,
            cpf,
            modulo_id,
            senha_professor
        }, {
            where: { id }
        })
        return res.redirect(`${id}`)
    },
    delete: async (req, res) => {
        let { id } = req.params;
        let deleteProfessor = await Professor.destroy({
            where: { id }
        })
        return res.json(deleteProfessor);
    }
}

module.exports = professorController
