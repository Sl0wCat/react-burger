describe('Test burger constructor', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
  
  // Устанавливаем токен:
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken")
    );

    // алиас-селектор
    cy.get("[data-testid='643d69a5c3f7b9001cfa093c']").as('bunIngredient')
    cy.get("[data-testid='drop-target']").as('dropTarget')
  });

  it('should contains Constructor element', function() {
    cy.contains('Соберите бургер');
  });

  // Открытие ингридиента и закрытие модального окна через крест
  it('test open and close modal window by click on close button', () => {
    cy.get("@bunIngredient").click();
    cy.get("[data-testid='modal-window'").as('modalWindow').contains("Детали ингредиента").should("exist");
    // Закрытие окна по клику на крест
    cy.get("[data-testid='close-modal-button']").click();
    cy.get("@modalWindow").should("not.exist");
  })

  // Открытие ингридиента и закрытие модального окна через оверлэй
  it('test open and close modal window by click on overlay', () => {
    cy.get("@bunIngredient").click();
    cy.get("[data-testid='modal-window'").as('modalWindow').contains("Детали ингредиента").should("exist");
    // Закрытие окна по клику на оверлэй
    cy.get("[data-testid='modal-overlay']").click(10, 10);
    cy.get("@modalWindow").should("not.exist");
  })

  // Открытие ингридиента и закрытие модального окна через Esc
  it('test open and close modal window by click on overlay', () => {
    cy.get("@bunIngredient").click();
    cy.get("[data-testid='modal-window'").as('modalWindow').contains("Детали ингредиента").should("exist");
    // Закрытие окна по Esc
    cy.get("body").type('{esc}')

    cy.get("@modalWindow").should("not.exist");
  })

  // Перетаскивание булки
  it('Test drag and drop for bun', () => {
    cy.addIngredient('643d69a5c3f7b9001cfa093c');
    cy.get("@dropTarget").contains("Краторная булка").should("exist");
  })

  // перетаскивание начинки
  it('Test drag and drop for filling', () => {
    // Добавление котлеты
    cy.addIngredient('643d69a5c3f7b9001cfa0941');
    cy.get("@dropTarget").contains("Биокотлета").should("exist");

    // Добавление соуса
    cy.addIngredient('643d69a5c3f7b9001cfa0942');
    cy.get("@dropTarget").contains("Соус").should("exist");

  })


})