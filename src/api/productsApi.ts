const API_BASE_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
