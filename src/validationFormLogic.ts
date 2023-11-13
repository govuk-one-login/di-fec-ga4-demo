export function validateOrganisationType(selectedOrganisationType: string) {
  if (!selectedOrganisationType) {
    console.log("Error: No option selected. Setting showError to true.");
    return { showError: true };
  } else {
    console.log("Option selected. Redirecting to /help-request.");
    return { redirect: "/help-request" };
  }
}
