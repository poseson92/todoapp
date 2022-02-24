const sequelize = require("sequelize");
const Todo = require("../models/todo");
const { like } = sequelize.Op;

exports.searchTodo = async (req, res, next) => {
  try {
    const keyword = req.query.contents;
    const search = await Todo.findAll({
      where: { contents: { [like]: `%${keyword}%` } },
    });
    if (!keyword || search.length === 0) {
      return res.status(401).json({ message: "일치하는 검색 내용 없음" });
    }
    return res.status(201).json({ ok: true, message: "검색 완료", search });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
