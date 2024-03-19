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
import "cypress-real-events";

Cypress.Commands.add("loginViaAPI", (username, password) => {
  cy.request({
    method: "POST",
    url: Cypress.env("apis").login,
    body: {
      username: username,
      password: password,
    },
  }).then((res) => {
    // storing the token as a cypress env variable
    Cypress.env("token", res.body.token);
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

Cypress.Commands.add("createIncome", () => {
  const incomeBody = {
    operation: 1,
    tags: [],
    description: "Testing the payment",
    amount_plan: "100",
    amount_fact: "100",
    status: 2,
    date_plan: "2024-03-19",
    date_fact: "2024-03-19",
    source: {
      title: "apple",
      isNew: true,
    },
    source_additional_id: "Macbook",
    source_status: 2,
    is_active: true,
    is_verified: true,
    parent_id: null,
  };
  cy.request({
    method: "GET",
    url: "https://api.finance.dev.fabrique.studio/api/payments/?limit=1000",
    headers: {
      Authorization: "JWT " + Cypress.env("token"),
    },
  }).then((res) => {
    cy.log("the list of payments", res.body);
  });
});

Cypress.Commands.add("createStandardExpense", (description) => {
  const regularExpenseBody = {
    operation: 2,
    tags: [],
    amount_plan: "100",
    amount_fact: "100",
    description: description,
    status: 1,
    date_plan: "2024-03-19",
    date_fact: "2024-03-19",
    category: {
      id: 631,
      title: "Samsung Monthly Payment",
      category_type: 1,
    },
    category_additional_id: "Macbook",
    is_active: true,
    is_verified: true,
    parent_id: null,
  };
  cy.request({
    method: "POST",
    url: Cypress.env("apis").payments,
    body: regularExpenseBody,
    headers: {
      Authorization: "JWT " + Cypress.env("token"),
    },
  }).then((res) => {
    cy.wrap(res.body.id);
  });
});

Cypress.Commands.add("createReduciblePayment", () => {
  const reduciblePaymentBody = {
    operation: 2,
    tags: [],
    description: "Reducible plan",
    amount_plan: "500",
    status: 2,
    category: {
      id: 630,
      title: "Samsung Total Payment",
      category_type: 2,
    },
    category_additional_id: "Macbook",
    is_active: true,
    is_verified: true,
    parent_id: null,
  };
});

Cypress.Commands.add("createTransferPayment", () => {
  const transferPaymentBody = {
    operation: 3,
    tags: [],
    description: "Transfer plan",
    amount_plan: "500",
    amount_fact: "100",
    status: 2,
    date_plan: "2024-03-19",
    date_fact: "2024-03-19",
    account_sender: {
      id: 744,
      title: "20522114477445878",
      companies: [],
      description: null,
      requisites: "20522114477445878",
    },
    account_recipient: {
      id: 743,
      title: "2054477447774",
      companies: [],
      description: null,
      requisites: "2054477447774",
    },
    is_active: true,
    is_verified: true,
    parent_id: null,
  };
});
