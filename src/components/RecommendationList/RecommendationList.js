import React from 'react';

function RecommendationList({ recommendations }) {
  const count = Array.isArray(recommendations) ? recommendations.length : 0;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Lista de Recomendações <span className="text-gray-500">({count})</span>
      </h2>

      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index} className="mb-2">
            {recommendation.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
