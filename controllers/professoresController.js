const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { Professor, Aluno, AlunoDisciplina, sequelize } = require('../models')
const { Op } = require('sequelize')
const { QueryTypes } = require('sequelize')
const { modulo, disciplina } = require('../lib/utils')

const professorController = {
    login: (req, res) => {
        return res.render('professor/login')
    },
    auth: (req, res) => {
        return res.send('Página de autenticação do login')
    },
    criar: (req, res) => {
        return res.send("Página para registrar professor.")
    },
    show: async (req, res) => {
        const { id } = req.params;
        const mostrarProfessor = await Professor.findOne({
            where: {
                id
            }
        })
        return res.render('professor/show')
    },
    listagemAlunos: async (req, res) => {
        const { filter } = req.query;
        if (filter) {
            const listarAlunos = await Aluno.findAll({
                where: {
                    nome: {[Op.like]: `%${filter}%`}
                }
            })
            return res.render('professor/listing', { alunos: listarAlunos})
        } else {
            const listarAlunos = await Aluno.findAll()
            return res.render('professor/listing', { alunos: listarAlunos})
        }
    },
    notas: async (req, res) => {  
        const { id } = req.params;
        const result = await Aluno.findOne({
            where: { id },
            include: "boletim"
        })
        result.modulo_id = modulo(result.modulo_id)    
        return res.render('professor/grades', { aluno: result })
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

        if (keys[2].slice(-2) > 10 ) {
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
            {"disciplina": Number(disciplina_1), "nota": result[0][0]},
            {"disciplina": Number(disciplina_2), "nota": result[1][0]},
            {"disciplina": Number(disciplina_3), "nota": result[2][0]},
            {"disciplina": Number(disciplina_4), "nota": result[3][0]}
        ]

    
        for (let nota of notas) {
            await AlunoDisciplina.update({
                nota: nota.nota
            },{
                where: {
                    [Op.and]: [
                        { aluno_id: id },
                        { disciplina_id: nota.disciplina}
                    ]
                }
            })
        }

        return res.json({ mensagem: "Atualizado com sucesso!"})  
    },
    post: async (req, res) => {
        const { nome, senha_professor, cpf, img_perfil, modulo_id } = req.body;
        const senhaCrypt = bcrypt.hashSync(senha_professor, 10)
        const id = uuidv4()

        let novoProfessor = await Professor.create({
            id,
            nome,
            senha_professor: senhaCrypt,
            cpf,
            img_perfil,
            modulo_id
        })           
        return res.json(novoProfessor);
    },
    listagem: async(req, res) => {
        let professores = await Professor.findAll()
        return res.json(professores);
    },
    editar: (req, res) => {
        return res.send("Página para editar um aluno.")
    },
    put: async (req, res) => {
        let { id } = req.params
        let { nome } = req.body;
        let atualizarProfessor = await Professor.update({
            nome
        },{
            where:{ id }
        })
        return res.send(atualizarProfessor);
    },
    delete: async(req, res) => {
        let{ id } = req.params;
        let deleteProfessor = await Professor.destroy({
            where:{ id }
        })
        return res.json(deleteProfessor);
    }
}

module.exports = professorController
           