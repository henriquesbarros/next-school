/*AINDA NÃO FUNCIONA, "VERIFICAR" */
// criar apartir desse exemplo o middlewares para validação de cadastro de alunos e professores
//seria bom criar um campo de email para aluno so pra deixar o cadastro padrão ou deixa sem tbm não tem bronca
// lembrar sempre que aluno não tem senha Aluno(id, nome, cpf, img_perfil)
//professor(id, node, senha_profssor, cpf, img_pergil, modulo_id)

const { Aluno, Professor } = require('../models')

module.exports = async (req, res, next) => {
    let { cpf, nome_aluno, modulo_id } = req.body;
    
    let UserProfessor = await Professor.findAll({ where: { cpf } });
    if (UserProfessor.length) {
        res.status(400).json({ erro:  `CPF ja cadastrado no professor: ${ UserProfessor.nome}`});
    }else{
        let UserAluno = await Aluno.findAll({ where: { cpf } });
        if (UserAluno.length) {
            res.status(400).json({ erro:  `CPF ja cadastrado no aluno: ${ UserAluno.nome_aluno}`});
    }
        if ( !nome_aluno || !cpf || !modulo_id) {
            res.status(400).json({ erro: "campo em branco" });
        } else {
                next();
        }
    }
}

