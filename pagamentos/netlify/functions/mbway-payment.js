// pagamentos/netlify/functions/mbway-payment.js
// Netlify Function para pagamentos MBWay seguros

// Função para emitir fatura na Vendus
async function emitirFaturaVendus(dadosCliente, dadosProduto, dadosPagamento) {
  const VENDUS_CONFIG = {
    api_key: process.env.VENDUS_API_KEY,
    base_url: 'https://www.vendus.pt/ws'
  };

  // Verificar se configuração Vendus existe
  if (!VENDUS_CONFIG.api_key) {
    throw new Error('VENDUS_API_KEY não configurado');
  }

  // Mapear produtos BE WATER → Vendus (Regime de Isenção Artº 53)
  const PRODUTOS_VENDUS = {
    'CAFE_001': { nome: 'Café BE WATER', iva: 0, categoria: 'Consumíveis' },
    'AGUA_001': { nome: 'Água BE WATER', iva: 0, categoria: 'Consumíveis' },
    'BARRITA_001': { nome: 'Barra Proteína BE WATER', iva: 0, categoria: 'Consumíveis' },
    'SHAKER_001': { nome: 'Shaker BE WATER', iva: 0, categoria: 'Consumíveis' },
    'SUPLEMENTO_001': { nome: 'Suplemento Protein BE WATER', iva: 0, categoria: 'Consumíveis' },
    'DONATIVO_001': { nome: 'Donativo BE WATER', iva: 0, categoria: 'Donativos' }
  };

  const produtoVendus = PRODUTOS_VENDUS[dadosProduto.id] || {
    nome: dadosProduto.nome,
    iva: 23,
    categoria: 'Diversos'
  };

  // Determinar nome cliente
  let nomeCliente = 'Consumidor Final';
  if (dadosCliente.nome && dadosCliente.nif) {
    nomeCliente = dadosCliente.nome;
  }

  // Payload para Vendus API (estrutura correta conforme documentação)
  const faturaPayload = {
    customer: {
      name: nomeCliente,
      vat: dadosCliente.nif || null,
      email: dadosCliente.email
    },
    line_items: [{
      name: produtoVendus.nome,
      unit_price: dadosProduto.preco,
      quantity: 1,
      vat_rate: produtoVendus.iva,
      category: produtoVendus.categoria,
      // Campos de regime de isenção - Artº 53 CIVA
      tax_exempt: true,
      tax_exemption_reason: 'Regime de Isenção (Artº 53 do CIVA)',
      tax_exemption_code: 'ART53',
      exemption_code: 'ART53',
      vat_exempt_reason: 'Isenção de IVA ao abrigo do artº 53 do CIVA',
      exempt_article: '53'
    }],
    // Informações fiscais gerais do documento
    tax_regime: 'ISENCAO_ART53',
    tax_exemption_reason: 'Regime de Isenção (Artº 53 do CIVA)',
    vat_exemption_code: 'ART53',
    notes: `Pagamento MBWay - Ref: ${dadosPagamento.reference || dadosPagamento.transactionID} | Regime: Isenção IVA (Artº 53)`,
    payment_method: 'MBWay',
    payment_date: new Date().toISOString()
  };

  console.log('🧾 Emitindo fatura Vendus:', JSON.stringify(faturaPayload, null, 2));

  try {
    // URL correta com API key como parâmetro
    const vendusUrl = `${VENDUS_CONFIG.base_url}/documents/?api_key=${VENDUS_CONFIG.api_key}`;
    
    console.log('🔗 URL Vendus:', vendusUrl);

    const response = await fetch(vendusUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'BE WATER Payment System'
      },
      body: JSON.stringify(faturaPayload)
    });

    const responseText = await response.text();
    console.log('📋 Resposta Vendus status:', response.status);
    console.log('📋 Resposta Vendus body:', responseText);

    if (!response.ok) {
      throw new Error(`Vendus API erro ${response.status}: ${responseText}`);
    }

    const faturaData = JSON.parse(responseText);
    console.log('✅ Fatura Vendus emitida:', faturaData);
    
    return {
      success: true,
      fatura: {
        id: faturaData.id || faturaData.document_id,
        numero: faturaData.number || faturaData.invoice_number,
        url_download: faturaData.download_url || faturaData.pdf_url,
        emitida_em: new Date().toISOString()
      }
    };

  } catch (error) {
    console.error('❌ Erro ao emitir fatura Vendus:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*', // Ajustar para o teu domínio em produção
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Apenas aceitar POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Método não permitido' })
    };
  }

  try {
    // Configuração segura via environment variables
    const EUPAGO_CONFIG = {
      api_key: process.env.EUPAGO_API_KEY, // Variável de ambiente segura
      sandbox_url: 'https://sandbox.eupago.pt/api/v1.02/mbway/create',
      production_url: 'https://clientes.eupago.pt/api/v1.02/mbway/create',
      is_sandbox: false // Usar produção conforme suporte EuPago (API key é de produção)
    };

    console.log('EUPAGO_CONFIG:', {
      has_api_key: !!EUPAGO_CONFIG.api_key,
      is_sandbox: EUPAGO_CONFIG.is_sandbox,
      url: EUPAGO_CONFIG.is_sandbox ? EUPAGO_CONFIG.sandbox_url : EUPAGO_CONFIG.production_url
    });

    // Verificar se a API key existe
    if (!EUPAGO_CONFIG.api_key) {
      throw new Error('API Key não configurada. Verificar variáveis de ambiente.');
    }

    // Produtos permitidos (validação de segurança)
    const PRODUTOS_PERMITIDOS = {
      'CAFE_001': { nome: 'Café', preco: 1.50 },
      'SUPLEMENTO_001': { nome: 'Suplemento Protein', preco: 25.00 },
      'AGUA_001': { nome: 'Água', preco: 1.00 },
      'BARRITA_001': { nome: 'Barra Proteína', preco: 3.50 },
      'SHAKER_001': { nome: 'Shaker BE WATER', preco: 12.00 },
      'DONATIVO_001': { nome: 'Donativo - Salvem os Músculos Abandonados', preco: 5.00 }
    };

    // Parse do body
    const input = JSON.parse(event.body);

    // Validar campos obrigatórios
    const requiredFields = ['amount', 'phone', 'email', 'produto_id'];
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

    // Validar email
    const email = input.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Email inválido');
    }

    // Validar nome e NIF (lógica condicional)
    let nome = null;
    let nif = null;
    
    if (input.nome && input.nome.trim()) {
      nome = input.nome.trim();
      if (nome.length < 2) {
        throw new Error('Nome deve ter pelo menos 2 caracteres');
      }
    }
    
    if (input.nif && input.nif.trim()) {
      nif = input.nif.replace(/\D/g, '');
      if (!/^\d{9}$/.test(nif)) {
        throw new Error('NIF inválido');
      }
      
      // Se tem NIF, nome é obrigatório
      if (!nome) {
        throw new Error('Nome é obrigatório quando NIF é fornecido');
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

    console.log('Fazendo chamada para:', apiUrl);
    console.log('Payload:', JSON.stringify(eupagoPayload, null, 2));
    console.log('API Key (primeiros 10 chars):', EUPAGO_CONFIG.api_key.substring(0, 10) + '...');

    // Fazer chamada à API EuPago com o header correto
    const requestHeaders = {
      'Content-Type': 'application/json',
      'ApiKey': EUPAGO_CONFIG.api_key.trim(),
      'Authorization': `ApiKey ${EUPAGO_CONFIG.api_key.trim()}`
    };
    
    console.log('Headers sendo enviados:', {
      'Content-Type': requestHeaders['Content-Type'],
      'ApiKey': requestHeaders['ApiKey'].substring(0, 10) + '...'
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(eupagoPayload)
    });

    const responseText = await response.text();
    console.log('Resposta EuPago status:', response.status);
    console.log('Resposta EuPago body:', responseText);

    let eupagoResponse;
    try {
      eupagoResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Erro ao parsear resposta:', parseError);
      throw new Error(`Resposta inválida da EuPago: ${responseText}`);
    }

    if (response.ok && eupagoResponse.transactionStatus === 'Success') {
      // Sucesso no pagamento MBWay
      const dadosResposta = {
        reference: eupagoResponse.reference || null,
        transactionID: eupagoResponse.transactionID || null,
        amount: produtoId === 'DONATIVO_001' ? inputAmount : produto.preco,
        produto: produtoId === 'DONATIVO_001' ? `Donativo €${inputAmount.toFixed(2)}` : produto.nome,
        phone_masked: phone.substring(0, 3) + '***' + phone.substring(6),
        instructions: 'Após confirmar o pagamento no telemóvel, apresente o comprovativo ao funcionário BE WATER para receber o seu produto.'
      };

          // NOTA: Fatura será emitida pelo staff após verificação do comprovativo MBWay
    console.log('ℹ️ Pagamento iniciado - fatura será emitida pelo staff após confirmação');
    dadosResposta.instructions = 'Após confirmar o pagamento no telemóvel, apresente o comprovativo ao funcionário BE WATER para receber o produto e fatura.';

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Pedido de pagamento MBWay enviado com sucesso! Confirme o pagamento no seu telemóvel e apresente o comprovativo ao funcionário BE WATER para receber o produto.',
          data: dadosResposta
        })
      };
    } else {
      // Erro da EuPago com mais detalhes
      const errorMessage = eupagoResponse.message || eupagoResponse.error || `Status: ${eupagoResponse.transactionStatus || 'desconhecido'}`;
      console.error('Erro EuPago:', {
        status: response.status,
        response: eupagoResponse
      });
      throw new Error(`EuPago: ${errorMessage} (Status: ${response.status})`);
    }

  } catch (error) {
    console.error('Erro no pagamento:', error.message);
    
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        message: error.message
      })
    };
  }
}; 