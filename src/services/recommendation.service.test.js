import recommendationService from '../services/recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('returns correct SingleProduct recommendation based on selected inputs', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('returns correct MultipleProducts recommendations based on selected inputs', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('SingleProduct returns only one item even if there are multiple matches', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('SingleProduct tie: picks the LAST valid product among top-scored', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('retorna array vazio quando nenhum filtro é selecionado', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    // Com lista de produtos vazia
    const recsEmpty = recommendationService.getRecommendations(formData, []);
    expect(recsEmpty).toEqual([]);

    // Com mockProducts, sem filtros também deve retornar []
    const recsMock = recommendationService.getRecommendations(formData, mockProducts);
    expect(recsMock).toEqual([]);
  });

  test('faz matching ignorando maiúsculas/minúsculas e acentos (SingleProduct)', () => {
    // No mock existe "Automação de marketing" (com acento).
    // Aqui passamos sem acento e em minúsculas para validar a normalização.
    const formData = {
      selectedPreferences: ['automacao de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    // No dataset, o melhor match para essa preferência é o RD Station Marketing
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('MultipleProducts em empate mantém a ordem original dos produtos', () => {
    // Dataset controlado garante empate e ordem previsível
    const demoProducts = [
      { id: 1, name: 'Alpha', preferences: ['x'], features: [] }, // 1º na origem
      { id: 2, name: 'Bravo', preferences: ['x'], features: [] }, // 2º na origem
      { id: 3, name: 'Charlie', preferences: [], features: [] },
    ];

    const formData = {
      selectedPreferences: ['x'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(formData, demoProducts);

    // Alpha e Bravo empatam no score; ordem deve respeitar o índice original
    expect(recommendations.map(p => p.name)).toEqual(['Alpha', 'Bravo']);
  });
});
