const validateForm = (formData, reqQuery, nextPage) => {
  const queryParams = reqQuery;
  const editMode = queryParams.editMode;

  if (!formData || !formData.length) {
    console.log(`Error: No option selected. Setting showError to true.`);
    return { showError: true };
  } else if (editMode) {
    console.log(`Option selected. Redirecting to summary page`);
    return { summaryPage: "/summary-page" };
  } else {
    console.log(`Option selected. Redirecting to ${nextPage}`);
    return { redirect: nextPage };
  }
};

module.exports = validateForm;
