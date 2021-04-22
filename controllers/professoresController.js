const { Professor, Aluno, AlunoDisciplina, sequelize } = require('../models')
const { Op } = require('sequelize')
const { QueryTypes } = require('sequelize')

const professorController = {
    login: (req, res) => {
        return res.send("Página de login do professor.")
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
        return res.json(mostrarProfessor)
    },
    listagemAlunos: async (req, res) => {
        const { filter } = req.query;
        if (filter) {
            const listarAlunos = await Aluno.findAll({
                where: {
                    nome: {[Op.like]: `%${filter}%`}
                }
            })
            return res.json(listarAlunos)
        } else {
            const listarAlunos = await Aluno.findAll()
            return res.json(listarAlunos)
        }
    },
    notas: (req, res) => {        
        return res.send("Página de notas")
    },    
    putNotas: async (req, res) => {
        const { id } = req.params
        const { notas } = req.body

        for (let nota of notas) {
            await AlunoDisciplina.update({
                notas: nota.nota
            },{
                where: {
                    [Op.and]: [
                        { alunos_id: id },
                        { disciplinas_id: nota.disciplina}
                    ]
                }
            })
        }

        return res.json({ mensagem: "Atualizado com sucesso!"})  
    },
    post: async (req, res) => {
        const { nome, senha_professor, cpf, img_perfil, modulos_id } = req.body
        let novoProfessor = await Professor.create({
            nome,
            senha_professor,
            cpf,
            img_perfil,
            modulos_id
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
        let { nome, senha_professor, modulos_id } = req.body;
        let atualizarProfessor = await Professor.update({
            nome,
            senha_professor,
            modulos_id
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
           