const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "v6awg6",
  e2e: {
    // baseUrl: 'https://mobile.webpdv.msap-integrado.qa.simonettidev.com.br/',
    pageLoadTimeout: 120000, // 120 segundos
    chromeWebSecurity: false,
    supportFile: "support/e2e.js",
    // supportFile: false,
    // video: true,             // <-- ativa gravação de vídeo
    videosFolder: "curso_cypress/videos", // pasta onde os vídeos ficam salvos
    screenshotOnRunFailure: true    // salva print em caso de falha
  },

  reporter: 'mochawesome',
  // reporterOptions: {
  //   reportDir: 'curso_cypress/results',
  //   overwrite: true,
  //   html: true,
  //   json: true,
  //   timestamp: "mmddyyyy_HHMMss" 
  // }
});
