import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./ProductDetailPage.module.css";
import Button from "../../components/Button/Button";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();

  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => String(p.id) === String(id))
  );

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className={styles.container}>
      <Button onClick={goBack} children={"На страницу продуктов"} />
      <h1 className={styles.title}>{product.title}</h1>
      <img src={product.image} alt={product.title} className={styles.image} />
      <p className={styles.description}>{product.description}</p>
    </div>
  );
};

export default ProductDetailPage;
