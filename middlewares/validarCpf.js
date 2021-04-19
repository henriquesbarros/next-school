
/*AINDA NÃO FUNCIONA, "VERIFICAR" */
const { Professor, Aluno } = require('../models');
module.exports = async (req, res, next) => {
    let { cpf } = req.body;
    let cpfProf = await Professor.findAll({ where: { cpf } });
    if (cpfProf.length) {
        res.status(400).json({ erro: "CPF já cadastrado em " + cpfProf.nome });
    } else {
        let cpfAlun = await Aluno.findAll({ where: { cpf } });
        if (cpfAlun.length) {
            res.status(400).json({ erro: "cpf já cadastrado em " + cpfAlun.nome });
        } else {
            function TestaCPF(cpf) {
                var Soma;
                var Resto;
                Soma = 0;
                if (cpf == "00000000000") return false;

                for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
                Resto = (Soma * 10) % 11;

                if ((Resto == 10) || (Resto == 11)) Resto = 0;
                if (Resto != parseInt(cpf.substring(9, 10))) return false;

                Soma = 0;
                for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
                Resto = (Soma * 10) % 11;

                if ((Resto == 10) || (Resto == 11)){
                     Resto = 0;
                if (Resto != parseInt(cpf.substring(10, 11))) {
                return false;
                }else{
                return true;
            }
            }
                if(TestaCPF(cpf)){
                res.status(400).json({ erro: "cpf Errado "});
            }else{
                next();
            }
        }
    }
}

