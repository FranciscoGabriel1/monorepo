
function RecommendationList({ recommendations }) {
  const count = Array.isArray(recommendations) ? recommendations.length : 0;

  return (
    <div className="space-y-4 cursor-pointer" >
      <h2 className="text-lg md:text-xl font-semibold mb-3 flex items-center gap-2 text-[#292841]">
        Lista de Recomendações
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-[#E6EBF2] text-[#313B45] border border-[#E6EBF2]">
          {count}
        </span>
      </h2>

      {count === 0 && (
        <p
          className="text-sm md:text-base text-[#777777] bg-[#E6EBF2] border border-[#E6EBF2] rounded-lg p-3"
          aria-live="polite"
        >
          Nenhuma recomendação encontrada.
        </p>
      )}

      <ul className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <li
            key={index}
            className="p-4 rounded-xl border border-[#E6EBF2] bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-medium text-[#292841]">{recommendation.name}</h3>
                {Array.isArray(recommendation.features) && recommendation.features.length > 0 && (
                  <p className="text-xs sm:text-sm text-[#777777] mt-1 break-words">
                    {recommendation.features.slice(0, 3).join(' • ')}
                  </p>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-[#5865F2] text-white border border-[#5865F2] flex-shrink-0">
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
