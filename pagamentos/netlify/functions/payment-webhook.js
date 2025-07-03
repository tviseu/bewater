const crypto = require('crypto');

// Base de dados simples em memória (em produção usar DB real)
let paymentsDB = new Map();

// �� DADOS DE TESTE - Faturas para testar API Vendus (2 categorias)

// Pagamento teste 1: DONATIVOS (€5.00)
paymentsDB.set('test_payment_donativos', {
  id: 'test_payment_donativos',
  transactionID: 'TEST-DON-001',
  reference: '87654321',
  produto: 'TESTE Donativo €5.00 - BE WATER',
  valor: 5.00,
  telefone: '935***778',
  nome: 'João Teste',
  email: 'joao.teste@bewater.pt',
  nif: '238494900',
  status: 'confirmado',
  timestamp: new Date().toISOString(),
  lastUpdate: new Date().toISOString(),
  fatura: null,
  fatura_emitida: false
});

// Pagamento teste 2: CONSUMÍVEIS (€0.02)
paymentsDB.set('test_payment_consumiveis', {
  id: 'test_payment_consumiveis',
  transactionID: 'TEST-CON-001',
  reference: '12345678',
  produto: 'TESTE Consumível €0.02 - BE WATER',
  valor: 0.02,
  telefone: '935***778',
  nome: 'João Teste',
  email: 'joao.teste@bewater.pt',
  nif: '238494900',
  status: 'confirmado',
  timestamp: new Date().toISOString(),
  lastUpdate: new Date().toISOString(),
  fatura: null,
  fatura_emitida: false
});

// Pagamento teste 3: PENDENTE (€1.50)
paymentsDB.set('test_payment_pendente', {
  id: 'test_payment_pendente',
  transactionID: 'TEST-PEN-001',
  reference: '11111111',
  produto: 'TESTE Consumível €1.50 - BE WATER (Pendente)',
  valor: 1.50,
  telefone: '935***456',
  nome: 'Maria Pendente',
  email: 'maria@bewater.pt',
  nif: null,
  status: 'pendente',
  timestamp: new Date().toISOString(),
  lastUpdate: new Date().toISOString(),
  fatura: null,
  fatura_emitida: false
});

// Pagamento teste 4: FALHADO (€3.50)
paymentsDB.set('test_payment_falhado', {
  id: 'test_payment_falhado',
  transactionID: 'TEST-FAL-001',
  reference: '99999999',
  produto: 'TESTE Barra Proteína €3.50 - BE WATER (Falhado)',
  valor: 3.50,
  telefone: '935***789',
  nome: 'José Falhado',
  email: 'jose@bewater.pt',
  nif: '123456789',
  status: 'falhado',
  timestamp: new Date().toISOString(),
  lastUpdate: new Date().toISOString(),
  fatura: null,
  fatura_emitida: false
});

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

  // GET: Listar pagamentos (para interface staff) OU criar teste pendente
  if (event.httpMethod === 'GET') {
    // Parâmetro especial para criar registo de teste pendente
    if (event.queryStringParameters?.test === 'pending') {
      const testPayment = {
        id: `test_pending_${Date.now()}`,
        transactionID: `TEST-PEN-${Date.now()}`,
        reference: Math.floor(Math.random() * 90000000) + 10000000,
        produto: 'TESTE Consumível - BE WATER (Pendente)',
        valor: 1.50,
        telefone: '935***123',
        nome: 'Teste Pendente',
        email: 'teste@bewater.pt',
        nif: null,
        status: 'pendente',
        timestamp: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        fatura: null,
        fatura_emitida: false
      };

      paymentsDB.set(testPayment.id, testPayment);
      console.log('🧪 Registo de teste pendente criado:', testPayment);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Registo de teste pendente criado',
          payment: testPayment
        })
      };
    }

    const payments = Array.from(paymentsDB.values())
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 50); // Últimos 50 pagamentos

    console.log('📊 GET /payment-webhook - Retornando pagamentos:');
    console.log(`📈 Total na DB: ${paymentsDB.size}`);
    console.log(`📤 Enviando: ${payments.length} pagamentos`);
    
    // Log detalhado dos primeiros 3 pagamentos
    payments.slice(0, 3).forEach((payment, index) => {
      console.log(`📋 Pagamento ${index + 1}:`, {
        id: payment.id,
        produto: payment.produto,
        valor: payment.valor,
        status: payment.status,
        timestamp: payment.timestamp
      });
    });

    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        payments: payments,
        debug: {
          totalInDB: paymentsDB.size,
          returning: payments.length,
          timestamp: new Date().toISOString()
        }
      })
    };

    console.log('✅ Resposta enviada para staff.html');
    return response;
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

      // SEGURANÇA: Verificação obrigatória de origem
      const clientIP = event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'];
      const userAgent = event.headers['user-agent'];
      
      // Verificar se é chamada interna do sistema BE WATER
      const isInternalCall = userAgent && userAgent.includes('BE WATER Payment System - Internal Call');
      
      // Validar IP da EuPago (range conhecido)
      const isEupagoIP = clientIP && (
        clientIP.startsWith('3.75.') ||     // AWS EuPago
        clientIP.startsWith('18.195.') ||   // AWS EuPago
        clientIP.startsWith('35.156.')      // AWS EuPago
      );
      
      // Validar User-Agent EuPago
      const isEupagoUA = userAgent && userAgent.includes('Java/17.0.9');
      
      console.log('🔍 Verificações de segurança:');
      console.log('📍 IP Cliente:', clientIP);
      console.log('🤖 User-Agent:', userAgent);
      console.log('🏠 Chamada interna:', isInternalCall);
      console.log('✅ IP EuPago válido:', isEupagoIP);
      console.log('✅ User-Agent EuPago:', isEupagoUA);
      
      // ACEITAR chamadas internas do sistema OU da EuPago
      if (!isInternalCall && (!isEupagoIP || !isEupagoUA)) {
        console.error('🚫 ACESSO NEGADO - Origem suspeita:', { clientIP, userAgent });
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ success: false, message: 'Access denied' })
        };
      }
      
      // Verificar presença de assinatura e IV (pular validação para chamadas internas)
      const signature = event.headers['x-signature'];
      const iv = event.headers['x-initialization-vector'];
      
      if (!isInternalCall && (!signature || !iv)) {
        console.error('🚫 WEBHOOK INVÁLIDO - Falta assinatura ou IV');
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: 'Invalid webhook format' })
        };
      }
      
      console.log('✅ Origem validada - processando webhook...');

      // Parse do payload
      const webhookData = JSON.parse(body);
      console.log('📦 Dados webhook (raw):', JSON.stringify(webhookData, null, 2));

      // Decriptar dados EuPago (ou usar dados diretos para chamadas internas)
      let decryptedData = {};
      if (isInternalCall) {
        // Para chamadas internas, dados já estão decodificados
        try {
          const internalData = Buffer.from(webhookData.data, 'base64').toString('utf8');
          decryptedData = JSON.parse(internalData);
          console.log('🏠 Dados internos processados:', JSON.stringify(decryptedData, null, 2));
        } catch (internalError) {
          console.error('❌ Erro ao processar dados internos:', internalError.message);
          decryptedData = {}; // Fallback
        }
      } else if (webhookData.data) {
        try {
          const ivBuffer = Buffer.from(iv, 'base64');
          const encryptedData = Buffer.from(webhookData.data, 'base64');
          
          console.log('🔑 IV extraído:', ivBuffer.toString('hex'));
          console.log('📦 Dados encriptados (primeiros 50 chars):', encryptedData.toString('hex').substring(0, 50) + '...');
          
          // Tentar decriptar com AES-256-CBC
          const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(WEBHOOK_SECRET, 'utf8'), ivBuffer);
          let decrypted = decipher.update(encryptedData, null, 'utf8');
          decrypted += decipher.final('utf8');
          
          console.log('🔓 Dados decriptados (raw):', decrypted);
          decryptedData = JSON.parse(decrypted);
          console.log('✅ Dados decriptados (JSON):', JSON.stringify(decryptedData, null, 2));
          
        } catch (decryptError) {
          console.error('❌ Erro na decriptação:', decryptError.message);
          console.log('🔄 Tentando outros algoritmos...');
          
          // Tentar outros algoritmos comuns
          const algorithms = ['aes-128-cbc', 'aes-192-cbc', 'aes-256-cbc'];
          
          for (const algorithm of algorithms) {
            try {
              console.log(`🔄 Tentando ${algorithm}...`);
              const ivBuffer2 = Buffer.from(iv, 'base64');
              const encryptedData = Buffer.from(webhookData.data, 'base64');
              const decipher = crypto.createDecipheriv(algorithm, Buffer.from(WEBHOOK_SECRET, 'utf8').slice(0, algorithm === 'aes-128-cbc' ? 16 : algorithm === 'aes-192-cbc' ? 24 : 32), ivBuffer2);
              let decrypted = decipher.update(encryptedData, null, 'utf8');
              decrypted += decipher.final('utf8');
              decryptedData = JSON.parse(decrypted);
              console.log(`✅ Sucesso com ${algorithm}:`, JSON.stringify(decryptedData, null, 2));
              break;
            } catch (algoError) {
              console.log(`❌ ${algorithm} falhou:`, algoError.message);
            }
          }
          
          // Se nada funcionou, usar dados vazios para debug
          if (Object.keys(decryptedData).length === 0) {
            console.log('⚠️ Usando dados vazios para debug');
            decryptedData = webhookData; // Fallback para dados originais
          }
        }
      }

      // Extrair informações do webhook EuPago (dados decriptados)
      // EuPago estrutura: { channel: {...}, transaction: {...} }
      const transaction = decryptedData.transaction || {};
      
      const transactionID = transaction.trid || transaction.transactionID;
      const reference = transaction.reference;
      const amount = transaction.amount ? parseFloat(transaction.amount.value) : 0;
      const status = transaction.status;
      const identifier = transaction.identifier;
      const customerPhone = transaction.customerPhone || null; // Webhook não tem telefone
      const timestamp = transaction.date;
      
      console.log('🔍 Campos extraídos:', {
        transactionID,
        reference, 
        amount,
        status,
        identifier,
        timestamp
      });

      // Determinar status do pagamento (EuPago valores: "Paid", "Failed", "Pending", etc.)
      let paymentStatus;
      if (status === 'Paid' || status === 'paid' || status === 'success' || status === 'confirmed') {
        paymentStatus = 'confirmado';
      } else if (status === 'Failed' || status === 'failed' || status === 'error' || status === 'Error') {
        paymentStatus = 'falhado';
      } else {
        paymentStatus = 'pendente';
      }
      
      console.log(`📊 Status mapeado: "${status}" → "${paymentStatus}"`);

      // 🔍 EXTRAIR dados cliente do identifier (Nova Abordagem Robusta!)
      let clientData = null;
      
      // Método 1: Extrair do identifier (formato: "Produto - BE WATER | base64ClientData")
      try {
        if (identifier && identifier.includes(' | ')) {
          const parts = identifier.split(' | ');
          if (parts.length >= 2) {
            const clientDataBase64 = parts[1];
            const clientDataJson = Buffer.from(clientDataBase64, 'base64').toString('utf8');
            clientData = JSON.parse(clientDataJson);
            
            console.log(`✅ Dados cliente extraídos do identifier:`, {
              nome: clientData.nome || 'N/A',
              email: clientData.email || 'N/A',
              nif: clientData.nif || 'N/A',
              telefone: clientData.telefone || 'N/A'
            });
          }
        }
      } catch (extractError) {
        console.log(`⚠️ Erro ao extrair dados do identifier: ${extractError.message}`);
      }

      // Método 2: Fallback - Correlação tradicional se necessário
      if (!clientData) {
        const clientKey = transactionID || reference;
        
        if (clientKey) {
          try {
            console.log(`🔍 Fallback: Buscando dados cliente para: ${clientKey}`);
            
            const baseUrl = event.headers.host ? `https://${event.headers.host}` : 'https://cool-starship-a7a3e1.netlify.app';
            const correlationUrl = `${baseUrl}/.netlify/functions/mbway-payment?key=${clientKey}`;
            
            const clientResponse = await fetch(correlationUrl, {
              method: 'GET',
              headers: { 'User-Agent': 'Netlify-Functions-Webhook/1.0' }
            });
            
            if (clientResponse.ok) {
              const clientResult = await clientResponse.json();
              if (clientResult.success) {
                clientData = clientResult.clientData;
                console.log(`✅ Dados cliente via fallback:`, {
                  nome: clientData.nome || 'N/A',
                  email: clientData.email || 'N/A',
                  nif: clientData.nif || 'N/A'
                });
              }
            }
          } catch (correlationError) {
            console.log(`⚠️ Correlação fallback falhou: ${correlationError.message}`);
          }
        }
      }

      // Criar/atualizar registro do pagamento  
      const paymentRecord = {
        id: transactionID || reference || `payment_${Date.now()}`,
        transactionID: transactionID,
        reference: reference,
        produto: identifier || 'Produto BE WATER',
        valor: amount || 0, // Já convertido para float acima
        telefone: clientData?.telefone ? clientData.telefone.substring(0, 3) + '***' + clientData.telefone.substring(6) : 'N/A',
        nome: clientData?.nome || null, // Dados correlacionados do formulário
        email: clientData?.email || null, // Dados correlacionados do formulário
        nif: clientData?.nif || null, // Dados correlacionados do formulário
        status: paymentStatus,
        timestamp: timestamp || new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        fatura: null, // Informação da fatura Vendus (se emitida)
        fatura_emitida: false // Flag para controlar se fatura já foi emitida pelo staff
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