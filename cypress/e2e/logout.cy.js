import { hexToRGB } from "../helpers";

describe("Test suite for logout", () => {
  beforeEach(() => {
    cy.loginViaAPI(
      Cypress.env("accounts").correctAccount.correctUsername,
      Cypress.env("accounts").correctAccount.correctPassword
    );
    cy.visit("/profile/");
  });

  it("Test Case 1 | Validate logout functionality", () => {
    cy.contains("button", "Выйти из системы")
      .should("be.visible")
      .and("have.css", "background-color", hexToRGB("#ff1608"))
      .click();

    cy.location("pathname").should("equal", "/accounts/login/");
    cy.contains("button", "Далее").should("be.visible");
  });
});
