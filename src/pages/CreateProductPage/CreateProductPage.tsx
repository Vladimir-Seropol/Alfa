import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/productsSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Button from "../../components/Button/Button";
import style from "./CreateProductPage.module.css";

const CreateProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    return (
      title.trim() !== "" && image.trim() !== "" && description.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      const newProduct = {
        id: uuidv4(),
        title,
        image,
        description,
        isLiked: false,
      };

      dispatch(addProduct(newProduct)); 
      setLoading(false);
      navigate("/");
    } else {
      setIsValid(false);
    }
  };

  const handleCancel = () => {
    navigate("/"); 
  };

  return (
    <div className="container">
      <h1>Добавьте новый продукт</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          URL изображения:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <label>
          Описание:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        {!isValid && (
          <p style={{ color: "red" }}>Все поля обязательны для заполнения!</p>
        )}
       <div className={style.buttonContainer}>
          <Button
            children={"Добавить продукт"}
            type="submit"
            disabled={loading}
          />
          <Button
            children={"Отмена"}
            type="button"
            onClick={handleCancel}
             backgroundColor="red"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
