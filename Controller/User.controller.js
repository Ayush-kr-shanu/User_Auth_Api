const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Model/user.model");

require("dotenv").config();

const UserController = {
  async register(req, res) {
    const { name, email, password } = req.body;
    try {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(401).json({ msg: "User already Exist" });
      } else if (!name || !email || !password) {
        return res.status(401).json({ msg: "All details are mandatory" });
      }

      const salt = await bcrypt.genSalt(11);
      const hashedPass = await bcrypt.hash(password, salt);

      const user = await User.create({ name, email, password: hashedPass });

      return res
        .status(201)
        .json({ msg: "User registered successfully", user });
    } catch (err) {
      return res
        .status(500)
        .json({
          msg: "Something went wrong in registering user",
          error: err.message,
        });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.name, userEmail: user.email },
        process.env.JWT_CODE,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });

      return res
        .status(201)
        .json({ msg: "Logged in successfully", Token: token, user });
    } catch (err) {
      return res.status(500).json({ msg: "Server error", err: err.message });
    }
  },
};

module.exports=UserController
