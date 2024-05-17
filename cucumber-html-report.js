const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./cypress/CucumberReports",
  reportPath: "./cypress/CucumberReports/cucumber-htmlreport.html",
  metadata: {
    browser: {
      name: "chrome",
      version: "60.x",
    },
    device: "Local test machine",
    platform: {
      name: "Windows",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Cypress Automation" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" }
    ],
  },
});