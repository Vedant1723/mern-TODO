const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(require("cors")());

//Init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use("/api/auth", require("./routes/api/auth")); //localhost:5000/api/auth
app.use("/api/user", require("./routes/api/user")); //localhost:5000/api/user
app.use("/api/task", require("./routes/api/task")); //localhost:5000/api/task

app.listen(PORT, () => {
  console.log("Server Connected on PORT : ", PORT);
});
