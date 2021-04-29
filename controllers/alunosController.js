const { v4: uuidv4 } = require('uuid')
const { Aluno, AlunoDisciplina, Disciplina, Professor, Modulo } = require('../models')
 const { modulo } = require('../lib/utils')
const { Op } = require('sequelize')


const alunosController = {
    login: (req, res) => {
        return res.render('aluno/login')
    },
    auth: async (req, res) => {
        const { cpf } = req.body;
        const validarLogin = await Aluno.findOne({
            where: { cpf }
        }) 

        return res.redirect(`${validarLogin.id}`)
    },
    criar: async (req, res) => {
        ///rodar pra ver no que dar
        const modulos = await Modulo.findAll();
        return res.render('admin/create-student', { modulos })
    },
    show: async (req, res) => {
        const { id } = req.params;
        const result = await Aluno.findOne({
            where: { id },
            include: "boletim"
        })
        let media = 0;
        for(let i =0; i < result.boletim.length; i++){
            media += result.boletim[i].nota;
         //   console.log(result.boletim[1]);
        }
        const mediaFinal = media / result.boletim.length;
        result.boletim[0].nota = mediaFinal;
        //console.log(mediaFinal);
        result.modulo_id = modulo(result.modulo_id)
        return res.render('aluno/show', { aluno: result })
    },
    boletim: async (req, res) => {
        const { id } = req.params;
        const result = await Aluno.findOne({
            where: { id },
            include: "boletim"
        })
        // result.modulo_id = modulo(result.modulo_id)
        //  return res.render('aluno/grades', { aluno: result })
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
        //return res.(result)
    },
    post: async (req, res) => {
        const {id, modulo_id, nome, cpf } = req.body
        const { filename } = req.files
        // const id = uuidv4() //DAR ERRO QUANDO DEIXO ATIVADO
        const novoAluno = await Aluno.create({
            // id,
            nome,
            cpf,
            img_perfil: filename,
            modulo_id
        })

        const disciplinas = await Disciplina.findAll({
            where: {
                modulo_id
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