import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice/DataSlice";
const store = configureStore({
  reducer: {
    DataSlice: dataReducer,
  },
});
export default store
