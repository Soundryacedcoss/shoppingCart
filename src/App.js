import { Provider } from "react-redux";
import "./App.css";
import { Carousell } from "./Components/Carousell";
import { Cart } from "./Components/Cart";
import { Navbar } from "./Components/Navbar";
import { Product } from "./Components/Product";
import store from "./Store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

let router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />} />
      <Route path="/Carousell" element={<Carousell />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/Cart" element={<Cart />} />
    </>
  )
);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </div>
  );
}

export default App;
