const express = require("express");
const { searchTodo } = require("../controllers/searchController");
const router = express.Router();

router.get("/search", searchTodo);

module.exports = router;
