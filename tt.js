// const { Aluno, Disciplina } = require('./models');


// async function teste (){
//     const Notas = await Aluno.findOne({
//         where: { id:19 },
//         include: "boletim"
//     })
//    const notas2  =Notas.toJSON()
       
//     for (let resultado of notas2.boletim) {
//         const disciplinas = await Disciplina.findOne({
//             where: { id: resultado.disciplina_id }
//         })
//         Object.assign(resultado, disciplinas.toJSON() );
       
//     }
    
//     console.log(notas2)
// };
// teste()
// Aluno.findAll({where: include:['boletim']}).then(
//     data => {
//         console.log(data.map( u => u.toJSON()));
//         sequelize.close();
//     }
// )



//o primeiro que iago fez

// const { sequelize, Aluno, Disciplina, Modulo } = require('./models');

// async function teste (){
//    const nomeDisciplina = []
//     const Notas = await Aluno.findOne({
//         where: { id:1 },
//         include: "boletim"
//     })
//    const notas2  =Notas.toJSON();
// //    
   
//     for (let resultado of notas2.boletim) {
//         const disciplinas = await Disciplina.findOne({
//             where: { id: resultado.disciplina_id }
//         })
//         const alunos = await Aluno.findOne({
//             where:{id: resultado.aluno_id}
//         })
       
//         const obj = Object.assign({}, alunos.toJSON(), disciplinas.toJSON(), resultado);
//         nomeDisciplina.push(obj)
//     }

    
    
//     console.log(nomeDisciplina)
// };
// teste()
// Aluno.findAll({where: include:['boletim']}).then(
//     data => {
//         console.log(data.map( u => u.toJSON()));
//         sequelize.close();
//     }
// )

//pedaço do profcontroller

 //     const { id } = req.params;
        //     const Notas = await Aluno.findOne({
        //         where: { id },
        //         include: "boletim"
        //     })
        //     const notas2 = Notas.toJSON()

        //     for (let resultado of notas2.boletim) {
        //         const disciplinas = await Disciplina.findOne({
        //             where: { id: resultado.disciplina_id }
        //         })
        //         Object.assign(resultado, disciplinas.toJSON() );

        //     }
        //     // return res.render('professor/grades', { aluno: result })
        //     return res.json(notas2)


        // <%= nota.disciplina_id == 1 ? "HTML" : "" %> 
        // <%= nota.disciplina_id == 2 ? "CSS" : "" %> 
        // <%= nota.disciplina_id == 3 ? "JAVASCRIPT" : "" %> 
        // <%= nota.disciplina_id == 4 ? "REACT" : "" %> 
        // <%= nota.disciplina_id == 12 ? "POSTGRESQL" : "" %> 
        // <%= nota.disciplina_id == 13 ? "ORACLE" : "" %> 
        // <%= nota.disciplina_id == 14 ? "MARIADB" : "" %> 
        // <%= nota.disciplina_id == 15 ? "MYSQL" : "" %>


        notas: async (req, res) => {
            const notasAluno = []
            const { id } = req.params;
            const Notas = await Aluno.findOne({
                where: { id :1 },
                include: "boletim"
            })
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
        }
        // const { Aluno, AlunoDisciplina, Disciplina, Professor, Modulo } = require('./models')

        //    const nota = async (req, res) => {
        //     const { id } = req.params;
        //     const result = await Aluno.findOne({
        //         where: { id: 1 },
        //         include: "boletim"
        //     })
        //     console.log(result);
        //     return result;
        // } 

        // console.log(nota);
        