const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "v6awg6",
  e2e: {
    baseUrl: 'https://mobile.webpdv.msap-integrado.qa.simonettidev.com.br/',
    pageLoadTimeout: 120000, // 120 segundos
    chromeWebSecurity: false,
    supportFile: "support/e2e.js",
    // supportFile: false,
  },

  // reporter: 'mochawesome',
  // reporterOptions: {
  //   reportDir: 'curso_cypress/results',
  //   overwrite: false,
  //   html: false,
  //   json: true,
  //   timestamp: "mmddyyyy_HHMMss" 
  // }
});
