declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Use this command to login to application using the API
     * Thie is used to
     * @example
     * cy.loginViaAPI(username, password)
     */
    loginViaAPI(username: string, password: string): Chainable<any>;

    /**
     * Use this command to create a payment with
     * standard category using the API
     * Thie is used to
     * @example
     * cy.createStandardExpense(description)
     */
    createStandardExpense(description: string): Chainable<any>;
  }
}
