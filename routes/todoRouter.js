const express = require("express");
const { getTodo, postTodo, updateTodo, deleteTodo } = require("../controllers/todoController");
const router = express.Router();

router.get("/:userId", getTodo);
router.post("/:userId", postTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
