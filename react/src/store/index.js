const initialState = {
  products: [],
  card: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "products/setProducts": {
      return {
        ...state,
        products: [...action.payload],
      };
    }
    case "products/addProducts": {
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    }
    case "products/updateProducts": {
      let key = state.products.findIndex((e) => e._id === action.payload._id);
      state.products[key] = action.payload;
      return {
        ...state,
        ...state.products,
      };
    }

    case "products/deleteProduct": {
      let key = state.products.findIndex((e) => e._id === action.payload);
      return {
        ...state,
        ...state.products.splice(key, 1),
      };
    }

    case "card/addToCard": {
      return {
        ...state,
        card: [...state.card, action.payload],
      };
    }
    case "card/clean": {
      return {
        ...state,
        card: [],
      };
    }
    default:
      return state;
  }
}

export default reducer;
