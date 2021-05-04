module.exports = (req, res, next) =>{
    let { cpf, nome, modulo_id, senha_professor } = req.body;
    
    if ( !nome || !senha_professor || !cpf|| !modulo_id) {
        res.status(400).json({ erro: "campo em branco" });
    } else {
        console.log('else');
            next();
    }
}