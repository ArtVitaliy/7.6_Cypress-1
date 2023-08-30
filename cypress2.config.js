const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000/",
    viewportWidth: 360,
    viewportHeight: 740,
    defaultCommandTimeout: 10000,
    video: false,
  },
});
