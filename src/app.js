const express = require("express");
const path = require("path");
const { configureNunjucks } = require("./config/nunjucks");
const validateForm = require("./validateForm");
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
app.use(express.urlencoded({ extended: true }));

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
app.get("/choose-location", (req, res) => {
  res.render("chooseLocation.njk"); // select
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/validate-organisation-type", (req, res) => {
  const result = validateForm(req.body.organisationType, "/help-request");
  if (result.showError) {
    res.render("organisationType.njk", { showError: true });
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});

app.post("/validate-help-request", (req, res) => {
  const result = validateForm(req.body.helpWithHint, "/service-description");
  if (result.showError) {
    res.render("helpRequest.njk", { showError: true });
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});
app.post("/validate-service-description", (req, res) => {
  const result = validateForm(req.body.serviceDescription, "/");
  if (result.showError) {
    res.render("serviceDescription.njk", { showError: true });
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});

app.post("/validate-choose-location", (req, res) => {
  const result = validateForm(req.body.chooseLocation, "/");
  if (result.showError) {
    res.render("chooseLocation.njk", { showError: true });
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});
