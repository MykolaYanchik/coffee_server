const Router = require("express");
const controler = require("../controlers/auth");

const router = new Router();

router.post("/user/registration", controler.register);
router.post("/user/login", controler.login);
router.post("/user/logout", controler.logout);
router.get("/user/refresh", controler.refresh);

module.exports = router;
