import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

 import ProductDetailPage from "../ProductDetail/ProductDetail";
import TopBar from "../Topbar/Topbar";
import ProductPage from "../Product/Product";
import CartPage from "../Cart/Cart";
import CartProvider from "../../Context/Cart_Context";

const App = () => {
  return (
    <CartProvider>
    <Router>
      <div>
        <TopBar /> {/* Top navigation bar */}
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<ProductPage/>} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
};

export default App;
