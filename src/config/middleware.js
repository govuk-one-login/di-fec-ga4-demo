const checkSessionAndRedirect = (req, res, next) => {
  // Check if the user has an active session
  const hasSession =
    req.session &&
    req.session.userSession &&
    req.session.userSession.startedJourney;

  // Check if the user is on the homepage
  const isOnHomepage = req.path === "/welcome";

  // If the user is on the Home Page and does not have a session, set it
  if (isOnHomepage && !hasSession) {
    req.session.userSession = {
      startedJourney: true,
    };
  }

  // If the user doesn't have a session and is not on the homepage, redirect to Journey Guard Page but if entering on / take them to welcome page
  if (!hasSession && !isOnHomepage) {
    return res.render("journeyGuard.njk");
  }
  // If the user has a session and the path is / redirect to Home Page path which is "/welcome"
  if (hasSession && req.path === "/") {
    return res.redirect("/welcome");
  }

  next();
};
module.exports = { checkSessionAndRedirect };
