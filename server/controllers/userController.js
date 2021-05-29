const { User } = require("../models");
const checkPassword = require("../helpers/checkHashedPassword");
const { generateToken } = require("../helpers/jwt");

class userController {
  static async register(req, res, next) {
    try {
      const { username, email, password, userDesc, userImage, location } = req.body;
      const user = await User.create({ username, email, password, userDesc, userImage, location });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      console.log(err, "<<<<<");
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { status: 404, message: "Invalid Email / Password" };
      } else {
        const isPasswordMatch = checkPassword(password, user.password);
        if (!isPasswordMatch) {
          throw { status: 404, message: "Invalid Email / Password" };
        } else {
          const token = generateToken({
            id: user.id,
            email: user.email,
          });
          res.status(200).json({ id: user.id, email: user.email, access_token: token });
        }
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { userDesc, userImage, location } = req.body;
      const user = await User.findByPk(req.loggedUser.id);
      if (!user) {
        throw { status: 401, message: "Unauthorized" };
      } else {
        await User.update({ userDesc, userImage, location }, { where: { id: user.id } });
        res.status(200).json({ message: "User profile has been updated" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
