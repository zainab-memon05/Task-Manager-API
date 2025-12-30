const User = require('../models/users.models.js');
const jwt = require('jsonwebtoken');
const ExpressError = require('../utils/expressError.js');

module.exports.Registration = async (req, res, next) => {
    let { email } = req.body.user;
    let existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      let users = new User(req.body.user);
      await users.save();
      res.status(200).send("User Registered Successfully !");
    } else {
      throw new ExpressError(409, "User already exits with this email");
    }
  };


module.exports.Login = async (req, res) => {
    let { email, password } = req.body.user;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send("invalid email or password");
    }

    let match = await user.passwordMatch(password);
    if (!match) {
      return res.status(401).send("invalid email or password");
    }

    if (user && match) {
      const payload = { id: user._id, name: user.name, email: user.email };

      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "12h",
      });

      return res.json({ token });
    }
  };

