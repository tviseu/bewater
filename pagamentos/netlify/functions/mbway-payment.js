// pagamentos/netlify/functions/mbway-payment.js
// Netlify Function para pagamentos MBWay seguros

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
      'SHAKER_001': { nome: 'Shaker BE WATER', preco: 12.00 }
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
    if (parseFloat(input.amount) !== produto.preco) {
      throw new Error('Preço não corresponde ao produto');
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

    // Preparar payload para EuPago (formato correto baseado na documentação)
    const eupagoPayload = {
      amount: produto.preco,
      customerPhone: phone, // EuPago espera 'customerPhone' não 'phone'
      description: `${produto.nome} - BE WATER`,
      channel: 'MBway pagamentos' // Nome exato do canal criado no painel EuPago
    };

    // Adicionar informações do cliente se fornecidas
    if (nif) {
      eupagoPayload.customer = {
        name: 'Cliente BE WATER',
        fiscal_number: nif
      };
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

    if (response.ok && eupagoResponse.success) {
      // Sucesso
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Pagamento criado com sucesso',
          data: {
            reference: eupagoResponse.reference || null,
            amount: produto.preco,
            produto: produto.nome,
            phone_masked: phone.substring(0, 3) + '***' + phone.substring(6)
          }
        })
      };
    } else {
      // Erro da EuPago com mais detalhes
      const errorMessage = eupagoResponse.message || eupagoResponse.error || 'Erro desconhecido da EuPago';
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