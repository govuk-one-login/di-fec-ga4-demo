const validateForm = (formData, nextPage) => {
  if (formData.length == 0) {
    console.log(`Error: No option selected. Setting showError to true.`);
    return { showError: true };
  } else {
    console.log(`Option selected. Redirecting to ${nextPage}`);
    return { redirect: nextPage };
  }
};

module.exports = validateForm;
