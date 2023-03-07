const Router = require("express");
const controler = require("../controlers/auth");

const router = new Router();

router.post('/api/user/registration', controler.register);
router.post('/api/user/login', controler.login);
router.get('/api/user/getUsers', controler.getUsers)

module.exports = router