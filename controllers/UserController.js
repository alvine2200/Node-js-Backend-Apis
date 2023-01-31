const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const Register = async (req, res) => {
  try {
    if (
      req.body.name === "" ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      return res
        .status(500)
        .json({ status: "failed", msg: "Please fill all fields..." });
    }

    const isExisting = await UserModel.findOne({ email });
    if (isExisting) {
      return res
        .status(500)
        .json({ status: "failed", msg: "Email already exists..." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const { password, ...others } = user._doc;
    const token = await createToken(others);

    return res.status(201).json({
      status: "success",
      msg: "User created successfully",
      token: token,
      data: others,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", msg: "Something went wrong, try again..." });
  }
};

const Login = async (req, res) => {
  try {
    if (req.body.email === "" || req.body.password === "") {
      return res
        .status(500)
        .json({ status: "failed", msg: "Please fill all fields..." });
    }
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(500)
        .json({ status: "failed", msg: "Email Not Found..." });
    }
    const Ismatch = await bcrypt.compare(req.body.password, user.password);
    if (!Ismatch) {
      return res.status(500).json({
        status: "failed",
        msg: "Password/Email are Wrong, try again...",
      });
    }
    const { password, ...others } = user._doc;
    const token = await createToken(others);
    return res.status(200).json({
      status: "success",
      msg: "User Login successfully",
      token: token,
      data: others,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      msg: "Something went wrong, try again...",
    });
  }
};

const createToken = async (user) => {
  const token = await jwt.sign(
    { id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );
  return token;
};

module.exports = { Register, Login };
