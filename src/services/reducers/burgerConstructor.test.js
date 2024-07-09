
import { addBun, addFilling, cleanConstructor, constructorSlice, countTotal, initialState, removeFilling, reorderFilling, updateIndex } from "./burgerConstructor";

jest.mock('uuid', () => ({
  v4: () => '12345',
}));

describe("tests for Burger Constructor Slice", () => {

  const testData = {
    calories: 100500,
    carbohydrates: 620,
    fat: 123,
    image: 'test-image.jpg',
    image_large: 'large-test-image.jpg',
    image_mobile: 'mobile-test-image.jpg',
    price: 50,
    proteins: 200,
    __v: 123,
    _id: 123
  }

  // Инициализация хранилища
  it("initialize slice with initialValue", () => {
    const constructorSliceInit = constructorSlice.reducer(initialState, { type: "unknown" });
    expect(constructorSliceInit).toBe(initialState);
  });

  // Добавление начинки
  it("test addFilling action", () => {
    const testFillingData = {
      ...testData,
      name: 'Соевый соус',
      type: 'sauce',
    };

    const action = addFilling(testFillingData);
    const state = constructorSlice.reducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      filling: [{
        ...testFillingData,
        uId: '12345',
        index: 0,
      }]
    })
  });

  // Добавление булки
  it("test addBun action", () => {
    const testBunData = {
        ...testData,
        name: 'Мягкая французская булка',
        type: 'bun',
    };

    const action = addBun(testBunData);
    const state = constructorSlice.reducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      bun: testBunData
    })

  });

  // Подсчет итоговой стоимости
  it("test countTotal action", () => {
    const testIngredientsData = {
      filling: [
        {
          ...testData,
          name: 'Соевый соус',
          type: 'sauce',
          uId: '12345',
          price: 150
        }
      ],
      bun: {
        ...testData,
        name: 'Мягкая французская булка',
        type: 'bun',
        uId: '54321',
      }
    }
    const action = countTotal();
    const state = constructorSlice.reducer({...initialState, ...testIngredientsData}, action);
    expect(state).toEqual({...initialState, ...testIngredientsData, total: 250});
  });

  // Удаление начинки
  it("test removeFilling action", () => {
    const testFillingData = {
      ...testData,
      name: 'Соевый соус',
      type: 'sauce',
      uId: '12345',
      index: 0,
    };

    const action = removeFilling(testFillingData);
    const state = constructorSlice.reducer({...initialState, filling: [testFillingData]}, action);
    expect(state).toEqual(initialState);

  });

  // Перетаскивание ингридиентов
  it("test reorderFilling action", () => {
    const testFillingData = [
        {
          ...testData,
          name: 'Соевый соус',
          type: 'sauce',
          uId: '12345',
          index: 0,
        },
        {
          ...testData,
          name: 'Котлетка',
          type: 'meat',
          uId: '54321',
          index: 1,
        }
    ]
    const action = reorderFilling({
      hoverIndex: 0,
      dragIndex: 1
    });
    const state = constructorSlice.reducer({...initialState, filling: testFillingData}, action);
    expect(state).toEqual({...initialState, filling: [
      {
        ...testData,
        name: 'Котлетка',
        type: 'meat',
        uId: '54321',
        index: 1,
      },
      {
        ...testData,
        name: 'Соевый соус',
        type: 'sauce',
        uId: '12345',
        index: 0,
      },
    ]});
  });

  // Обновление индекса ингридиентов
  it("test updateIndex action", () => {
    const testFillingData = [
      {
        ...testData,
        name: 'Котлетка',
        type: 'meat',
        uId: '54321',
        index: 1,
      },
      {
        ...testData,
        name: 'Соевый соус',
        type: 'sauce',
        uId: '12345',
        index: 0,
      },
    ]
    const action = updateIndex();
    const state = constructorSlice.reducer({...initialState, filling: testFillingData}, action);
    expect(state).toEqual({...initialState, filling: [
      {
        ...testData,
        name: 'Котлетка',
        type: 'meat',
        uId: '54321',
        index: 0,
      },
      {
        ...testData,
        name: 'Соевый соус',
        type: 'sauce',
        uId: '12345',
        index: 1,
      },
    ]});
  });

  // Очистка конструктора
  it("test cleanConstructor action", () => {
    const testFillingData = [
      {
        ...testData,
        name: 'Котлетка',
        type: 'meat',
        uId: '54321',
        index: 1,
      },
      {
        ...testData,
        name: 'Соевый соус',
        type: 'sauce',
        uId: '12345',
        index: 0,
      },
    ]
    const testBunData = {
        ...testData,
        name: 'Мягкая французская булка',
        type: 'bun',
    }

    const action = cleanConstructor();
    const state = constructorSlice.reducer({...initialState, filling: testFillingData, bun: testBunData}, action);
    expect(state).toEqual(initialState);
  });
});