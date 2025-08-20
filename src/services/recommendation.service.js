
function normalizeText(str) {
  return (str || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function includesNormalized(list = [], value = "") {
  const target = normalizeText(value);
  return (list || []).some((item) => normalizeText(item) === target);
}

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: "" },
  products = []
) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType = "",
  } = formData || {};

  if (!Array.isArray(products) || products.length === 0) return [];

  const noFilters =
    (selectedPreferences?.length ?? 0) === 0 &&
    (selectedFeatures?.length ?? 0) === 0;

  if (noFilters) return [];

  const scored = products.map((product, index) => {
    const prefScore = (selectedPreferences || []).reduce(
      (acc, pref) => acc + (includesNormalized(product.preferences, pref) ? 1 : 0),
      0
    );
    const featScore = (selectedFeatures || []).reduce(
      (acc, feat) => acc + (includesNormalized(product.features, feat) ? 1 : 0),
      0
    );
    return { product, score: prefScore + featScore, index };
  });

  const positives = scored.filter((p) => p.score > 0);
  if (positives.length === 0) return [];

  if (selectedRecommendationType === "MultipleProducts") {
    return positives
      .sort((a, b) => (b.score !== a.score ? b.score - a.score : a.index - b.index))
      .map((p) => p.product);
  }

  const maxScore = Math.max(...positives.map((p) => p.score));
  const withMax = positives.filter((p) => p.score === maxScore);
  const last = withMax.reduce((acc, cur) => (cur.index > acc.index ? cur : acc), withMax[0]);
  return [last.product];
};

export default { getRecommendations };
