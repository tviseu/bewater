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
    'CAFE_001': { nome: 'Consumível BE WATER', iva: 0, categoria: 'Consumíveis' },
    'AGUA_001': { nome: 'Água BE WATER', iva: 0, categoria: 'Consumíveis' },
    'BARRITA_001': { nome: 'Barra Proteína BE WATER', iva: 0, categoria: 'Consumíveis' },
    'SHAKER_001': { nome: 'Shaker BE WATER', iva: 0, categoria: 'Consumíveis' },
    'SUPLEMENTO_001': { nome: 'Suplemento Protein BE WATER', iva: 0, categoria: 'Consumíveis' },
    'DONATIVO_001': { nome: 'Donativo BE WATER', iva: 0, categoria: 'Donativos' }
  };

  const produtoVendus = PRODUTOS_VENDUS[dadosProduto.id] || {
    nome: dadosProduto.nome || 'Produto BE WATER',
    iva: 0,
    categoria: 'Consumíveis'
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
      qty: 1 // era 'quantity' → agora 'qty'
      // tax_id removido - deixar Vendus calcular automaticamente
    }],
    notes: `Pagamento MBWay - Ref: ${dadosPagamento.reference || dadosPagamento.transactionID}`,
    external_reference: dadosPagamento.reference || dadosPagamento.transactionID,
    date: new Date().toISOString().split('T')[0]
  };

  try {
    console.log('🧾 Emitindo fatura Vendus:', JSON.stringify(faturaPayload, null, 2));

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

    // Emitir fatura
    const resultadoFatura = await emitirFaturaVendus(dadosCliente, dadosProduto, dadosPagamento);

    if (resultadoFatura.success) {
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