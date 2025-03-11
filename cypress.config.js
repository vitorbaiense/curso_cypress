const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "v6awg6",
  e2e: {
    supportFile: "support/e2e.js",
    // supportFile: false,
  },
  // reporter: 'mochawesome',
  //   reporterOptions: {
  //     reportDir: 'curso_cypress/results',
  //     overwrite: false,
  //     html: false,
  //     json: true,
  //     timestamp: "mmddyyyy_HHMMss" 
  //   }
});
