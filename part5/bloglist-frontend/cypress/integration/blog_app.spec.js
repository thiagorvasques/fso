/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "admin",
      username: "admin",
      password: "admin",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeed with correct credentials", function () {
      cy.get("#username").type("admin");
      cy.get("#password").type("admin");
      cy.get("#login-button").click();

      cy.contains("admin logged in");
    });
    it("fails with wrong credentials", function () {
      cy.get("input:first").type("adminot");
      cy.get("input:last").type("adminot");
      cy.get("#login-button").click();

      cy.contains("Wrong credentials");
    });
  });
  describe("when logged in", function () {
    beforeEach(function () {
      localStorage.clear();
      cy.login({ username: "admin", password: "admin" });
    });
    it("create new Blog", function () {
      cy.get("#new").click();
      cy.get("#title").type("cypress test");
      cy.get("#author").type("admin");
      cy.get("#url").type("someurl.com");
      cy.get("#save").click();

      cy.contains("A new blog cypress test by admin");
    });
    it("user can like a blog", function () {
      cy.createBlog({
        title: "Some blog",
        authot: "admin",
        url: "someurl.com",
        likes: 0,
      });
      cy.contains("View").click();
      cy.contains("Like").click();

      cy.contains("1");
    });
    it("user can delete a blog", function () {
      cy.createBlog({
        title: "Some blog",
        authot: "admin",
        url: "someurl.com",
        likes: 0,
      });
      cy.contains("View").click();
      cy.contains("Delete").click();
      cy.contains("Some blog ").should("not.exist");
    });
    it("check if blogs are ordered", function () {
      cy.createBlog({
        title: "Will be first",
        authot: "admin",
        url: "someurl.com",
        likes: 10,
      });
      cy.createBlog({
        title: "will be second",
        authot: "admin",
        url: "someurl.com",
        likes: 5,
      });
      cy.createBlog({
        title: "will be third",
        authot: "admin",
        url: "someurl.com",
        likes: 0,
      });
      cy.get("li:first").should("contain", 10);
    });
  });
});
