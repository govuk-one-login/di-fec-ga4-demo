const express = require("express");
const path = require("path");
const session = require("express-session");
const { configureNunjucks } = require("./config/nunjucks");
const {
  validateOrganisationType,
} = require("./journeys/organisationTypeService");
const { validateHelpWithHint } = require("./journeys/helpWithHintService");
const {
  validateServiceDescription,
} = require("./journeys/serviceDescriptionService");
const { validateChooseLocation } = require("./journeys/chooseLocationService");
const { validateEnterEmail } = require("./journeys/enterEmailService");
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

app.post("/validate-organisation-type", validateOrganisationType);

app.post("/validate-help-with-hint", validateHelpWithHint);

app.post("/validate-service-description", validateServiceDescription);

app.post("/validate-choose-location", validateChooseLocation);

app.post("/validate-enter-email", validateEnterEmail);
