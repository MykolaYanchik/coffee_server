class authControler {
    async register(req, res) {
        try {

        } catch(err) {
            console.log(err)
        }
    }

    async login(req, res) {
        try {

        } catch(err) {
            console.log(err)
        }
    }

    async getUsers(req, res) {
        try {
            res.json("users all")
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = new authControler()