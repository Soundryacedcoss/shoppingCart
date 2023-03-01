const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const fetchProducts = createAsyncThunk("Product/fetch", async () => {
  return await fetch("https://dummyjson.com/products")
    .then((resp) => resp.json())
    .catch((err) => console.log(err.message));
});
const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    products: [],
    cart: [],
    search: [],
    users: [],
    loader: false,
  },
  reducers: {
    addCart: (state, action) => {
      // if (state.cart.length === 0) {
      state.cart.push(action.payload);
      // } else {
      //   for (let i = 0; i < state.cart.length; i++) {
      //     if (state.cart[i].quantity === 1) {
      //       state.cart[i].quantity++;
      //     } else {
      //       state.cart.push(action.payload);
      //     }
      //   }
      // }
    },
    searchData: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: (state, action) => {
      state.search = [];
    },
    priceHightoLow: (state, action) => {
      state.products.products.sort((a, b) => b.price - a.price);
    },
    priceLowtoHigh: (state, action) => {
      state.products.products.sort((a, b) => a.price - b.price);
    },
    ratingHightoLow: (state, action) => {
      state.products.products.sort((a, b) => b.rating - a.rating);
    },
    ratingLowtoHigh: (state, action) => {
      state.products.products.sort((a, b) => a.rating - b.rating);
    },
    increseQuantity: (state, action) => {
      console.log(action.payload, state);
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === action.payload) {
          state.cart[i].quantity++;
        }
      }
    },
    decreseQuantity: (state, action) => {
      console.log(action.payload, state);
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === action.payload) {
          state.cart[i].quantity--;
        }
      }
    },
    deleteProduct: (state, action) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === action.payload) {
          state.cart.splice(state.cart[i], 1);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loader = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {});
  },
});
export const {
  addData,
  addCart,
  searchData,
  clearSearch,
  priceHightoLow,
  priceLowtoHigh,
  ratingHightoLow,
  ratingLowtoHigh,
  increseQuantity,
  decreseQuantity,
  deleteProduct,
} = DataSlice.actions;
export default DataSlice.reducer;
