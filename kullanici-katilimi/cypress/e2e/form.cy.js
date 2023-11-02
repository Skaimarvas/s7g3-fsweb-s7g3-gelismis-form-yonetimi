describe("Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("İsim yanlış yazma", () => {
    cy.get("#name").type("Be");

    cy.get("#name-validation").should(
      "have.text",
      "Üye ismi 3 karakterden az olamaz."
    );
  });
  it("İsim doğru yazma", () => {
    cy.get("#name").type("Berat");

    cy.get("#name-validation").should("be.hidden");
  });
  it("Email yanlış yazma", () => {
    cy.get("#email").type("berat");

    cy.get("#email-validation").should(
      "have.text",
      "Geçerli bir email adresi olması gerekiyor!"
    );
  });
  it("Email doğru yazma", () => {
    cy.get("#email").type("berat@arvas.com");

    cy.get("#email-validation").should("be.hidden");
  });
});
