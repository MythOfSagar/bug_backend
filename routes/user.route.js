require("dotenv").config();
const { Router } = require("express");
const { UserModel } = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    bcrypt.hash(
      password,
      Number(process.env.SaltRounds),
      async function (err, hash) {
        if (err) {
          res.send("Error Occured Please try Again");
        } else {
          const newUser = new UserModel({ email, password: hash });

          await newUser.save();

          res.send("Account Creation Successfull");
        }
      }
    );
  } catch (err) {
    res.send("Error Occured Please try Again");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUserWithEmail = await UserModel.find({ email });
    if (findUserWithEmail.length > 0) {
      bcrypt.compare(
        password,
        findUserWithEmail[0].password,
        function (err, result) {
          if (result) {
            const token = jwt.sign(
              { user: findUserWithEmail._id },
              process.env.encryption
            );

            res.status(200).send({token});
          } else {
            res.status(400).send({"err":"Wrong Password"});
          }
        }
      );
    } else {
      res.status(400).send({"err":"Email Not Found"});
    }
  } catch (err) {
    res.send("Error Occured Please try Again");
  }
});

module.exports = { userRouter };
