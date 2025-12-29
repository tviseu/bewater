// pagamentos/netlify/functions/mbway-payment.js
// Netlify Function para pagamentos MBWay seguros

// Base de dados temporária para correlacionar dados do cliente com webhook
let tempClientData = new Map();

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
    'CAFE_001': { nome: 'Café', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'AGUA_PEQUENA_001': { nome: 'Água Pequena', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'AGUA_GRANDE_001': { nome: 'Água Grande', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'POWERADE_001': { nome: 'Powerade', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'COCA_COLA_ZERO_001': { nome: 'Coca Cola Zero', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'BATIDO_PROTEINA_001': { nome: 'Saqueta de Proteína', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    // New specific bars
    'ENERGY_CRUNCH_BAR_001': { nome: 'Energy Crunch Bar', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'PROTEIN_SNACK_001': { nome: 'Protein Snack', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'BILLION_001': { nome: 'Billion', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'PROTEIN_BROWNIE_001': { nome: 'Protein Brownie', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'COOKIES_PROTEICA_001': { nome: 'Cookies e Waffles Proteicas', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'LIMONADA_001': { nome: 'Limonada', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'CADEADO_001': { nome: 'Cadeado', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'SABONETE_CARVAO_001': { nome: 'Sabonete Carvão Activado', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'AMINOX_001': { nome: 'AminoX', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'TOALHA_001': { nome: 'Toalha Treino/Banho', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'CERVEJA_MINI_001': { nome: 'Cerveja Mini', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'SOMMERSBY_001': { nome: 'Sommersby', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'AGUA_GAS_001': { nome: 'Água com Gás', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'RED_BULL_001': { nome: 'Red Bull', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'YOPRO_001': { nome: 'YoPro Iogurte Proteico', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'MILBONA_001': { nome: 'Milbona - Iogurte Proteico (35g proteína)', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'DROP_IN_001': { nome: 'Drop In (Aula avulso)', iva: 0, categoria: 'Serviços', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'DONATIVO_001': { nome: 'Donativo BE WATER', iva: 0, categoria: 'Donativos', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'EVENTO_SAOMARTINHO_001': { nome: 'Inscrição Evento São Martinho', iva: 0, categoria: 'Eventos', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'GOLDEN_TICKET_2024': { nome: 'Golden Ticket de Natal', iva: 0, categoria: 'Serviços', tax_exempt_reason: 'Artigo 53º do CIVA' }
  };

  // Novos produtos físicos
  PRODUTOS_VENDUS['LIGADURAS_001'] = { nome: 'Ligaduras BeWater', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' };
  PRODUTOS_VENDUS['LUVAS_BOXE_001'] = { nome: 'Luvas de Boxe BeWater', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' };
  PRODUTOS_VENDUS['GARRAFA_HYDRA_001'] = { nome: 'Garrafa de Água Hydra', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' };

  // Fallback para produtos não mapeados - usar nome específico exceto para donativos
  const produtoVendus = PRODUTOS_VENDUS[dadosProduto.id] || {
    nome: dadosProduto.id?.includes('DONATIVO') ? 'Donativo BE WATER' : dadosProduto.nome || 'Produto BE WATER',
    iva: 0,
    categoria: dadosProduto.id?.includes('DONATIVO') ? 'Donativos' : 'Consumíveis',
    tax_exempt_reason: 'Artigo 53º do CIVA' // Forçar isenção artigo 53º
  };

  // Determinar nome cliente
  let nomeCliente = 'Consumidor Final';
  if (dadosCliente.nome && dadosCliente.nif) {
    nomeCliente = dadosCliente.nome;
  }

  // Payload para Vendus API (estrutura FINAL conforme documentação oficial)
  const faturaPayload = {
    type: 'FT', // Fatura (códigos aceites: FT, FS, FR, NC, DC, PF, OT, EC, GA, GT, GR, GD, RG)
    client: {
      name: nomeCliente,
      fiscal_id: dadosCliente.nif || null, // era 'vat' → agora 'fiscal_id'
      email: dadosCliente.email
    },
    items: [{
      reference: dadosProduto.id, // OBRIGATÓRIO: id ou reference conforme documentação
      title: produtoVendus.nome, // era 'name' → agora 'title'
      gross_price: dadosProduto.preco, // era 'unit_price' → agora 'gross_price'
      qty: 1, // era 'quantity' → agora 'qty'
      tax_exemption: true, // Produto isento de IVA
      tax_exemption_law: 'Artigo 53º do CIVA' // Lei de isenção específica
    }],
    notes: `Pagamento MBWay - Ref: ${dadosPagamento.reference || dadosPagamento.transactionID}`,
    external_reference: dadosPagamento.reference || dadosPagamento.transactionID,
    date: new Date().toISOString().split('T')[0]
  };

  console.log('🧾 Emitindo fatura Vendus:', JSON.stringify(faturaPayload, null, 2));

  try {
    // URL correta conforme documentação oficial
    const vendusUrl = `${VENDUS_CONFIG.base_url}/v1.1/documents/`;
    
    console.log('🔗 URL Vendus:', vendusUrl);
    
    // Basic Auth conforme documentação (não URL parameter)
    const authHeader = 'Basic ' + Buffer.from(VENDUS_CONFIG.api_key + ':').toString('base64');
    console.log('🔐 Auth header criado:', authHeader.substring(0, 20) + '...');

    const response = await fetch(vendusUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
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
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // GET: Retornar dados temporários do cliente (para correlação com webhook)
  if (event.httpMethod === 'GET') {
    const clientKey = event.queryStringParameters?.key;
    if (!clientKey) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Client key required' })
      };
    }

    const clientData = tempClientData.get(clientKey);
    if (!clientData) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ success: false, message: 'Client data not found' })
      };
    }

    // Limpar dados após recuperação (one-time use)
    tempClientData.delete(clientKey);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        clientData: clientData
      })
    };
  }

  // Apenas aceitar POST para pagamentos
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
      'CAFE_001': { nome: 'Café', preco: 0.85 },
      'AGUA_PEQUENA_001': { nome: 'Água Pequena', preco: 1.00 },
      'AGUA_GRANDE_001': { nome: 'Água Grande', preco: 1.50 },
      'POWERADE_001': { nome: 'Powerade', preco: 2.90 },
      'COCA_COLA_ZERO_001': { nome: 'Coca Cola Zero', preco: 1.50 },
      'BATIDO_PROTEINA_001': { nome: 'Saqueta de Proteína', preco: 2.50 },
      // Novas barras específicas
      'ENERGY_CRUNCH_BAR_001': { nome: 'Energy Crunch Bar', preco: 2.00 },
      'PROTEIN_SNACK_001': { nome: 'Protein Snack', preco: 1.60 },
      'BILLION_001': { nome: 'Billion', preco: 2.50 },
      'PROTEIN_BROWNIE_001': { nome: 'Protein Brownie', preco: 2.50 },
      'COOKIES_PROTEICA_001': { nome: 'Cookies e Waffles Proteicas', preco: 2.50 },
      'LIMONADA_001': { nome: 'Limonada', preco: 2.50 },
      'CADEADO_001': { nome: 'Cadeado', preco: 10.00 },
      'SABONETE_CARVAO_001': { nome: 'Sabonete Carvão Activado', preco: 2.50 },
      'AMINOX_001': { nome: 'AminoX', preco: 2.50 },
      'TOALHA_001': { nome: 'Toalha Treino/Banho', preco: 15.00 },
      'CERVEJA_MINI_001': { nome: 'Cerveja Mini', preco: 1.90 },
      'SOMMERSBY_001': { nome: 'Sommersby', preco: 1.95 },
      'AGUA_GAS_001': { nome: 'Água com Gás', preco: 1.50 },
      'RED_BULL_001': { nome: 'Red Bull', preco: 2.50 },
      'YOPRO_001': { nome: 'YoPro Iogurte Proteico', preco: 2.60 },
      'MILBONA_001': { nome: 'Milbona - Iogurte Proteico (35g proteína)', preco: 2.20 },
      'DROP_IN_001': { nome: 'Drop In (Aula avulso)', preco: 15.00 },
      'DONATIVO_001': { nome: 'Donativo - Salvem os Músculos Abandonados', preco: 5.00 },
      // Novos produtos físicos
      'LIGADURAS_001': { nome: 'Ligaduras BeWater', preco: 10.00 },
      'LUVAS_BOXE_001': { nome: 'Luvas de Boxe BeWater', preco: 59.00 },
      'GARRAFA_HYDRA_001': { nome: 'Garrafa de Água Hydra', preco: 19.00 },
      // Eventos
      'EVENTO_SAOMARTINHO_001': { nome: 'São Martinho no BE WATER - Inscrição Externa', preco: 15.00 },
      'GOLDEN_TICKET_2024': { nome: 'Golden Ticket de Natal', preco: 30.00 }
    };

    // Parse do body
    const input = JSON.parse(event.body);

    // Suporte para múltiplos produtos (carrinho) ou produto único (legacy)
    const isMultiProduct = input.produtos && Array.isArray(input.produtos);
    let produtos = [];
    let totalCalculado = 0;

    if (isMultiProduct) {
      // Modo carrinho - múltiplos produtos
      if (input.produtos.length === 0) {
        throw new Error('Carrinho vazio');
      }

      // Validar cada produto
      for (const item of input.produtos) {
        if (!item.produto_id || !item.nome || item.preco === undefined || !item.quantidade) {
          throw new Error('Dados do produto incompletos no carrinho');
        }

        const produtoId = item.produto_id;
        
        // Validar se produto existe
        if (!PRODUTOS_PERMITIDOS[produtoId]) {
          throw new Error(`Produto não permitido: ${produtoId}`);
        }

        const produtoConfig = PRODUTOS_PERMITIDOS[produtoId];
        const precoUnitario = parseFloat(item.preco);
        const quantidade = parseInt(item.quantidade);

        // Validar preço (exceto donativos que têm preço variável)
        if (produtoId !== 'DONATIVO_001') {
          // Usar comparação com tolerância para evitar problemas de precisão de ponto flutuante
          if (Math.abs(precoUnitario - produtoConfig.preco) > 0.01) {
            throw new Error(`Preço inválido para ${item.nome}: esperado €${produtoConfig.preco.toFixed(2)}, recebido €${precoUnitario.toFixed(2)}`);
          }
        } else {
          // Validar donativo
          if (precoUnitario < 1.00 || precoUnitario > 100.00) {
            throw new Error('Valor do donativo deve estar entre €1.00 e €100.00');
          }
        }

        // Validar quantidade
        if (quantidade < 1 || quantidade > 99) {
          throw new Error(`Quantidade inválida para ${item.nome}`);
        }

        const subtotal = precoUnitario * quantidade;
        totalCalculado += subtotal;

        produtos.push({
          produto_id: produtoId,
          nome: item.nome,
          preco: precoUnitario,
          quantidade: quantidade,
          subtotal: subtotal
        });
      }

      // Validar total
      const inputAmount = parseFloat(input.amount);
      if (Math.abs(inputAmount - totalCalculado) > 0.01) {
        throw new Error('Total do carrinho não corresponde à soma dos produtos');
      }

    } else {
      // Modo legacy - produto único
      const requiredFields = ['amount', 'phone', 'produto_id'];
      for (const field of requiredFields) {
        if (!input[field]) {
          throw new Error(`Campo obrigatório ausente: ${field}`);
        }
      }

      const produtoId = input.produto_id;
      if (!PRODUTOS_PERMITIDOS[produtoId]) {
        throw new Error('Produto não encontrado ou não permitido');
      }

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

      // Converter para formato de array para processamento uniforme
      produtos.push({
        produto_id: produtoId,
        nome: produto.nome,
        preco: inputAmount,
        quantidade: 1,
        subtotal: inputAmount
      });
      
      totalCalculado = inputAmount;
    }

    // Validar telemóvel português
    const phone = input.phone.replace(/\D/g, '');
    if (!/^(9[1236])\d{7}$/.test(phone)) {
      throw new Error('Número de telemóvel inválido');
    }

    // Validar dados de fatura
    let email = null;
    let nome = null;
    let nif = null;
    
    // Verificar se algum produto é evento (para validação especial)
    const hasEvento = produtos.some(p => p.produto_id.includes('EVENTO'));
    // Verificar se algum produto é Golden Ticket (NIF opcional, não exige fatura completa)
    const hasGoldenTicket = produtos.some(p => p.produto_id === 'GOLDEN_TICKET_2024');
    
    // Email sempre validado se fornecido
    if (input.email && input.email.trim()) {
      email = input.email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Email inválido');
      }
    }
    
    // Nome sempre validado se fornecido
    if (input.nome && input.nome.trim()) {
      nome = input.nome.trim();
      if (nome.length < 2) {
        throw new Error('Nome deve ter pelo menos 2 caracteres');
      }
    }
    
    // NIF é opcional - só valida se fornecido
    if (input.nif && input.nif.trim()) {
      nif = input.nif.replace(/\D/g, '');
      if (!/^\d{9}$/.test(nif)) {
        throw new Error('NIF deve ter 9 dígitos');
      }
    }
    
    // Para produtos do bar (não eventos, não Golden Ticket), validação de fatura completa
    if (!hasEvento && !hasGoldenTicket) {
      const temEmail = input.email && input.email.trim();
      const temNome = input.nome && input.nome.trim();
      const temNif = input.nif && input.nif.trim();
      const temDadosFatura = temEmail || temNome || temNif;
      
      if (temDadosFatura) {
        // Se tem dados de fatura, todos os campos são obrigatórios
        if (!temEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
          throw new Error('Para emitir fatura, email é obrigatório e deve ser válido');
        }
        
        if (!temNome || input.nome.trim().length < 2) {
          throw new Error('Para emitir fatura, nome é obrigatório (mínimo 2 caracteres)');
        }
        
        const nifLimpo = input.nif ? input.nif.replace(/\D/g, '') : '';
        if (!temNif || !/^\d{9}$/.test(nifLimpo)) {
          throw new Error('Para emitir fatura, NIF é obrigatório e deve ter 9 dígitos');
        }
      }
    }
    
    // Para Golden Ticket: Se forneceu NIF, valida; se não forneceu, não exige (NIF opcional)
    if (hasGoldenTicket && input.nif && input.nif.trim()) {
      const nifLimpo = input.nif.replace(/\D/g, '');
      if (!/^\d{9}$/.test(nifLimpo)) {
        throw new Error('NIF deve ter 9 dígitos');
      }
      nif = nifLimpo;
    }

    // Criar identifier com dados para correlação (encodifica nome, email, NIF)
    // NOTA: NÃO incluir produtos aqui (tornaria identifier muito longo para EuPago)
    // Produtos são armazenados em tempClientData para correlação posterior
    const clientDataBase64 = Buffer.from(JSON.stringify({
      nome: nome || '',
      email: email || '',
      nif: nif || '',
      telefone: phone
    })).toString('base64');
    
    // Criar descrição do pagamento (CURTA para não ultrapassar limite do identifier)
    let paymentDescription;
    if (produtos.length === 1) {
      // Produto único
      const p = produtos[0];
      if (p.produto_id === 'DONATIVO_001') {
        paymentDescription = `Donativo €${p.preco.toFixed(2)}`;
      } else {
        // Limitar nome a 30 chars para garantir que identifier não excede limite
        const nomeCorto = p.nome.length > 30 ? p.nome.substring(0, 27) + '...' : p.nome;
        paymentDescription = `${nomeCorto}${p.quantidade > 1 ? ` x${p.quantidade}` : ''}`;
      }
    } else {
      // Múltiplos produtos - descrição curta
      paymentDescription = `${produtos.length} items €${totalCalculado.toFixed(2)}`;
    }
    
    // Preparar identifier (deve ter < 255 chars)
    let identifier = `${paymentDescription} | ${clientDataBase64}`;
    
    // Validar tamanho do identifier
    if (identifier.length > 255) {
      console.warn(`⚠️ ATENÇÃO: Identifier muito longo (${identifier.length} chars), truncando...`);
      // Truncar se necessário (priorizar clientDataBase64)
      const maxDescLength = 255 - clientDataBase64.length - 3; // 3 = " | "
      const descTruncada = paymentDescription.substring(0, maxDescLength);
      identifier = `${descTruncada} | ${clientDataBase64}`;
    }
    
    console.log(`📏 Tamanho identifier: ${identifier.length} chars (limite: 255)`);
    
    // Preparar payload para EuPago (ESTRUTURA CORRETA conforme documentação oficial!)
    const eupagoPayload = {
      payment: {
        amount: {
          currency: "EUR",
          value: totalCalculado
        },
        identifier: identifier,
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
        amount: totalCalculado,
        produto: paymentDescription,
        phone_masked: phone.substring(0, 3) + '***' + phone.substring(6),
        instructions: 'Após confirmar o pagamento no telemóvel, apresente o comprovativo ao funcionário BE WATER para receber o seu produto.',
        items_count: produtos.length
      };

      // ARMAZENAR dados do cliente para correlação com webhook posterior
      const clientKey = eupagoResponse.transactionID || eupagoResponse.reference;
      if (clientKey) {
        tempClientData.set(clientKey, {
          nome: nome,
          email: email || '',
          nif: nif,
          telefone: phone,
          timestamp: new Date().toISOString(),
          produtos: produtos // Armazenar todos os produtos
        });
        console.log(`💾 Dados cliente armazenados para correlação: ${clientKey}`, {
          nome: nome || 'N/A',
          email: email || 'N/A', 
          nif: nif || 'N/A',
          produtos_count: produtos.length
        });
      }

              // 🆕 CRIAR registos "pendentes" para aparecer no staff.html (um por produto)
        try {
          // Usar timestamp consistente em UTC
          const utcTimestamp = new Date().toISOString();
          
          // Criar um registo pendente para cada produto
          for (const produto of produtos) {
            const pendingPaymentData = {
              transaction: {
                transactionID: eupagoResponse.transactionID,
                reference: eupagoResponse.reference,
                amount: { value: produto.subtotal }, // Subtotal do produto
                status: 'pending',
                identifier: `${produto.nome}${produto.quantidade > 1 ? ` x${produto.quantidade}` : ''} - BE WATER | ${clientDataBase64}`,
                date: utcTimestamp,
                // Campos adicionais para multi-produto
                produto_id: produto.produto_id,
                produto_nome: produto.nome,
                quantidade: produto.quantidade,
                preco_unitario: produto.preco,
                is_multi_product: produtos.length > 1,
                multi_product_count: produtos.length
              }
            };

            console.log(`🚀 Criando registo pendente para: ${produto.nome} x${produto.quantidade}`);

            // Simular webhook call para criar registo pendente
            const webhookUrl = 'https://pagamentos.bewaterlisboa.pt/.netlify/functions/payment-webhook';
            const webhookResponse = await fetch(webhookUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-nf-client-connection-ip': '127.0.0.1',
                'user-agent': 'BE WATER Payment System - Internal Call',
                'x-signature': 'internal-call',
                'x-initialization-vector': 'internal-call'
              },
              body: JSON.stringify({
                data: Buffer.from(JSON.stringify(pendingPaymentData)).toString('base64')
              })
            });

            const webhookResult = await webhookResponse.text();
            console.log(`📋 Resposta webhook para ${produto.nome}:`, webhookResponse.status);

            if (!webhookResponse.ok) {
              console.log('⚠️ Não foi possível criar registo pendente:', webhookResult);
            }
          }
          
          console.log(`✅ ${produtos.length} registo(s) pendente(s) criado(s) no staff.html`);
      } catch (webhookError) {
        console.log('⚠️ Erro ao criar registos pendentes:', webhookError.message);
        // Não é crítico, continuar
      }

      // NOTA: Fatura será emitida pelo staff após verificação do comprovativo MBWay
      console.log('ℹ️ Pagamento iniciado - fatura será emitida pelo staff após confirmação');
      dadosResposta.instructions = 'Após confirmar o pagamento no telemóvel, apresente o comprovativo ao funcionário BE WATER para receber o produto e fatura.';

      if (produtos.some(p => p.produto_id === 'GOLDEN_TICKET_2024')) {
        dadosResposta.instructions = 'Após confirmar o pagamento na App MB WAY, a equipa BE WATER validará o pagamento. Receberás por email a cópia virtual do ticket. Se preferires, fala connosco para levantares a versão física no ginásio.';
      }

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