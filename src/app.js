const express = require("express");
const path = require("path");
const session = require("express-session");
const { configureNunjucks } = require("./config/nunjucks");
const validateForm = require("./validateForm");
const crypto = require("crypto");
const sessionId = crypto.randomBytes(16).toString("hex");
const {
  setGa4ContainerId,
  setStatusCode,
  setTaxonomyValues,
  setPageTitle,
  setContentId,
} = require("./config/gtmMiddleware");
const { checkSessionAndRedirect } = require("./config/middleware");
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
app.use(
  session({
    secret: sessionId, // Should I make this more secure?
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(setGa4ContainerId);
app.use(setStatusCode);
app.use(setTaxonomyValues);
app.use(setPageTitle);
app.use(setContentId);
app.use(checkSessionAndRedirect);

app.get("/welcome", (req, res) => {
  res.render("home.njk");
});

app.get("/enter-email", (req, res) => {
  res.render("enterEmail.njk");
});
app.get("/service-description", (req, res) => {
  res.render("serviceDescription.njk"); // free text
});

app.get("/organisation-type", (req, res) => {
  res.render("organisationType.njk"); // radio button
});

app.get("/help-with-hint", (req, res) => {
  res.render("helpWithHint.njk"); // checkbox
});

app.get("/choose-location", (req, res) => {
  res.render("chooseLocation.njk"); // select
});

app.get("/summary-page", (req, res) => {
  res.render("summaryPage.njk");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/validate-organisation-type", (req, res) => {
  const result = validateForm(
    req.body.organisationType,
    req.query,
    "/help-with-hint"
  );
  const renderOptions = {
    showError: result.showError,
  };

  if (result.showError) {
    res.render("organisationType.njk", renderOptions);
  } else if (result.summaryPage) {
    res.redirect(result.summaryPage);
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});

app.post("/validate-help-with-hint", (req, res) => {
  const result = validateForm(
    req.body.helpWithHint,
    req.query,
    "/service-description"
  );

  const renderOptions = {
    showError: result.showError,
  };

  if (result.showError) {
    res.render("helpWithHint.njk", renderOptions);
  } else if (result.summaryPage) {
    res.redirect(result.summaryPage);
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});

app.post("/validate-service-description", (req, res) => {
  const result = validateForm(
    req.body.serviceDescription,
    req.query,
    "/choose-location"
  );

  const renderOptions = {
    showError: result.showError,
  };

  if (result.showError) {
    res.render("serviceDescription.njk", renderOptions);
  } else if (result.summaryPage) {
    res.redirect(result.summaryPage);
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});

app.post("/validate-choose-location", (req, res) => {
  const result = validateForm(
    req.body.chooseLocation,
    req.query,
    "/enter-email"
  );

  const renderOptions = {
    showError: result.showError,
  };

  if (result.showError) {
    res.render("chooseLocation.njk", renderOptions);
  } else if (result.summaryPage) {
    res.redirect(result.summaryPage);
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});

app.post("/validate-enter-email", (req, res) => {
  const result = validateForm(req.body.enterEmail, req.query, "/summary-page");

  const renderOptions = {
    showError: result.showError,
  };

  if (result.showError) {
    res.render("enterEmail.njk", renderOptions);
  } else if (result.summaryPage) {
    res.redirect(result.summaryPage);
  } else if (result.redirect) {
    res.redirect(result.redirect);
  }
});
