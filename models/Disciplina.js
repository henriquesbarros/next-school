module.exports = (sequelize, DataTypes) => {
    const Disciplina = sequelize.define(
        'Disciplina', {
        nome: DataTypes.STRING,
        modulos_id: DataTypes.INTEGER
    }, {
        tableName: 'disciplinas',
        timestamps: false
    }
    )

    Disciplina.associate = (models) => {
        // relação 1:n
        Disciplina.belongsToMany(models.Aluno, {
            as: "notas",
            through: "alunos_disciplinas",
            foreignKey: 'alunos_id',
            otherKey: "disciplinas_id",
        },{
                    // check se funciona com hendy ou iago
            notas: DataTypes.INTEGER 
        });

    Disciplina.belongsTo(models.Modulo, {as: "modulo", foreignKey: 'modulos_id'});    
    }
    return Disciplina;
} 