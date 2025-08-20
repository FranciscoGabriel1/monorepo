import React from 'react';

function RecommendationList({ recommendations }) {
  const count = Array.isArray(recommendations) ? recommendations.length : 0;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        Lista de Recomendações
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 border border-slate-200">
          {count}
        </span>
      </h2>

      {count === 0 && (
        <p
          className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3"
          aria-live="polite"
        >
          Nenhuma recomendação encontrada.
        </p>
      )}

      <ul className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <li
            key={index}
            className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-gray-900">{recommendation.name}</h3>
                {Array.isArray(recommendation.features) && recommendation.features.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {recommendation.features.slice(0, 3).join(' • ')}
                  </p>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                RD
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
