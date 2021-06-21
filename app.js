const express = require("express");
const app = express();
const cors = require("cors");
const budgetController = require('./controllers/budgetController.js')


app.use((req,res, next) => {
    console.log(`[development] Middleware is running!`);
    next();
})

app.use(express.json()); // returns middleware that only parses JSON
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Budgeting app!");
});

app.use("/budgets", budgetController);

app.get("*", (req, res) => {
    res.status(404).send('Page not found')
});

module.exports = app;
