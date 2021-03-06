const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { sequelize } = require("./models");
const authRouter = require("./routes/authRouter");
const todoRouter = require("./routes/todoRouter");
const searchRouter = require("./routes/searchRouter");

const app = express();
app.set("port", 4000);

// config에서 sequelize 불러와서 sync로 연결
sequelize
  .sync({ force: false }) // true : 테이블이 날아갔다 다시 생김.(기존 테이블 저장 안됨.)
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/todo", todoRouter);
app.use("/", searchRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
