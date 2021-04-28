const { sequelize, Aluno, Disciplina } = require('./models');


async function teste (){
    const Notas = await Aluno.findOne({
        where: { id:19 },
        include: "boletim"
    })
   const notas2  =Notas.toJSON()
       
    for (let resultado of notas2.boletim) {
        const disciplinas = await Disciplina.findOne({
            where: { id: resultado.disciplina_id }
        })
        Object.assign(resultado, disciplinas.toJSON() );
       
    }
    
    console.log(notas2)
};
teste()
// Aluno.findAll({where: include:['boletim']}).then(
//     data => {
//         console.log(data.map( u => u.toJSON()));
//         sequelize.close();
//     }
// )
