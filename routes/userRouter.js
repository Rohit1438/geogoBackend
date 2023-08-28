const { Router } = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  console.log("coming in userroute");
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    const newPassword = await bcrypt.hash(password, 5);
    if (!user) {
      const newUser = await User.create({
        username,
        email,
        password: newPassword,
      });

      res.status(200).json({ message: "Registration succesfull" });
    } else {
      console.log(" presendt");
      res.status(400).json({ message: "User is already registered" });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { username,email, password } = req.body;

    const user = await User.findOne({ email });
// console.log(email,password)
// console.log(user)
    if (!user) {
      res.status(200).json({ message: "First sign up" });
    } else {
      console.log(user);
      const verify = await bcrypt.compare(password, user.password);

      if (!verify) {
        res.status(401).json({ message: "incorrect password" });
      } else {
        const token = jwt.sign(
          { userId: user._id, username: username },
          "rohit"
        );

        res.status(200).json({ token: token });
      }
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = userRouter;
