describe("Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("İsim yazma", () => {
    cy.get("#name").type("Be");
    cy.get("#name-validation").should(
      "have.text",
      "Üye ismi 3 karakterden az olamaz."
    );
  });
});
