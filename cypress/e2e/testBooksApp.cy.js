const book1 = {
  title: "Гранатовый браслет",
  description: "Повесть",
  author: "Александр Иванович Куприн",
};

const book2 = {
  title: "Черный лебедь",
  description: "Нон-фикшн",
  author: "Нассим Николас Талеб",
};

const book3 = {
  title: "Стихи о любви",
  description: "Стихи",
  author: "Сергей Александрович Есенин",
};

describe("opening a page Books", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays items by default", () => {
    cy.contains("Books list").should("have.length", 1);
    cy.contains("Log in").should("have.length", 1);
  });
});

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  it("Should add new book", () => {
    cy.addBook(book1);
    cy.get(".card-title").should("contain.text", book1.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(book2);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", book2.title);
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBook(book1);
    cy.contains(book1.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(book1.title).should("be.visible");
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(book2.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(book2.title).should("not.exist");
  });
});
