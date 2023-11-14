const validateForm = (req, res, formType, nextPage) => {
  const formData = req.body[formType];
  if (!formData) {
    console.log(`Error: No option selected. Setting showError to true.`);
    return { showError: true };
  } else {
    console.log(`Option selected. Redirecting to ${nextPage}`);
    return { redirect: nextPage };
  }
};

module.exports = validateForm;
