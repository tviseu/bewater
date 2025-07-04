// Função para marcar fatura como paga na Vendus (método secundário)
async function marcarFaturaComoPaga(faturaId, valor, dadosPagamento) {
  const VENDUS_CONFIG = {
    api_key: process.env.VENDUS_API_KEY,
    base_url: 'https://www.vendus.pt/ws'
  };

  // Tentativa 1: Endpoint de pagamentos (estrutura comum em APIs de faturação)
  const paymentPayload = {
    document_id: faturaId,
    amount: valor,
    payment_method: 'MBWay',
    payment_date: new Date().toISOString().split('T')[0],
    reference: dadosPagamento.reference || dadosPagamento.transactionID,
    status: 'paid'
  };

  const authHeader = 'Basic ' + Buffer.from(VENDUS_CONFIG.api_key + ':').toString('base64');

  // Tentar vários endpoints possíveis
  const possibleEndpoints = [
    `${VENDUS_CONFIG.base_url}/v1.1/documents/${faturaId}/payments`,
    `${VENDUS_CONFIG.base_url}/v1.1/payments`,
    `${VENDUS_CONFIG.base_url}/v1.1/documents/${faturaId}/payment`,
    `${VENDUS_CONFIG.base_url}/v1.1/documents/${faturaId}/status`
  ];

  for (const endpoint of possibleEndpoints) {
    try {
      console.log(`💳 Tentando marcar como paga via: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify(paymentPayload)
      });

      const responseText = await response.text();
      console.log(`📋 Resposta ${endpoint}:`, response.status, responseText);

      if (response.ok) {
        console.log('✅ Fatura marcada como paga com sucesso!');
        return true;
      }
    } catch (error) {
      console.log(`❌ Endpoint ${endpoint} falhou:`, error.message);
    }
  }

  // Se chegou aqui, nenhum endpoint funcionou
  throw new Error('Nenhum endpoint de pagamento da Vendus funcionou');
}

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
    'CAFE_001': { nome: 'Consumível BE WATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'AGUA_001': { nome: 'Água BE WATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'BARRITA_001': { nome: 'Barra Proteína BE WATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'SHAKER_001': { nome: 'Shaker BE WATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'SUPLEMENTO_001': { nome: 'Suplemento Protein BE WATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'DONATIVO_001': { nome: 'Donativo BE WATER', iva: 0, categoria: 'Donativos', tax_exempt_reason: 'Artigo 53º do CIVA' }
  };

  // Fallback para produtos não mapeados - usar "Consumível BE WATER" exceto para donativos
  const produtoVendus = PRODUTOS_VENDUS[dadosProduto.id] || {
    nome: dadosProduto.id?.includes('DONATIVO') ? 'Donativo BE WATER' : 'Consumível BE WATER',
    iva: 0,
    categoria: dadosProduto.id?.includes('DONATIVO') ? 'Donativos' : 'Consumíveis',
    tax_exempt_reason: 'Artigo 53º do CIVA' // Forçar isenção artigo 53º
  };

  // Determinar nome do cliente (usar "Consumidor Final" se não fornecido)
  const nomeCliente = dadosCliente.nome || "Consumidor Final";

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
    date: new Date().toISOString().split('T')[0],
    // 💳 MARCAR COMO PAGA - Array de pagamentos conforme documentação Vendus
    payments: [{
      amount: dadosProduto.preco,
      payment_method: 'MBWay',
      payment_date: new Date().toISOString().split('T')[0],
      reference: dadosPagamento.reference || dadosPagamento.transactionID
    }]
  };

  try {
    console.log('🧾 Emitindo fatura Vendus (com marcação automática como PAGA):', JSON.stringify(faturaPayload, null, 2));

    // Fazer chamada à API Vendus (conforme documentação oficial)
    const vendusUrl = `${VENDUS_CONFIG.base_url}/v1.1/documents/`;
    
    console.log('🔗 URL Vendus:', vendusUrl);
    
    // Basic Auth conforme documentação (não URL parameter)
    const authHeader = 'Basic ' + Buffer.from(VENDUS_CONFIG.api_key + ':').toString('base64');
    console.log('🔐 Auth header criado:', authHeader.substring(0, 20) + '...');

    const response = await fetch(vendusUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authHeader
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

    // 🎯 TENTAR MARCAR COMO PAGA (caso campos na criação não tenham funcionado)
    const faturaId = faturaData.id || faturaData.document_id;
    if (faturaId) {
      try {
        await marcarFaturaComoPaga(faturaId, dadosProduto.preco, dadosPagamento);
        console.log('💳 Fatura marcada como paga com sucesso');
      } catch (paymentError) {
        console.log('⚠️ Erro ao marcar como paga (fatura criada mas não marcada):', paymentError.message);
        // Não falhar a operação, fatura foi criada
      }
    }

    return {
      success: true,
      fatura: {
        id: faturaData.id || faturaData.document_id,
        numero: faturaData.number || faturaData.invoice_number,
        url_download: faturaData.download_url || faturaData.pdf_url,
        data_emissao: new Date().toISOString()
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

// Base de dados em memória para controlar faturas emitidas
const faturas_emitidas = new Map();

exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Só aceitar POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Método não permitido' })
    };
  }

  try {
    // Parse do body
    const input = JSON.parse(event.body);

    // Validar campos obrigatórios (email não é obrigatório para "Consumidor Final")
    const requiredFields = ['transactionID', 'produto', 'valor'];
    for (const field of requiredFields) {
      if (!input[field]) {
        throw new Error(`Campo obrigatório ausente: ${field}`);
      }
    }

    // Determinar produto ID baseado no nome do produto
    let produtoId = 'CAFE_001'; // Default
    const produtoNome = input.produto.toLowerCase();
    
    if (produtoNome.includes('donativo')) {
      produtoId = 'DONATIVO_001';
    } else if (produtoNome.includes('água')) {
      produtoId = 'AGUA_001';
    } else if (produtoNome.includes('barra') || produtoNome.includes('proteína')) {
      produtoId = 'BARRITA_001';
    } else if (produtoNome.includes('shaker')) {
      produtoId = 'SHAKER_001';
    } else if (produtoNome.includes('suplemento')) {
      produtoId = 'SUPLEMENTO_001';
    }

    // Preparar dados para emissão (usar "Consumidor Final" se sem dados)
    const dadosCliente = {
      nome: input.nome || null,
      nif: input.nif || null,
      email: input.email || 'bewater.faturas@gmail.com' // Email genérico para consumidor final
    };

    const dadosProduto = {
      id: produtoId,
      nome: input.produto,
      preco: parseFloat(input.valor)
    };

    const dadosPagamento = {
      transactionID: input.transactionID,
      reference: input.reference || null
    };

    // 🔒 VERIFICAR SE FATURA JÁ FOI EMITIDA (Prevenir duplicação)
    const faturaKey = `${input.transactionID}_${input.produto}_${input.valor}`;
    
    if (faturas_emitidas.has(faturaKey)) {
      const faturaExistente = faturas_emitidas.get(faturaKey);
      console.log(`⚠️ Tentativa de emissão duplicada bloqueada: ${faturaKey}`);
      
      return {
        statusCode: 409, // Conflict
        headers,
        body: JSON.stringify({
          success: false,
          message: `Fatura já foi emitida anteriormente!\n\nNúmero: ${faturaExistente.numero}\nData: ${new Date(faturaExistente.data_emissao).toLocaleString('pt-PT')}\n\n⚠️ Não é possível emitir faturas duplicadas.`,
          fatura_existente: faturaExistente
        })
      };
    }

    // Emitir fatura
    const resultadoFatura = await emitirFaturaVendus(dadosCliente, dadosProduto, dadosPagamento);

    if (resultadoFatura.success) {
      // 🔒 REGISTRAR fatura emitida para prevenir duplicação
      faturas_emitidas.set(faturaKey, resultadoFatura.fatura);
      console.log(`✅ Fatura registrada no controle de duplicação: ${faturaKey}`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: `Fatura ${resultadoFatura.fatura.numero} emitida com sucesso!`,
          fatura: resultadoFatura.fatura
        })
      };
    } else {
      throw new Error(resultadoFatura.error);
    }

  } catch (error) {
    console.error('❌ Erro na emissão de fatura:', error.message);
    
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