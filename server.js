const express = require('express');
const app = express();
const connectDB = require("./config/connection");
require("dotenv").config();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const userRouter = require("./routes/userRoutes");
const recipeRouter = require("./routes/recipeRoutes");
const memoryRouter = require("./routes/memoryRoutes");

connectDB();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/memories', memoryRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});