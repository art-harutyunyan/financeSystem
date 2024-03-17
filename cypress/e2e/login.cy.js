import { hexToRGB } from "../helpers.js";

describe("Login tests suite", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.location("pathname").should("equal", "/accounts/login/");
  });

  it("Test Case 1 | Validate the login with correct credentials", () => {
    cy.intercept("POST", Cypress.env("apis").login).as("loginRequest");
    cy.get(".form-field:first")
      .should("be.visible")
      .find("input")
      .should("have.attr", "type", "email")
      .and("have.attr", "placeholder", "Электронная почта")
      .type(Cypress.env("accounts").correctAccount.correctUsername);
    cy.get(".form-field:last")
      .should("be.visible")
      .find("input")
      .should("have.attr", "type", "password")
      .and("have.attr", "placeholder", "Пароль")
      .type(Cypress.env("accounts").correctAccount.correctPassword);
    cy.contains("button", "Далее").click();
    cy.wait("@loginRequest")
      .its("response")
      .then((data) => {
        expect(data.statusCode).to.equal(200);

        cy.location("pathname").should("equal", "/");
        cy.get(".userInfo__name").should(($info) => {
          expect($info.text()).to.contain(
            Cypress.env("accounts").correctAccount.correctUsername
          );
        });
        cy.get(".userInfo__group").should("contain", data.body.user.group);
        cy.contains("h1", "Платежи").should("be.visible");
        cy.get(".breadcrumbs>a:first")
          .should("be.visible")
          .and("have.attr", "href", "/");
        cy.get(".breadcrumb__label")
          .should("be.visible")
          .and("contain", "Платежи");
      });
  });

  it("Test Case 2 | Validate the login with existing username and incorrect password", () => {
    cy.intercept("POST", Cypress.env("apis").login).as("wrongPassword");
    cy.get(".form-field:first")
      .should("be.visible")
      .find("input")
      .should("have.attr", "type", "email")
      .and("have.attr", "placeholder", "Электронная почта")
      .type(Cypress.env("accounts").correctAccount.correctUsername);
    cy.get(".form-field:last")
      .should("be.visible")
      .find("input")
      .should("have.attr", "type", "password")
      .and("have.attr", "placeholder", "Пароль")
      .type(Cypress.env("accounts").incorrectAccount.nonExistingPassword);
    cy.contains("button", "Далее").click();
    cy.wait("@wrongPassword")
      .its("response")
      .then((data) => {
        expect(data.statusCode).to.equal(400);
        cy.get(".form-field__errors-list")
          .should("be.visible")
          .and("contain", data.body.non_field_errors[0])
          .and("have.css", "color", hexToRGB("#ff3024"));
      });
  });

  it("Test Case 3 | Validate the login with Non existing credentials", () => {
    cy.intercept("POST", Cypress.env("apis").login).as("wrongPassword");
    cy.get(".form-field:first")
      .should("be.visible")
      .find("input")
      .should("have.attr", "type", "email")
      .and("have.attr", "placeholder", "Электронная почта")
      .type(Cypress.env("accounts").incorrectAccount.nonExistingUsername);
    cy.get(".form-field:last")
      .should("be.visible")
      .find("input")
      .should("have.attr", "type", "password")
      .and("have.attr", "placeholder", "Пароль")
      .type(Cypress.env("accounts").incorrectAccount.nonExistingPassword);
    cy.contains("button", "Далее").click();
    cy.wait("@wrongPassword")
      .its("response")
      .then((data) => {
        expect(data.statusCode).to.equal(400);
        cy.get(".form-field__errors-list")
          .should("be.visible")
          .and("contain", data.body.non_field_errors[0])
          .and("have.css", "color", hexToRGB("#ff3024"));
      });
  });

  it("Test Case 4 | Validate the Blank login", () => {
    // There is no need to call to ../login API in this casee. I have
    // added this to my bug report
    cy.intercept("POST", Cypress.env("apis").login).as("wrongPassword");
    cy.get(".form-field:first").should("be.visible");
    cy.get(".form-field:last").should("be.visible");
    cy.contains("button", "Далее").click();
    cy.wait("@wrongPassword")
      .its("response")
      .then((data) => {
        expect(data.statusCode).to.equal(400);
        cy.get(".form-field__errors-list").should(($err) => {
          expect($err.text()).to.contain(data.body.password[0]);
          expect($err).to.have.length(2);
          expect($err).to.have.css("color", hexToRGB("#ff3024"));
        });
      });
  });
});
