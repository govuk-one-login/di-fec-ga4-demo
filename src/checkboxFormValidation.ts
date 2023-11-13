export function validateHelpRequest(req, res) {
  const selectedHelpRequest = req.body.helpWithHint;
  if (!selectedHelpRequest) {
    console.log("Error: No option selected. Setting showError to true.");
    return { showError: true };
  } else {
    console.log("Option selected. Redirecting to /service-description");
    return { redirect: "/service-description" };
  }
}
