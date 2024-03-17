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
    cy.log("all good");
  });
});
