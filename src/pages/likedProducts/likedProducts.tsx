import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductCard from "../../components/ProductCard/ProductCard";

const LikedProductsPage: React.FC = () => {
  const likedProducts = useSelector((state: RootState) =>
    state.products.products.filter((product) => product.isLiked)
  );

  return (
    <div className="container">
      <h1>Избранные товары</h1>
      <div className="products-list">
        {likedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            description={product.description}
            isLiked={product.isLiked}
            onLike={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default LikedProductsPage;
