const { HasMany } = require("sequelize/types")

module.exports = (sequelize, DataTypes) => {
    const Modulo = sequelize.define(
        'Modulo', {
        nome: DataTypes.STRING
    }, {
        tableName: 'modulos',
        timestamps: false
    }
    )

    Modulo.associate = (models) => {
        //varias disciplinas para um modulo
        Modulo.hasMany(models.Disciplina, {as: "disciplinas", foreignKey: 'modulos_id'});
        //um professor para um modulo
        Modulo.belongsTo(models.Professor, {as: 'professor', foreignKey:'modulos_id'});
    }

    return Modulo;
}
