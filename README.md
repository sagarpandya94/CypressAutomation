# Cypress E2E Automation Framework

An end-to-end UI automation framework built with **Cypress** and **Cucumber (BDD)**, exercising a full e‑commerce user journey — browse, add to cart, validate the cart total, and complete checkout. Built as a hands‑on framework project to go beyond simple test scripts into the patterns a real suite needs: the Page Object Model, data‑driven testing, database validation, and rich HTML reporting.

> Application under test: the Rahul Shetty Academy practice e‑commerce site (`angularpractice` / `seleniumPractise`).

---

## What this framework demonstrates

- **Page Object Model (POM)** — page classes (`HomePage`, `ProductPage`, `CheckoutPage`) keep locators and page actions out of the specs, so tests read as behaviour rather than selectors.
- **BDD with Cucumber** — feature files and step definitions via `@badeball/cypress-cucumber-preprocessor`, so scenarios are written in business‑readable Gherkin.
- **Data‑driven testing** — test data sourced from Cypress fixtures, plus Excel (`exceljs`, `convert-excel-to-json`) and CSV (`neat-csv`). Includes custom tasks to **read and write Excel** at runtime.
- **Database validation** — SQL Server / Azure SQL integration through `cypress-sql-server`, so tests can assert against the database, not just the UI.
- **Custom commands & tasks** — e.g. a reusable `cy.selectProduct()` command and Node‑side `cy.task()` handlers for Excel and DB work.
- **End‑to‑end checkout flow** — adds multiple products, sums the line‑item amounts, and asserts the computed total matches the displayed order total before completing purchase.
- **iframe handling** — via `cypress-iframe`.
- **Resilience & cross‑browser** — automatic retries in run mode and headed/headless runs across Electron and Chrome.
- **Reporting** — `cypress-mochawesome-reporter` and `multiple-cucumber-html-reporter` for readable HTML runs.

---

## Tech stack

Cypress 13 · JavaScript · Cucumber (`@badeball/cypress-cucumber-preprocessor`) · Page Object Model · Mochawesome Reporter · Multiple‑Cucumber‑HTML‑Reporter · cypress‑sql‑server · ExcelJS · convert‑excel‑to‑json · neat‑csv · cypress‑iframe

---

## Project structure

```
CypressAutomation/
├── cypress/
│   ├── integration/examples/
│   │   ├── pageObjects/        # HomePage, ProductPage, CheckoutPage
│   │   ├── E2EFlow.js          # end-to-end e-commerce checkout spec
│   │   └── BDD/                # Cucumber .feature files + step definitions
│   ├── fixtures/               # test data (JSON)
│   ├── support/                # custom commands (e.g. selectProduct)
│   └── cucumberReports/        # generated Cucumber JSON/HTML
├── cypress.config.js           # config, env, node events, custom tasks
└── package.json                # scripts + dependencies
```

---

## Getting started

### Prerequisites
- Node.js 18+

### Install
```bash
npm install
```

### Configuration
Runtime values are read from `Cypress.env(...)`. Set the app URL and any database
connection details as environment variables or in a git‑ignored `cypress.env.json`
rather than hard‑coding them:

```json
{
  "url": "https://rahulshettyacademy.com",
  "db_user": "<from-env>",
  "db_password": "<from-env>",
  "db_server": "<from-env>",
  "db_name": "<from-env>"
}
```

### Run
```bash
npm test                 # headless run (all specs)
npm run headedTest       # headed run
npm run headedTestChrome # headed run in Chrome
npm run E2ETest          # the end-to-end checkout flow spec
```

---

## Reports

After a run, open the generated Mochawesome HTML report (under `cypress/reports/`)
or the Cucumber HTML report built by `multiple-cucumber-html-reporter`.

---

## Notes

This project began as a way to learn Cypress and grew into a reference framework
covering the patterns a maintainable UI suite needs — POM, BDD, data‑driven input
from multiple sources, DB‑level assertions, and reporting. Natural next steps:
wire it into a CI pipeline (GitHub Actions), add a `cypress.env.json.example`, and
parameterise the environment for multiple test targets.
