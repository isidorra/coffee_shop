import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CategoriesContextProvider } from "./context/CategoriesContext.jsx";
import { ProductsContextProvider } from "./context/ProductsContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { OrdersContextProvider } from "./context/OrdersContext.jsx";

axios.defaults.baseURL = "http://localhost:8080";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CategoriesContextProvider>
          <ProductsContextProvider>
            <CartContextProvider>
              <OrdersContextProvider>
                <App />
              </OrdersContextProvider>
            </CartContextProvider>
          </ProductsContextProvider>
        </CategoriesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
