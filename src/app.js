const express = require("express");
const path = require("path");
const { configureNunjucks } = require("./config/nunjucks");
const validateForm = require("./validateForm");
const { GA4_CONTAINER_ID } = require("./config/constants");
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
  res.render("home.njk", { ga4ContainerId: GA4_CONTAINER_ID });
});

app.get("/service-description", (req, res) => {
  res.render("serviceDescription.njk", { ga4ContainerId: GA4_CONTAINER_ID }); // free text
});

app.get("/organisation-type", (req, res) => {
  res.render("organisationType.njk", { ga4ContainerId: GA4_CONTAINER_ID }); // radio button
});

app.get("/help-request", (req, res) => {
  res.render("helpRequest.njk", { ga4ContainerId: GA4_CONTAINER_ID }); // checkbox
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/validate-organisation-type", (req, res) => {
  const result = validateForm(req.body.organisationType, "/help-request");
  const renderOptions = {
    showError: result.showError,
    ga4ContainerId: GA4_CONTAINER_ID,
  };
  if (result.showError) {
    res.render("organisationType.njk", renderOptions);
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});

app.post("/validate-help-request", (req, res) => {
  const result = validateForm(req.body.helpWithHint, "/service-description");
  const renderOptions = {
    showError: result.showError,
    ga4ContainerId: GA4_CONTAINER_ID,
  };
  if (result.showError) {
    res.render("helpRequest.njk", renderOptions);
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});

app.post("/validate-service-description", (req, res) => {
  const result = validateForm(req.body.serviceDescription, "/");
  const renderOptions = {
    showError: result.showError,
    ga4ContainerId: GA4_CONTAINER_ID,
  };
  if (result.showError) {
    res.render("serviceDescription.njk", renderOptions);
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});
