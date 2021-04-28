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
        const modulos = await Modulo.findAll();   // ta pegando os campos do model Disciplina    
        // console.log(modulos[0])
        return res.render('admin/create-teacher', { modulos })
    },
    show: async (req, res) => {
        // const { id } = req.params;
        // const mostrarProfessor = await Professor.findOne({
        //     where: {
        //         id
        //     }
        // })
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
        const Notas = await Aluno.findOne({
            where: { id },
            include: "boletim"
        })
        const notas2 = Notas.toJSON()
           
        for (let resultado of notas2.boletim) {
            const disciplinas = await Disciplina.findOne({
                where: { id: resultado.disciplina_id }
            })
            Object.assign(resultado, disciplinas.toJSON() );
           
        }
        // return res.render('professor/grades', { aluno: result })
        return res.json(notas2)
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
        return res.render('admin/teacher-listing');
    },
    editar: (req, res) => {
        return res.render('admin/teacher-edit');
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
           