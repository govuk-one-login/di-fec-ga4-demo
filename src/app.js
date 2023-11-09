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
    path.join(__dirname, "../node_modules/govuk-frontend/govuk/assets")
  )
);

/**GA4 assets */
app.use(
  "/ga4-assets",
  express.static(path.join(__dirname, "../node_modules/one-login-ga4/lib"))
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.njk", { ga4ContainerId: "GTM-KD86CMZ" });
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
