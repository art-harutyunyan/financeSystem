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
    cy.createStandardExpense(paymentDescription).as("newPayment");
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
        cy.log(this.newPayment);
      });
  });

  it("Test Case 2 | Validate the non existing payment case", () => {
    let nonExistingKeyword = "this is a non existing case";
    cy.intercept(
      "GET",
      `${Cypress.env("apis").payments}?filter=0&page=1&limit=100&search=*`
    ).as("nonExistingSearch");
    cy.get('input[placeholder="Поиск"]').type(nonExistingKeyword);
    cy.realPress("Enter");
    cy.realPress("Enter");
    cy.wait("@nonExistingSearch")
      .its("response")
      .then((res) => {
        expect(res.body.count).to.equal(0);
        expect(res.body.results.length).to.equal(0);
        cy.get("tbody>tr").should("not.exist");
        cy.get(".empty").should("have.text", "Нет данных");
      });
  });

  after(function () {
    if (this.newPayment) {
      cy.request({
        method: "DELETE",
        url: `${Cypress.env("apis").payments}${this.newPayment}/`,
        headers: {
          Authorization: "JWT " + Cypress.env("token"),
        },
      }).then((res) => {
        expect(res.status).to.equal(204);
      });
    }
  });
});
