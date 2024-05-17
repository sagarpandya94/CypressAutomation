const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");


async function setupNodeEvents(on,config){
  // implement node event listeners here
  require('cypress-mochawesome-reporter/plugin')(on);

  await preprocessor.addCucumberPreprocessorPlugin(on,config);
  on("file:preprocessor",browserify.default(config));

  return config;
}

module.exports = defineConfig({
  projectId: "ovusec",
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter',
  env:{
    url:"https://rahulshettyacademy.com"
  },
  retries:{
    runMode: 1
  },
  e2e: {
    setupNodeEvents,
//    specPattern: 'cypress/integration/examples/BDD/*.feature'
      specPattern: 'cypress/integration/examples/*.js'
},
  
});
