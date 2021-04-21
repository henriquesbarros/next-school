const { Professor } = require('../models');

const professorController = {
    login: (req, res) => {
        return res.send("Página de login do professor.")
    },
    criar: (req, res) => {
        return res.send("Página para registrar professor.")
    },
    show: (req, res) => {
        return res.send("Página do professor.")
    },
    listAlunos: (req, res) => {
        return res.send("Página de listagem de alunos")
    },
    notas: (req, res) => {
        return res.send("Página de digitação das notas.")
    },
    postNotas: (req ,res) => {
        return
    },
    putNotas: (req, res) => {
        return
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
           