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
    'CAFE_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'AGUA_PEQUENA_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'AGUA_GRANDE_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'BATIDO_PROTEINA_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'BARRA_PROTEINA_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'COOKIES_PROTEICA_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'LIMONADA_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'CADEADO_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'AMINOX_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'TOALHA_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'CERVEJA_MINI_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'AGUA_GAS_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'DONATIVO_001': { nome: 'Donativo BE WATER', iva: 0, categoria: 'Donativos', tax_exempt_reason: 'Artigo 53º do CIVA' }
  };

  // Fallback para produtos não mapeados - usar "Consumivel BEWATER" exceto para donativos
  const produtoVendus = PRODUTOS_VENDUS[dadosProduto.id] || {
    nome: dadosProduto.id?.includes('DONATIVO') ? 'Donativo BE WATER' : 'Consumivel BEWATER',
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
    const input = JSON.parse(event.body);

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

    // Validar dados de fatura: se qualquer campo for fornecido, todos são obrigatórios
    let email = null;
    let nome = null;
    let nif = null;
    
    // Verificar se algum campo de fatura foi preenchido
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
      
      // Se chegou até aqui, todos os campos são válidos
      email = input.email.trim();
      nome = input.nome.trim();
      nif = nifLimpo;
    } else {
      // Sem dados de fatura - validar só se preenchidos individualmente
      if (temEmail) {
        email = input.email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new Error('Email inválido');
        }
      }
      
      if (temNome) {
        nome = input.nome.trim();
        if (nome.length < 2) {
          throw new Error('Nome deve ter pelo menos 2 caracteres');
        }
      }
      
      if (temNif) {
        nif = input.nif.replace(/\D/g, '');
        if (!/^\d{9}$/.test(nif)) {
          throw new Error('NIF inválido');
        }
      }
    }

    // Criar identifier com dados para correlação (encodifica nome, email, NIF)
    const clientDataBase64 = Buffer.from(JSON.stringify({
      nome: nome || '',
      email: email || '',
      nif: nif || '',
      telefone: phone
    })).toString('base64');
    
    // Preparar payload para EuPago (ESTRUTURA CORRETA conforme documentação oficial!)
    const eupagoPayload = {
      payment: {
        amount: {
          currency: "EUR",
          value: produtoId === 'DONATIVO_001' ? inputAmount : produto.preco
        },
        identifier: produtoId === 'DONATIVO_001' ? `Donativo €${inputAmount.toFixed(2)} - BE WATER | ${clientDataBase64}` : `${produto.nome} - BE WATER | ${clientDataBase64}`,
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

      // ARMAZENAR dados do cliente para correlação com webhook posterior
      const clientKey = eupagoResponse.transactionID || eupagoResponse.reference;
      if (clientKey) {
        tempClientData.set(clientKey, {
          nome: nome,
          email: email || '',
          nif: nif,
          telefone: phone,
          timestamp: new Date().toISOString(),
          produtoId: produtoId
        });
        console.log(`💾 Dados cliente armazenados para correlação: ${clientKey}`, {
          nome: nome || 'N/A',
          email: email || 'N/A', 
          nif: nif || 'N/A'
        });
      }

      // 🆕 CRIAR registo "pendente" para aparecer no staff.html
      try {
        const pendingPaymentData = {
          transactionID: eupagoResponse.transactionID,
          reference: eupagoResponse.reference,
          amount: { value: produtoId === 'DONATIVO_001' ? inputAmount : produto.preco }, // Formato EuPago
          status: 'pending', // Status EuPago para pendente
          identifier: produtoId === 'DONATIVO_001' ? `Donativo €${inputAmount.toFixed(2)} - BE WATER | ${clientDataBase64}` : `${produto.nome} - BE WATER | ${clientDataBase64}`,
          date: new Date().toISOString()
        };

        console.log('🚀 Criando registo pendente:', pendingPaymentData);

        // Simular webhook call para criar registo pendente
        const webhookUrl = 'https://cool-starship-a7a3e1.netlify.app/.netlify/functions/payment-webhook';
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-nf-client-connection-ip': '127.0.0.1', // IP local para bypass validação
            'user-agent': 'BE WATER Payment System - Internal Call',
            'x-signature': 'internal-call',
            'x-initialization-vector': 'internal-call'
          },
          body: JSON.stringify({
            data: Buffer.from(JSON.stringify({
              transaction: pendingPaymentData
            })).toString('base64')
          })
        });

        const webhookResult = await webhookResponse.text();
        console.log('📋 Resposta webhook interno:', webhookResponse.status, webhookResult);

        if (webhookResponse.ok) {
          console.log('✅ Registo pendente criado no staff.html');
        } else {
          console.log('⚠️ Não foi possível criar registo pendente:', webhookResult);
        }
      } catch (webhookError) {
        console.log('⚠️ Erro ao criar registo pendente:', webhookError.message);
        // Não é crítico, continuar
      }

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