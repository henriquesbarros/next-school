module.exports = (sequelize, DataTypes) => {
    const alunoDisciplina = sequelize.define(
        'alunoDisciplina', {
        alunos_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            primaryKey: true
        },
        disciplinas_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            primaryKey: true
        },
        notas: DataTypes.DOUBLE,
        data_inicio: DataTypes.DATE,
        data_final: DataTypes.DATE
    },
        {
            tableName: 'alunos_disciplina',
            timestamps: false
        }
    )

    // To create a One - To - One relationship, the hasOne and belongsTo associations are used together;
    // To create a One - To - Many relationship, the hasMany and belongsTo associations are used together;
    // To create a Many - To - Many relationship, two belongsToMany calls are used together

    alunoDisciplina.associate = (models) => {
        // relação N:1
        alunoDisciplina.belongsTo(models.Aluno, { as: "notas", foreignKey: "alunos_id" })
        // relação N:1
        alunoDisciplina.belongsTo(models.Disciplina, { as: "alunos", foreignKey: "disciplinas_id" })
    }
    return alunoDisciplina;
}