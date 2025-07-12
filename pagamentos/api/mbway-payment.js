// pagamentos/api/mbway-payment.js
// Vercel Function para pagamentos MBWay seguros

export default async function handler(req, res) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Ajustar para o teu domínio em produção
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Apenas aceitar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    // Configuração segura via environment variables
    const EUPAGO_CONFIG = {
      api_key: process.env.EUPAGO_API_KEY, // Variável de ambiente segura
      sandbox_url: 'https://sandbox.eupago.pt/api/v1.02/mbway/create',
      production_url: 'https://clientes.eupago.pt/api/v1.02/mbway/create',
      is_sandbox: process.env.EUPAGO_SANDBOX === 'true' // true para sandbox, false para produção
    };

    // Verificar se a API key existe
    if (!EUPAGO_CONFIG.api_key) {
      throw new Error('Configuração da API em falta');
    }

    // Produtos permitidos (validação de segurança)
    const PRODUTOS_PERMITIDOS = {
      'CAFE_001': { nome: 'Café', preco: 0.85 },
      'AGUA_PEQUENA_001': { nome: 'Água Pequena', preco: 1.00 },
      'AGUA_GRANDE_001': { nome: 'Água Grande', preco: 2.00 },
      'BATIDO_PROTEINA_001': { nome: 'Batido Proteína', preco: 2.50 },
      'BARRA_PROTEINA_001': { nome: 'Barra Proteína', preco: 2.50 },
          'COOKIES_PROTEICA_001': { nome: 'Cookies Proteicas', preco: 2.00 },
    'LIMONADA_001': { nome: 'Limonada', preco: 2.50 },
    'CADEADO_001': { nome: 'Cadeado', preco: 10.00 },
      'AMINOX_001': { nome: 'AminoX', preco: 2.50 },
      'TOALHA_001': { nome: 'Toalha Treino/Banho', preco: 15.00 },
      'CERVEJA_MINI_001': { nome: 'Cerveja Mini', preco: 2.00 },
      'AGUA_GAS_001': { nome: 'Água com Gás', preco: 1.50 },
      'DONATIVO_001': { nome: 'Donativo - Salvem os Músculos Abandonados', preco: 5.00 }
    };

    // Parse do body
    const input = req.body;

    // Validar campos obrigatórios  
    const requiredFields = ['amount', 'phone', 'produto_id'];
    for (const field of requiredFields) {
      if (!input[field]) {
        throw new Error(`Campo obrigatório ausente: ${field}`);
      }
    }

    // Validar produto
    const produtoId = input.produto_id;
    if (!PRODUTOS_PERMITIDOS[produtoId]) {
      throw new Error('Produto não encontrado ou não permitido');
    }

    // Validar preço (segurança extra)
    const produto = PRODUTOS_PERMITIDOS[produtoId];
    const inputAmount = parseFloat(input.amount);
    
    // Para donativos, permitir valores variáveis entre €1.00 e €100.00
if (produtoId === 'DONATIVO_001') {
  if (inputAmount < 1.00 || inputAmount > 100.00) {
    throw new Error('Valor do donativo deve estar entre €1.00 e €100.00');
  }
    } else {
      // Para outros produtos, preço deve ser exato
      if (inputAmount !== produto.preco) {
        throw new Error('Preço não corresponde ao produto');
      }
    }

    // Validar telemóvel português
    const phone = input.phone.replace(/\D/g, '');
    if (!/^(9[1236])\d{7}$/.test(phone)) {
      throw new Error('Número de telemóvel inválido');
    }

    // Validar NIF se fornecido
    let nif = null;
    if (input.nif && input.nif.trim()) {
      nif = input.nif.replace(/\D/g, '');
      if (!/^\d{9}$/.test(nif)) {
        throw new Error('NIF inválido');
      }
    }

    // Preparar payload para EuPago (ESTRUTURA CORRETA conforme documentação oficial!)
    const eupagoPayload = {
      payment: {
        amount: {
          currency: "EUR",
          value: produtoId === 'DONATIVO_001' ? inputAmount : produto.preco
        },
        identifier: produtoId === 'DONATIVO_001' ? `Donativo €${inputAmount.toFixed(2)} - BE WATER` : `${produto.nome} - BE WATER`,
        customerPhone: phone,    // SÓ O NÚMERO sem +351
        countryCode: "+351"      // CÓDIGO SEPARADO conforme documentação
      }
    };

    // Adicionar NIF se fornecido
    if (nif) {
      eupagoPayload.payment.customerNIF = nif;
    }

    // Escolher URL (sandbox vs produção)
    const apiUrl = EUPAGO_CONFIG.is_sandbox 
      ? EUPAGO_CONFIG.sandbox_url 
      : EUPAGO_CONFIG.production_url;

    // Fazer chamada à API EuPago
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': EUPAGO_CONFIG.api_key
      },
      body: JSON.stringify(eupagoPayload)
    });

    const eupagoResponse = await response.json();

    if (response.ok && eupagoResponse.transactionStatus === 'Success') {
      // Sucesso
      return res.status(200).json({
        success: true,
        message: 'Pedido de pagamento MBWay enviado com sucesso! Confirme o pagamento no seu telemóvel e apresente o comprovativo ao funcionário BE WATER para receber o produto.',
        data: {
          reference: eupagoResponse.reference || null,
          transactionID: eupagoResponse.transactionID || null,
          amount: produtoId === 'DONATIVO_001' ? inputAmount : produto.preco,
          produto: produtoId === 'DONATIVO_001' ? `Donativo €${inputAmount.toFixed(2)}` : produto.nome,
          phone_masked: phone.substring(0, 3) + '***' + phone.substring(6),
          instructions: 'Após confirmar o pagamento no telemóvel, apresente o comprovativo ao funcionário BE WATER para receber o seu produto.'
        }
      });
    } else {
      // Erro da EuPago
      const errorMessage = eupagoResponse.message || `Status: ${eupagoResponse.transactionStatus || 'desconhecido'}`;
      throw new Error(errorMessage);
    }

  } catch (error) {
    console.error('Erro no pagamento:', error.message);
    
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
} 