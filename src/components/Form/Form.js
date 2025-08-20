import { Preferences, Features, RecommendationType } from "./Fields";
import useProducts from "../../hooks/useProducts";
import useForm from "../../hooks/useForm";
import useRecommendations from "../../hooks/useRecommendations";
import SubmitButton from "./SubmitButton/SubmitButton";

function Form({ onRecommendationsChange }) {
  const { preferences, features } = useProducts();
  const { getRecommendations } = useRecommendations();

  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: "",
  });

  const isSubmitDisabled =
    (formData.selectedPreferences?.length ?? 0) === 0 &&
    (formData.selectedFeatures?.length ?? 0) === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRecommendations = getRecommendations(formData);
    if (typeof onRecommendationsChange === "function") {
      onRecommendationsChange(dataRecommendations);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange("selectedPreferences", selected)
        }
      />

      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange("selectedFeatures", selected)
        }
      />

      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange("selectedRecommendationType", selected)
        }
      />

      <SubmitButton text="Obter recomendação" disabled={isSubmitDisabled} />
    </form>
  );
}

export default Form;
