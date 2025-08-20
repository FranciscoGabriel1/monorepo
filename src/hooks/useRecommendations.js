import useProducts from "./useProducts";
import recommendationService from "../services/recommendation.service";

export default function useRecommendations() {
  const { products } = useProducts();

  const getRecommendations = (formData) => {
    return recommendationService.getRecommendations(formData, products);
  };

  return { getRecommendations };
}
