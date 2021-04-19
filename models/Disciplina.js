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

    Disciplina.associate = (models) => {
        // relação 1:n
        Disciplina.hasMany(models.alunoDisciplina, {as: "alunos", foreignKey: 'disciplinas_id'});
        // relação N:1
        Disciplina.belongsTo(models.Modulo, {as: "modulo", foreignKey: 'modulos_id'});    
    }
    return Disciplina;
} 