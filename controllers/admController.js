const admController = {
    login: (req, res) => {
        return res.render('admin/login')
    },
    auth: (req, res) => {
        return res.send("Página de autenticação do login!")
    },
    select: (req, res) => {
        return res.render('admin/select')
    }
}

module.exports = admController