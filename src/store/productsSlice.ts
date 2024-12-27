import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  isLiked: boolean;
};

type ProductsState = {
  products: Product[];
  isLoaded: boolean; 
};

const initialState: ProductsState = { 
  products: [], 
  isLoaded: false 
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.isLoaded = true; 
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingProductIndex === -1) {
        state.products.unshift(action.payload); 
      } else {
        state.products[existingProductIndex] = { 
          ...state.products[existingProductIndex], 
          ...action.payload 
        }; 
      }
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      state.products = state.products.map((p) =>
        p.id === action.payload ? { ...p, isLiked: !p.isLiked } : p
      );
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { loadProducts, addProduct, toggleLike, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
