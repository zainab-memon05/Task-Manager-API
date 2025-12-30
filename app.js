const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth.routes.js');
const taskRoutes = require('./routes/task.routes.js');
const ExpressError = require('./utils/expressError.js');





app.use(express.urlencoded({ extended: true }));
app.use(express.json());


main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/TaskManager");
}

app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});


app.use('/api/auth' , authRoutes);

app.use('/api/tasks' , taskRoutes);



app.all("/{*any}", (req, res, next) => {
  throw new ExpressError(404, "Page Not Found");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).send(message);
});
