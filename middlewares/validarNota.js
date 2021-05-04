
// não funciona

module.exports = (req, res, next) => {
    let notas = req.body;
    if(notas.length){
    for (let validarNota in notas) {
        if (validarNota.nota < 0 || validarNota.nota > 10) {
            console.log('entrei no if');
         res.status(400).json({ erro: "Nota invalida" });
        }
    }
}else{
    next();
}
}
