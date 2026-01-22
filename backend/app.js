const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth.routes.js');
const taskRoutes = require('./routes/task.routes.js');
const subTaskRoutes = require('./routes/subTask.routes.js');
const ExpressError = require('./utils/expressError.js');
const cors = require('cors');
const path = require('path');

console.log(`this is the api key of sendgrid ${process.env.SEND_GRID_API_KEY}`);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});


app.use('/api/auth' , authRoutes);

app.use('/api/tasks' , taskRoutes);

app.use('/api/tasks/:id/subtask' , subTaskRoutes);



app.all("/{*any}", (req, res, next) => {
  throw new ExpressError(404, "Page Not Found");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).send(message);
});


