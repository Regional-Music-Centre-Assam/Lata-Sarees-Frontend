
export const fetchProducts = async () => {
    try {
      const response = await fetch('/products.json'); 
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  

  export const fetchProductById = async (id) => {
    try {
      const products = await fetchProducts();
      const product = products.find((p) => p.id === parseInt(id));
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };