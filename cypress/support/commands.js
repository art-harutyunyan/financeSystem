// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import cookies from "../fixtures/cookies.json";

Cypress.Commands.add("loginViaAPI", (username, password) => {
  cy.request({
    method: "POST",
    url: Cypress.env("apis").login,
    body: {
      username: username,
      password: password,
    },
  }).then((res) => {
    expect(res.status).to.equal(200);
    cookies.user.isAuthorized = true;
    cookies.user.token = res.body.token;
    cookies.user.user = res.body.user;
    cy.setCookie("store", encodeURIComponent(JSON.stringify(cookies)), {
      domain: "finance.dev.fabrique.studio",
      path: "/",
    });
  });
});
