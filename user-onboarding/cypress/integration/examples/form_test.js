describe("Testing our volunteer form", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3000/");
    });
    it("Add test to inputs and submit form", function() {
      cy.get('input[name="name"]').type("Andrew").should("have.value", "Andrew");
      cy.get('input[name="email"]').type("email@email.com").should("have.value", "email@email.com");
      cy.get('input[name="password"]').type("lambda123").should("have.value", "lambda123");
      cy.get("#role").select("Frontend developer").should("have.value", "Frontend developer");
      cy.get('[type="checkbox"]').check().should('be.checked');
      cy.get("button").click();
    });
  });