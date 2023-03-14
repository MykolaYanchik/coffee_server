const UserService = require("../service/userService");

const timeRefreshToken = 30 * 24 * 60 * 60 * 1000;

class authControler {
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const userData = await UserService.registration(email, password, name);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: timeRefreshToken,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: timeRefreshToken,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: timeRefreshToken,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new authControler();
