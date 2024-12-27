
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLike,
  deleteProduct,
//   addProduct,
  loadProducts,
} from "../../store/productsSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchProducts } from "../../api/productsApi";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { selectLikedProducts } from "../../store/selectors";
import styles from "./ProductsPage.module.css";
import "./ProductsPage.css";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  isLiked: boolean;
}

interface RootState {
  products: {
    products: Product[];
    isLoaded: boolean;
  };
}

const ProductsPage: React.FC = () => {
  const { products, isLoaded } = useSelector((state: RootState) => state.products);
  const likedProducts = useSelector(selectLikedProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 6;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    if (!isLoaded) {
      const loadProductsFromApi = async () => {
        try {
          const data = await fetchProducts();
          if (Array.isArray(data)) {
            dispatch(loadProducts(data));
          } else {
            console.error("Полученные данные не являются массивом:", data);
          }
        } catch (error) {
          console.error("Ошибка при загрузке товаров:", error);
        }
      };
      loadProductsFromApi();
    }
  }, [dispatch, isLoaded]);

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(products.length / productsPerPage))
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className={styles.container}>
      <h1>Товары:</h1>
      {isLoaded ? (
        <>
          <div className={styles.search_container}>
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              className={styles.search_input}
            />
          </div>
          <div className={styles.link_container}>
            <div className={styles.pagination}>
              <Button
                onClick={prevPage}
                disabled={currentPage === 1}
                children={"Назад"}
              />
              <span className={styles.page_info}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                children={"Вперед"}
              />
            </div>

            {likedProducts.length > 0 && (
              <button
                className={styles.liked_products_button}
                onClick={() => navigate("/liked-products")}
              >
                <span role="img" aria-label="heart">
                  ❤️
                </span>{" "}
                В избранном: {likedProducts.length}
              </button>
            )}
          </div>

          <TransitionGroup
            className="products-list"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "space-between",
            }}
          >
            {currentProducts.map((product: Product) => (
              <CSSTransition key={product.id} timeout={300} classNames="card">
                <ProductCard
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  description={product.description}
                  isLiked={product.isLiked}
                  onLike={() => dispatch(toggleLike(product.id))}
                  onDelete={() => dispatch(deleteProduct(product.id))}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>

          <div className={styles.link_container}>
            <Button
              onClick={() => navigate("/create-product")}
              children={"Добавить новый товар"}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductsPage;
