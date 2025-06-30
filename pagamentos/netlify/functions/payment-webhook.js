const crypto = require('crypto');

// Base de dados simples em memória (em produção usar DB real)
let paymentsDB = new Map();

exports.handler = async (event, context) => {
  console.log('🔔 Webhook recebido:', event.httpMethod);
  
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Signature',
    'Access-Control-Allow-Methods': 'POST, GET',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // GET: Listar pagamentos (para interface staff)
  if (event.httpMethod === 'GET') {
    const payments = Array.from(paymentsDB.values())
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 50); // Últimos 50 pagamentos

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        payments: payments
      })
    };
  }

  // POST: Receber webhook do EuPago
  if (event.httpMethod === 'POST') {
    try {
      // Chave criptográfica do EuPago (variável de ambiente)
      const WEBHOOK_SECRET = process.env.EUPAGO_WEBHOOK_SECRET;
      
      if (!WEBHOOK_SECRET) {
        console.error('❌ EUPAGO_WEBHOOK_SECRET não configurado');
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ success: false, message: 'Webhook secret não configurado' })
        };
      }

      // Extrair body do evento
      const body = event.body;
      
      // DEBUG: Ver todos os dados recebidos
      console.log('🔍 Headers recebidos:', JSON.stringify(event.headers, null, 2));
      console.log('📦 Body recebido (raw):', body);
      console.log('📏 Tamanho body:', body ? body.length : 'null');
      console.log('🔐 WEBHOOK_SECRET configurado:', WEBHOOK_SECRET ? 'SIM' : 'NÃO');

      // TEMPORÁRIO: IGNORAR verificação de assinatura (EuPago usa AES complexo)
      const signature = event.headers['x-signature'] || event.headers['X-Signature'];
      console.log('✍️ Assinatura encontrada:', signature ? 'SIM' : 'NÃO');
      console.log('🔑 Initialization Vector:', event.headers['x-initialization-vector']);
      
      console.log('⚠️ MODO DEBUG: Ignorando verificação de assinatura temporariamente');
      console.log('🚀 Processando webhook...');

      // Parse do payload
      const webhookData = JSON.parse(body);
      console.log('📦 Dados webhook:', JSON.stringify(webhookData, null, 2));

      // Extrair informações do webhook EuPago
      const {
        transactionID,
        reference,
        amount,
        status,
        identifier,
        customerPhone,
        timestamp
      } = webhookData;

      // Determinar status do pagamento
      let paymentStatus;
      if (status === 'success' || status === 'paid' || status === 'confirmed') {
        paymentStatus = 'confirmado';
      } else if (status === 'failed' || status === 'error') {
        paymentStatus = 'falhado';
      } else {
        paymentStatus = 'pendente';
      }

      // Criar/atualizar registro do pagamento
      const paymentRecord = {
        id: transactionID || reference || `payment_${Date.now()}`,
        transactionID: transactionID,
        reference: reference,
        produto: identifier || 'Produto BE WATER',
        valor: parseFloat(amount) || 0,
        telefone: customerPhone ? customerPhone.substring(0, 3) + '***' + customerPhone.substring(6) : 'N/A',
        status: paymentStatus,
        timestamp: timestamp || new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        entregue: false
      };

      // Guardar na "base de dados"
      paymentsDB.set(paymentRecord.id, paymentRecord);

      console.log(`✅ Pagamento ${paymentStatus}:`, paymentRecord);

      // Log específico por tipo
      if (paymentStatus === 'confirmado') {
        console.log(`🎉 PAGAMENTO CONFIRMADO! ${paymentRecord.produto} - €${paymentRecord.valor} - ${paymentRecord.telefone}`);
      } else if (paymentStatus === 'falhado') {
        console.log(`❌ PAGAMENTO FALHADO! ${paymentRecord.produto} - €${paymentRecord.valor} - ${paymentRecord.telefone}`);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Webhook processado com sucesso',
          payment: paymentRecord
        })
      };

    } catch (error) {
      console.error('❌ Erro no webhook:', error.message);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: error.message
        })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ success: false, message: 'Método não permitido' })
  };
}; 