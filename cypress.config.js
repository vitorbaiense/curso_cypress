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
  //     html: true,
  //     json: false,
  //     timestamp: "mmddyyyy_HHMMss" 
  //   }
});
