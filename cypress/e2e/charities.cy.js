describe("Charities and Groups Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/wp-json/wp/v2/charities-community").as("getCharities");
    cy.visit("http://localhost:3000/charity-groups/").then(() => {
      cy.log("Visited Charity Groups Page");
    });
  });

  it("should display a list of charities", () => {
    cy.get(".cards-grid .card").should("have.length.greaterThan", 0);
  });
  it("displays charities from the API", () => {
    cy.contains("Boys Group at The Beacon Centre, Salford Youth Service").should("be.visible");
    cy.contains("Boothstown Youth Café with Salford Youth Service").should("be.visible");
  });
  it("filters charities by postcode", () => {
     
  
    // Select a filter checkbox
    cy.get("label").contains("M6 6QT").click();

  });
 


});

  
  