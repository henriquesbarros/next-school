

module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define(
        'Aluno', {
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        img_perfil: DataTypes.STRING,
        modulos_id: DataTypes.INTEGER
    }, {
        tableName: "alunos",
        timestamps: false
    }
    )

     // To create a One - To - One relationship, the hasOne and belongsTo associations are used together;
    // To create a One - To - Many relationship, the hasMany and belongsTo associations are used together;
    // To create a Many - To - Many relationship, two belongsToMany calls are used together

    Aluno.associate = (models) => {
        Aluno.hasMany(models.AlunoDisciplina,{ as: "notas", foreignKey: "alunos_id" })
    }
    return Aluno;
}
//show: async (req, res) => {
        //
        // let alunosEncontrados = await sequelize.query()
