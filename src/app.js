const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const { configureNunjucks } = require("./config/nunjucks");
const app = express();
const port = 3000;

const APP_VIEWS = [
  path.join(__dirname, "views"),
  path.resolve("node_modules/govuk-frontend/"),
  path.resolve("node_modules/@govuk-prototype-kit/templates"),
];

app.set("view engine", configureNunjucks(app, APP_VIEWS));
app.use(
  "/assets",
  express.static(
    path.join(__dirname, "/node_modules/govuk-frontend/govuk/assets"),
  ),
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.njk");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
