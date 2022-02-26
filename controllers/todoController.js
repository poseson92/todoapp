const Todo = require("../models/todo");
const User = require("../models/user");
const sequelize = require("sequelize");
// const { sequelize } = require("../models/index");
// const { QueryTypes } = require("sequelize");

exports.getTodo = async (req, res, next) => {
  try {
    // const query = `SELECT t.contents, t.check, u.userId
    //               FROM todos as t
    //               inner join users as u
    //               on u.id = t.commenter
    //               where commenter = ${req.body.commenter}`;
    // const todo = await sequelize.query(query, { type: QueryTypes.SELECT });
    let page = req.query.page;
    let offset = 0;
    if (page > 1) {
      offset = 12 * (page - 1);
    }
    const todo = await Todo.findAll({
      where: {
        userId: req.params.userId,
      },
      offset: offset,
      limit: 12,
      // include: [{ model: User, required: true, attributes: ["userId"] }],
      // attributes: { exclude: ["id", "commenter"] },
    });
    const countTodo = await Todo.findAll({
      attributes: {
        include: [[sequelize.fn("COUNT", sequelize.col("id")), "count_contents"]],
        exclude: ["id", "userId", "contents", "check", "color", "commenter"],
      },
    });
    return res.status(201).json({ ok: true, todo, countTodo });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postTodo = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { userId: req.params.userId },
    });
    if (!user) {
      return res.status(401).json({ ok: false, error: "존재하지 않는 유저" });
    }
    const todo = await Todo.create({
      userId: req.body.userId,
      contents: req.body.contents,
      check: req.body.check,
      commenter: req.body.commenter,
      color: req.body.color,
    });
    const boolean = req.body.check;
    if (boolean !== 0 && boolean !== 1 && boolean !== true && boolean !== false) {
      return res.status(401).json({ ok: false, error: "0, 1, true, false 가능" });
    }
    return res.status(201).json({ ok: true, message: "작성 완료", todo });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const updateId = req.params.id;
    const body = req.body;
    const todo = await Todo.findOne({
      where: {
        id: updateId,
      },
    });
    if (!todo) {
      return res.status(401).json({ ok: false, error: "존재하지 않는 todo" });
    }
    await Todo.update(
      {
        contents: body.contents,
        check: body.check,
      },
      {
        where: { id: updateId },
      }
    );
    const user = await Todo.findOne({
      where: { id: updateId },
    });
    return res.status(201).json({ ok: true, message: "수정 완료", user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const updateId = req.params.id;
    const todo = await Todo.findOne({
      where: {
        id: updateId,
      },
    });
    if (!todo) {
      return res.status(401).json({ ok: false, error: "존재하지 않는 todo" });
    }
    await Todo.destroy({ where: { id: updateId } });
    return res.status(201).json({ ok: true, message: "삭제 완료" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
