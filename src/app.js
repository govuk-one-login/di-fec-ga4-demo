const express = require("express");
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

app.get("/service-description", (req, res) => {
  res.render("serviceDescription.njk"); // free text
});

app.get("/organisation-type", (req, res) => {
  res.render("organisationType.njk"); // radio button
});

app.get("/help-request", (req, res) => {
  res.render("helpRequest.njk"); // checkbox
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
