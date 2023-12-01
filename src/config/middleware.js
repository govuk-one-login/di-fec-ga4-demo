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
    console.log(
      `user has no session but is on the HP , so lets set the session id`
    );
    req.session.userSession = {
      startedJourney: true,
    };
  }

  // If the user doesn't have a session and is not on the homepage, redirect to Journey Guard Page but if entering on / take them to welcome page
  if (!hasSession && !isOnHomepage) {
    if (req.path === "/") {
      console.log(
        `user is not on HP and does not have a session, the path is ${req.path} so lets redirect to welcome`
      );
      return res.redirect("./welcome");
    } else {
      console.log(
        `user is not on HP and does not have a session, the path is ${req.path}`
      );
      return res.render("journeyGuard.njk");
    }
  }
  // If the user has a session and the path is / redirect to Home Page path which is "/welcome"
  if (hasSession && req.path === "/") {
    console.log(
      `user has session but the path is ${req.path}, let redirect to /welcome`
    );
    return res.redirect("/welcome");
  }

  if (!hasSession && req.path === "/") {
    console.log(
      `user has no session but the path is ${req.path}, let redirect to /welcome`
    );
    return res.redirect("/welcome");
  }

  next();
};
module.exports = { checkSessionAndRedirect };
