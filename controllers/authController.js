const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
// const { sequelize } = require("../models/index");
// const { QueryTypes } = require("sequelize");

const User = require("../models/user");
const Todo = require("../models/todo");

exports.signup = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const existUserId = await User.findOne({ where: { userId } });
    if (existUserId) {
      return res.status(400).json({ error: "아이디가 존재합니다" });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      userId,
      password: hash,
    });
    res.status(200).json({ ok: true, message: "회원가입 성공" });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  const { userId, password } = req.body;
  const commenter = await User.findOne({
    where: { userId },
    attributes: { exclude: ["userId", "password"] },
  });
  try {
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      return res.status(400).json({ error: "사용자가 존재하지 않습니다" });
    }
    const hashedpassword = await bcrypt.compare(password, user.password);
    if (!hashedpassword) {
      return res.status(400).json({ error: "비밀번호가 일치하지 않습니다" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });
    const countTodo = await Todo.findAll({
      attributes: {
        include: [[sequelize.fn("COUNT", sequelize.col("id")), "count_contents"]],
        exclude: ["id", "userId", "contents", "check", "color", "commenter"],
      },
    });
    return res.json({ ok: true, message: "로그인 성공", token, userId, commenter, countTodo });
  } catch (err) {
    console.log(err);
  }
};
