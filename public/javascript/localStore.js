// (function (DI) {
//   const getOrganisationType = () => {
//     if (typeof localStorage !== "undefined") {
//       const organisationType = localStorage.getItem("organisationType");

//       if (!organisationType) {
//         return "Unknown";
//       }

//       const options = {
//         governmentDepartmentOrMinistry: "Government department or Ministry",
//         executiveAgency: "Executive Agency",
//         armsLengthBody: "Arms length body",
//         other: "Other",
//       };

//       return options[organisationType.toString()];
//     } else {
//       return "unknown";
//     }
//   };

//   module.exports = { getOrganisationType };
// });

const organisationTypes = {
  governmentDepartmentOrMinistry: "Government department or Ministry",
  executiveAgency: "Executive Agency",
  armsLengthBody: "Arms length body",
  other: "Other",
};
