const { GA4_CONTAINER_ID } = require("./constants");
const { ROUTE_INFO } = require("./constants");

// This function makes sure that the GA4 Container ID is accessible to all pages, so we don't have to repeat it in every route

const setGa4ContainerId = (req, res, next) => {
  //     Set the GA4 Container ID in (locals) that all pages can see.
  res.locals.ga4ContainerId = GA4_CONTAINER_ID;
  next(); // Pass control to the next middleware function
};

// Middleware to instantiate the status code for the On Page Load tracker
const setStatusCode = (req, res, next) => {
  res.locals.statusCode = res.statusCode;
  next();
};

// Middleware to instantiate the values for taxonomy levels 1 and 2 for the On Page Load tracker
const setTaxonomyValues = (req, res, next) => {
  const url = req.url;
  const pathFound = ROUTE_INFO.find((route) => route.path === url);
  if (pathFound) {
    res.locals.taxonomyLevel1 = pathFound.taxonomyLevel1 || "undefined";
    res.locals.taxonomyLevel2 = pathFound.taxonomyLevel2 || "undefined";
  } else {
    console.log("Path not found");
    res.locals.taxonomyLevel1 = "undefined";
    res.locals.taxonomyLevel2 = "undefined";
  }

  next();
};

// Middleware to instantiate the value for the pageTitle for the On Page Load tracker
const setPageTitle = (req, res, next) => {
  const url = req.url;
  console.log(url);
  const pathFound = ROUTE_INFO.find((route) => route.path === url);
  if (pathFound) {
    res.locals.englishPageTitle = pathFound.pageTitle || "undefined";
  } else {
    console.log("Path not found");
    res.locals.englishPageTitle = "undefined";
  }

  next();
};

const checkSessionAndRedirect = (req, res, next) => {
  console.log("Middleware executed");
  // Check if the user has an active session
  const hasSession =
    req.session &&
    req.session.userSession &&
    req.session.userSession.startedJourney;

  console.log("User Session:", hasSession);

  // Check if the user is on the homepage
  const isOnHomepage = req.path === "/welcome";

  // If the user is on the Home Page and does not have a session, set it
  if (isOnHomepage && !hasSession) {
    console.log("Setting session for the homepage");
    req.session.userSession = {
      startedJourney: true,
    };
  }

  // If the user doesn't have a session and is not on the homepage, redirect to Journey Guard Page
  if (!hasSession && !isOnHomepage) {
    console.log("Redirecting to Journey Guard");
    return res.render("journeyGuard.njk");
  }

  next();
};
module.exports = {
  setGa4ContainerId,
  setStatusCode,
  setTaxonomyValues,
  setPageTitle,
  checkSessionAndRedirect,
};
