import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import LikedProductsPage from "./pages/likedProducts/likedProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/liked-products" element={<LikedProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
