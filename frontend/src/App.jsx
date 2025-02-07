import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Categories from "./pages/category/Categories";
import Products from "./pages/product/Products";
import CreateProduct from "./pages/product/CreateProduct";
import ProductDetails from "./pages/product/ProductDetails";
import Cart from "./pages/cart/Cart";
import AdminProfile from "./pages/admin/AdminProfile";
import CustomerProfile from "./pages/customer/CustomerProfile";
import Checkout from "./pages/order/Checkout";
import Orders from "./pages/order/Orders";
import Invoice from "./pages/order/Invoice";
import Settings from "./pages/admin/Settings";
import AllProducts from "./pages/product/AllProducts";
import ProductsByCategory from "./pages/product/ProductsByCategory";

const App = () => {
  const {authUser} = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={authUser && authUser.role === "ADMIN" ? <AdminLayout /> : <Layout />}>
          <Route index element={authUser && authUser.role === "ADMIN" ? <AdminDashboard/> : <Home/>} />
          <Route path="/sign-up" element={!authUser ? <Register /> : <Navigate to={"/"}/>} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"}/>} />
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/all-products" element={<AllProducts/>}/>
          <Route path="/all-products/filter/:categoryId" element={<ProductsByCategory/>}/>

          {/* ADMIN */}
          <Route path="/categories" 
                  element={
                    !authUser ? (
                      <Navigate to="/" />
                    ) : authUser.role === "ADMIN" ? (
                      <Categories />
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
          />
          <Route path="/products" 
                  element={
                    !authUser ? (
                      <Navigate to="/" />
                    ) : authUser.role === "ADMIN" ? (
                      <Products/>
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
          />
          <Route path="/create-product" 
                  element={
                    !authUser ? (
                      <Navigate to="/" />
                    ) : authUser.role === "ADMIN" ? (
                      <CreateProduct/>
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
          />
          <Route path="/orders" 
                  element={
                    !authUser ? (
                      <Navigate to="/" />
                    ) : authUser.role === "ADMIN" ? (
                      <Orders/>
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
          />
          <Route path="/invoice/:orderId" 
                  element={
                    !authUser ? (
                      <Navigate to="/" />
                    ) : authUser.role === "ADMIN" ? (
                      <Invoice/>
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
          />
          <Route path="/settings" 
                  element={
                    !authUser ? (
                      <Navigate to="/" />
                    ) : authUser.role === "ADMIN" ? (
                      <Settings/>
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
          />
          <Route path="/admin-profile" 
                  element={
                    !authUser ? (
                      <Navigate to="/" />
                    ) : authUser.role === "ADMIN" ? (
                      <AdminProfile/>
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
          />

          {/* CUSTOMER */}
          <Route path="/cart" 
                  element={
                    !authUser ? (
                      <Navigate to="/sign-up" />
                    ) : authUser.role === "CUSTOMER" ? (
                      <Cart/>
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
          />
          <Route path="/checkout" 
                  element={
                    !authUser ? (
                      <Navigate to="/sign-up" />
                    ) : authUser.role === "CUSTOMER" ? (
                      <Checkout/>
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
          />
          <Route path="/customer-profile" 
                  element={
                    !authUser ? (
                      <Navigate to="/sign-up" />
                    ) : authUser.role === "CUSTOMER" ? (
                      <CustomerProfile/>
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
          />



        </Route>
      </Routes>
      <Toaster/>
    </>
  );
};

export default App;
