// module.exports = (sequelize, DataTypes) => {
//     const Disciplina = sequelize.define(
//         'Disciplina', {
//         nome: DataTypes.STRING,
//         modulos_id: DataTypes.INTEGER
//     },
//         'alunos_id', {
//             notas:DataTypes.INTEGER,
//             data_inicio:DataTypes.DATE,
//             data_final:DataTypes.DATE,
//             foreignKey: true,
//             primaryKey:true
//         },{
     
//         tableName: 'disciplinas',
//         timestamps: false
//     }
//     )



module.exports = (sequelize, DataTypes) => {
    const Disciplina = sequelize.define(
        'Disciplina', {
        nome: DataTypes.STRING,
        modulos_id: DataTypes.INTEGER
    },{
     
        tableName: 'disciplinas',
        timestamps: false
    }
    )

     // To create a One - To - One relationship, the hasOne and belongsTo associations are used together;
    // To create a One - To - Many relationship, the hasMany and belongsTo associations are used together;
    // To create a Many - To - Many relationship, two belongsToMany calls are used together
    
    Disciplina.associate = (models) => {
        // relação 1:n
        Disciplina.hasMany(models.AlunoDisciplina, {as: "alunos", foreignKey: 'disciplinas_id'});
        // relação N:1
        Disciplina.belongsTo(models.Modulo, {as: "modulo", foreignKey: 'modulos_id'});    
    }
    return Disciplina;
} 