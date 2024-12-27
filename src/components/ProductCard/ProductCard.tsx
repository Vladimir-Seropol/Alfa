import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css'; 


type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  isLiked: boolean;
  onLike: () => void;  
  onDelete: () => void; 
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  image,
  isLiked,
  onLike,
  onDelete,
}) => {
 
  const navigate = useNavigate(); 

 
  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    onLike(); 
  };

  
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    onDelete(); 
  };

  
  const handleCardClick = () => {
    navigate(`/product/${id}`); 
  };

  return (
    <div className={styles.card} onClick={handleCardClick}> 
      <div className={styles.cardContent}>
        <img src={image} alt={title} className={styles.image} />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.actions}>
        <button
          onClick={handleLike}  
          className={`${styles.button} ${styles.likeButton}`}
        >
          {isLiked ? '❤️' : '🤍'} 
        </button>
        <button
          onClick={handleDelete}  
          className={`${styles.button} ${styles.deleteButton}`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
