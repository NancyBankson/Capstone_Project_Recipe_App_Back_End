const express = require('express');
const app = express();
const connectDB = require("./config/connection");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const userRouter = require("./routes/userRoutes");
const projectRouter = require("./routes/projectRoutes");
const taskRouter = require("./routes/taskRoutes");

connectDB();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});