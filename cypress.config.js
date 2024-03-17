const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://fabrique:fabrique@finance.dev.fabrique.studio",
    defaultCommandTimeout: 6000,
    viewportHeight: 864,
    viewportWidth: 1536,
    $schema: "https://on.cypress.io/cypress.schema.json",
  },
});
