const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const TokenService = require("./tokenService");
const ApiError = require("../utils/error");
class UserService {
  async registration(email, password, name) {
    const uniqueEmail = await UserModel.findOne({ email });
    const uniqueName = await UserModel.findOne({ name });
    if (uniqueEmail || uniqueName) {
      throw new ApiError(400, "Користувач з такими даними вже існує.");
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await UserModel.create({
      email,
      password: hashPassword,
      name,
    });

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    const tokens = TokenService.generateTokens({ ...payload });

    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(400, "Користувача з такими email не знайдено.");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new ApiError(400, "Невірний пароль.");
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    const tokens = TokenService.generateTokens({ ...payload });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new ApiError(401, "Користувач не авторизований.");
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);
    
    if (!userData || !tokenFromDB) {
      throw new ApiError(401, "Користувач не авторизований.");
    }
    const user = await UserModel.findById(userData.id);

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    const tokens = TokenService.generateTokens({ ...payload });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }
}

module.exports = new UserService();
