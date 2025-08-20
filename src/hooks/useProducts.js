import { useEffect, useState } from 'react';
import getProducts from '../services/product.service';

const useProducts = () => {
  const [preferences, setPreferences] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        const allPreferences = [];
        const allFeatures = [];

        setProducts(products);

        products.forEach((product) => {
          allPreferences.push(...(product.preferences || []));
          allFeatures.push(...(product.features || []));
        });

        const uniquePreferences = [...new Set(allPreferences)].sort((a, b) => a.localeCompare(b));
        const uniqueFeatures = [...new Set(allFeatures)].sort((a, b) => a.localeCompare(b));

        setPreferences(uniquePreferences);
        setFeatures(uniqueFeatures);
      } catch (error) {
        console.error('Erro ao obter os produtos:', error);
      }
    };

    fetchData();
  }, []);

  return { preferences, features, products };
};

export default useProducts;
