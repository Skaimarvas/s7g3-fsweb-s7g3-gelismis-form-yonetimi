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
  it("Şifre doğru yazma", () => {
    cy.get("#password").type("deneme123");
    cy.get("#password-validation").should("be.hidden");
  });
  it("Şifre yanlış yazma", () => {
    cy.get("#password").type("den");
    cy.get("#password-validation").should(
      "have.text",
      "Şifre 6 karakterden fazla olmalı!"
    );
  });

  it("Checkbox Kontrolü", () => {
    cy.get("#termsofservice").click();
    cy.get("#termsofservice").should("be.checked");
  });
  it("Form veri gönderimi", () => {
    cy.get("#name").type("Berat");
    cy.get("#name-validation").should("be.hidden");
    cy.get("#email").type("berat@arvas.com");
    cy.get("#email-validation").should("be.hidden");
    cy.get("#password").type("deneme123");
    cy.get("#password-validation").should("be.hidden");
    cy.get("#termsofservice").click();
    cy.get("#termsofservice").should("be.checked");
    cy.get("#submit-button").click();
  });
  it("İnput boş bırakılırsa testi", () => {
    cy.get(
      "#name-validation" || "#email-validation" || "#password-validation"
    ).should("not.be.empty");
    cy.get("#submit-button").click();
  });
});
