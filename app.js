const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { sequelize } = require("./models");
const authRouter = require("./routes/authRouter");

const app = express();
app.set("port", 4000);

// config에서 sequelize 불러와서 sync로 연결
sequelize
  .sync({ force: false })
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

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
