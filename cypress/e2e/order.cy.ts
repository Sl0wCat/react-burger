describe('Test placing order', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
      cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
      cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
    
    // Устанавливаем токен:
      window.localStorage.setItem(
        "accessToken",
        JSON.stringify("test-accessToken")
      );

      cy.get('[data-testid="order-button"]').as('orderButton')
    });
  
  
    it('Test order placing', () => {
      // Добавление булки
      cy.addIngredient('643d69a5c3f7b9001cfa093c');
      // Добавление котлеты
      cy.addIngredient('643d69a5c3f7b9001cfa0941');
      // Добавление соуса
      cy.addIngredient('643d69a5c3f7b9001cfa0942');
  
      // Проверка что кнопка Оформить заказ активна
      cy.get('@orderButton').should('not.be.disabled');
  
  
      // Создание заказа
      cy.get('@orderButton').click();
      cy.get("[data-testid=order-number]").contains("123").should("exist");
  
      // Закрытие модального окна
      cy.get("[data-testid='close-modal-button'").click();
      cy.get("[data-testid=order-number]").should("not.exist");
    })
  
  
  })