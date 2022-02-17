const express = require("express");
const { getTodo, postTodo, updateTodo, deleteTodo } = require("../controllers/todoController");
const router = express.Router();

router.get("/", getTodo);
router.post("/", postTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
