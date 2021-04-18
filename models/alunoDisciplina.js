module.exports = (sequelize, DataTypes) => {
    const alunoDisciplina = sequelize.define(
       'alunoDisciplina',{
           aluno_id: DataTypes.INTEGER,
           disciplinas_id: DataTypes.INTEGER,
           notas:DataTypes.DOUBLE,
           data_inicio:DataTypes.DATE,
           data_final:DataTypes.DATE
       },{
           tableName: 'alunos_disciplina',
           timestamps: false
       }
    )

    alunoDisciplina.associate = (models) => {
        // relação N:1
        alunoDisciplina.belongsTo(models.Aluno,{ as:"notas", foreignKey:"alunos_id"})
        // relação N:1
        alunoDisciplina.belongsTo(models.Disciplina,{ as:"alunos", foreignKey:"disciplinas_id"})
    }
    return alunoDisciplina;
    }