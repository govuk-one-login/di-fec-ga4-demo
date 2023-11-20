const { GA4_CONTAINER_ID } = require("./constants");

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

// Middleware to instantiate the values for taxonomy levels 1 and 2  and pageTitle for the On Page Load tracker
const setTaxonomyValues =
  (pageTitle, taxLevel1, taxLevel2) => (req, res, next) => {
    console.log("Middleware executed:", { pageTitle, taxLevel1, taxLevel2 });
    res.locals.englishPageTitle = pageTitle;
    res.locals.taxonomyLevel1 = taxLevel1;
    res.locals.taxonomyLevel2 = taxLevel2;
    next(); // Pass control to the next middleware function
  };

module.exports = { setGa4ContainerId, setStatusCode, setTaxonomyValues };
