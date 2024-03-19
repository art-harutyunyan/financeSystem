describe("template spec", () => {
  const cookies = {
    user: {
      isAuthorized: false,
      token: null,
      user: null,
    },
  };

  beforeEach(() => {
    cy.loginViaAPI(
      Cypress.env("accounts").correctAccount.correctUsername,
      Cypress.env("accounts").correctAccount.correctPassword
    );

    cy.visit("/");
  });
  it("passes", () => {
    cy.intercept(
      "GET",
      "https://api.finance.dev.fabrique.studio/api/payments/2553/"
    ).as("payment");
    cy.log("all good");
    cy.visit("https://finance.dev.fabrique.studio/payments/edit/2553/");
    cy.wait("@payment");
  });
});
