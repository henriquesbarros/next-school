module.exports = (sequelize, DataTypes) => {
    const Adm = sequelize.define(
        'Adm', {
        codigo: DataTypes.STRING,
        senha: DataTypes.STRING
      
    }, {
        tableName: "adm",
        timestamps: false
    }
    )
    return Adm;
}