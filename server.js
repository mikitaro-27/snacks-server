const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')
const refreshCompletedReps = require('./models/scheduler') 

connectDB();


// Jobs
// Deletes completedReps everyday, every 5s for now
refreshCompletedReps()

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

// logs what port is the server running on
app.listen(port, () => console.log(`Server started on port ${port}`));
