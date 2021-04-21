const admController = {
    login: (req, res) => {
        return res.send("Página de login ADM.")
    },
    select: (req, res) => {
        return res.send("Página de seleção.")
    }
}

module.exports = admController