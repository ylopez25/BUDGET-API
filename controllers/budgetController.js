const express = require("express");
const budgets = express.Router();
const budgetsArray = require("../models/budget.js");

const validateUrl = (req, res, next) => {
  const http = "http://";
  const https = "https://";
  var fullUrl = req.protocol + "://" + req.get("host") + req.url;
  console.log(`[development] Request URL: ${fullUrl}`);
  if (fullUrl.substring(0, 7) === http || fullUrl.substring(0, 8) === https) {
    return next();
  } else {
    res.status(400).send(`Oops, you forgot to start your url with http:// or https://`);
  }
};

const validateBody = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send();
  }
  next();
};

budgets.use(validateUrl);

budgets.get("/", (req, res) => {
  res.status(200).json(budgetsArray);
});

budgets.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (budgetsArray[arrayIndex]) {
    res.json(budgetsArray[arrayIndex]);
  } else {
    res.redirect("/404");
  }
});

budgets.post("/", validateBody, (req, res) => {
  budgetsArray.push(req.body);
  res.json(budgetsArray[budgetsArray.length - 1]);
});

budgets.put("/:index", validateBody, (req, res) => {
  const { index } = req.params;
  if (budgetsArray[index]) {
    budgetsArray[index] = req.body;
    res.json(budgetsArray[index]);
  } else {
    res.redirect("/404");
  }
});

budgets.delete("/:index", (req, res) => {
  const { index } = req.params;
  if (budgetsArray[index]) {
    const deleted = budgetsArray.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.redirect("/404");
  }
});

module.exports = budgets;
