const { Professor, sequelize } = require('../models');
const { Op } = require('sequelize');

const professorController = {
    index: async(req, res) => {
        let professores = await Professor.findAll({
            // order:[
            //     ['id', 'ASC']
            // ],
            // limit: 4
        })
        return res.json(professores);
    },
    create: async (req, res) => {
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
    update: async (req, res) => {
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
           