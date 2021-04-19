/*AINDA NÃO FUNCIONA, "VERIFICAR" */
// criar apartir desse exemplo o middlewares para validação de cadastro de alunos e professores
//seria bom criar um campo de email para aluno so pra deixar o cadastro padrão ou deixa sem tbm não tem bronca
// lembrar sempre que aluno não tem senha Aluno(id, nome, cpf, img_perfil)
//professor(id, node, senha_profssor, cpf, img_pergil, modulo_id)

const { Usuario } = require('../models')

module.exports = async (req, res, next) => {
    let { cpf, nome, senha } = req.body;
    let user = await Usuario.findAll({ where: { email } });
    if (user.length) {
        res.status(400).json({ erro: "Email já cadastrado" });
    } else {
        if (!cpf || !nome || !senha) {
            res.status(400).json({ erro: "Nome, email ou senha não informados." });
        } else {
            if (senha.length < 8 ) {
                res.status(400).json({ erro: "A senha precisa ter entre 6 e 12 caracteres." });
            } else {
                next();
            }
        }
    }
}

