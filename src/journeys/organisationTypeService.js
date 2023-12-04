function validateOrganisationType(req, res) {
  try {
    const { organisationType } = req.body;
    const queryParams = req.query;
    const editMode = queryParams.editMode;

    if (
      organisationType === "Government department or Ministry" ||
      organisationType === "Executive Agency" ||
      organisationType === "Arms length body" ||
      organisationType === "Other"
    ) {
      // Check if in edit mode and redirect accordingly
      if (editMode) {
        res.redirect("/summary-page");
      } else {
        res.redirect("/help-with-hint");
      }
    } else {
      res.render("organisationType.njk", {
        showError: true,
        // Add any other variables needed in your template
      });
    }
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error for debugging purposes
  }
}

module.exports = { validateOrganisationType };
