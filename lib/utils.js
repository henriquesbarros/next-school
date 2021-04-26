module.exports = {
    modulo: function(modulo_id) {
        switch (modulo_id) {
            case 1:
                return "FRONT-END"
            case 2:
                return "BACK-END"
            case 3:
                return "BANCO DE DADOS"
            default:
                return "Módulo não especificado."
        }
    },
    disciplina: function(disciplina_id) {
        switch (disciplina_id) {
            case 1:
                return "HTML"
            case 2:
                return "CSS"
            case 3:
                return "JAVASCRIPT"
            case 4:
                return "REACT"
            default:
                return "Disciplina não especificada."
        }
    }
}