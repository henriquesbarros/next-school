module.exports = (req, res, next) =>{
    let { cpf, nome_aluno, modulo_id } = req.body;
    
    if ( !nome_aluno || !cpf|| !modulo_id) {
        res.status(400).json({ erro: "campo em branco" });
    } else {
        console.log('else');
            next();
    }
}