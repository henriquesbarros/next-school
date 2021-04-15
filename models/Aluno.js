const { Sequelize, DataTypes } = require("sequelize/types");

module.exports = (Sequelize, DataTypes) => {
    const Aluno = sequelize.define(
        'Aluno', {
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        img_perfil: DataTypes.STRING
    }, {
        tableName: "alunos",
        timestamps: false
    }
    )
    Aluno.associate = (models) => {
        // relação 1:n
        Aluno.belongsToMany(models.Disciplina, {
            as: "notas",
            through: "alunos_disciplinas",
            foreignKey: 'disciplinas_id',
            otherKey: "alunos_id",
        },{
                 // check se funciona com hendy ou iago
            notas: DataTypes.INTEGER 
        });
    }
    return Aluno;
}
