const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // add simple node event listener
      on("task", {
        sendRequest: (method, url, body = null) => {
          return cy.request({
            method,
            url,
            body,
          });
        },
      })
      
    },
  },
});
