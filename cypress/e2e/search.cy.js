describe("Search functionality suite", () => {
  beforeEach(() => {
    cy.loginViaAPI(
      Cypress.env("accounts").correctAccount.correctUsername,
      Cypress.env("accounts").correctAccount.correctPassword
    );
    cy.visit("/");
  });

  it("Test Case 1 | Search for an existing payment", function () {
    let paymentDescription = "Planned expense to be paid";
    let searchKeyword = paymentDescription.split(" ")[0];
    cy.createStandardExpense(paymentDescription);
    cy.intercept(
      "GET",
      `${
        Cypress.env("apis").payments
      }?filter=0&page=1&limit=100&search=${searchKeyword}&sort=&date_start=&date_finish=`
    ).as("search");
    cy.get('input[placeholder="Поиск"]').type(searchKeyword);
    // There is a bug in the system :) you have to press Enter twice to force the front-end to call the API
    // Sometimes it works properly, once the typing is done
    cy.realPress("Enter");
    cy.realPress("Enter");
    cy.wait("@search")
      .its("response")
      .then((filteredData) => {
        cy.get("tbody>tr").should(
          "have.length",
          filteredData.body.results.length
        );
        cy.log(filteredData.body.results);
        if (filteredData.body.results.length > 0) {
          cy.get("tbody>tr").each(($row, i) => {
            cy.wrap($row)
              .find("td:last-child")
              .invoke("text")
              .then((description) => {
                expect(description.toLocaleLowerCase()).to.include(
                  searchKeyword.toLocaleLowerCase()
                );
                expect(description.toLocaleLowerCase()).to.equal(
                  filteredData.body.results[i].description.toLocaleLowerCase()
                );
              });
          });
        }
      });
  });

  it("Test Case 2 | Validate the non existing payment case", () => {});
});
