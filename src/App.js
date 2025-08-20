import { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

import useBackendHealth from './hooks/useBackendHealth';
import useProducts from './hooks/useProducts';
import StatusBar from './components/StatusBar/StatusBar';

import Card from './components/ui/Card';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  const { isOnline } = useBackendHealth();
  const { products } = useProducts();

  return (
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col items-center">
      <StatusBar isOnline={isOnline} productsCount={products.length} />

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight my-8 text-[#292841]">
        Recomendador de Produtos RD Station
      </h1>

      {/* Responsive container: full width on mobile, constrained on larger screens */}
      <div className="w-full max-w-6xl px-4">
        {/* Mobile: 1 col | Desktop: 2 cols */}
        <div className="rounded-2xl border border-[#E6EBF2] shadow-xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 bg-white">
          <div className="col-span-1 lg:col-span-2">
            <p className="text-base md:text-lg text-[#313B45]">
              Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos. Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
            </p>
          </div>

          <div className="order-1">
            <Card className="p-6 md:p-8 bg-white border-[#E6EBF2]">
              <Form onRecommendationsChange={setRecommendations} />
            </Card>
          </div>

          <div className="order-2">
            <Card className="p-6 md:p-8 bg-white border-[#E6EBF2]">
              <RecommendationList recommendations={recommendations} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
