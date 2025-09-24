const express = require("express");
const cors = require("cors");

const responseHandlers = require("./utils/handleResponses");
const connectDB = require("./utils/database");
const config = require("../config").api;

const userRouter = require("./user/user.router");
const authRouter = require("./auth/auth.router");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  responseHandlers.success({
    res,
    status: 200,
    message: "✅ Server started successfully",
    data: {
      users: `${config.host}/api/v1/users`,
    },
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  responseHandlers.error({
    res,
    status: 404,
    message: `URL not found, please try with ${config.host}`,
  });
});

app.listen(config.port, () => {
  console.log(`✅ Server started at http://localhost:${config.port}`);
});
