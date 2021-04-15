module.exports = (sequelize, DataTypes) => {

    const Professor = sequelize.define(
        'Professor',{
            nome: DataTypes.STRING,
            senha_professor: DataTypes.STRING,
            cpf: DataTypes.STRING,
            img_perfil: DataTypes.STRING,
            modulos_id: DataTypes.INTEGER
        },
        {
            tableName: 'professores',
            timestamps: false
        }
    )
    Post.associate = (models) => {
        // relação N:1 (vários posts de 1 usuario)
       Post.belongsTo(models.Modulo, { as: "modulo", foreignKey: "modulos_id" });
    }
    return Professor;

}