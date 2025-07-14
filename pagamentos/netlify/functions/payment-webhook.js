const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// Configuração Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase environment variables missing');
}

// Criar cliente Supabase (usando service key para bypass RLS)
const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) : null;

// Função auxiliar para inserir/atualizar pagamento
async function upsertPayment(paymentData) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  try {
    console.log('💾 Guardando pagamento na Supabase:', paymentData);
    
    const { data, error } = await supabase
      .from('payments')
      .upsert(paymentData, { 
        onConflict: 'transaction_id',
        ignoreDuplicates: false 
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erro Supabase:', error);
      throw error;
    }

    console.log('✅ Pagamento guardado:', data.id);
    return data;
    
  } catch (error) {
    console.error('❌ Erro ao guardar pagamento:', error.message);
    throw error;
  }
}

// Fallback para Map em memória se Supabase falhar
let paymentsDB = new Map();

exports.handler = async (event, context) => {
  try {
    console.log('🔔 Webhook recebido:', event.httpMethod);
    console.log('💾 Base de dados:', supabase ? 'Supabase conectado' : `Map local (${paymentsDB.size} pagamentos)`);
  } catch (initError) {
    console.error('❌ Erro na inicialização:', initError);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false, 
        message: 'Erro de inicialização: ' + initError.message 
      })
    };
  }
  
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Signature',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // PUT: Atualizar dados de fatura (chamado pelo emit-invoice.js)
  if (event.httpMethod === 'PUT') {
    try {
      const updateData = JSON.parse(event.body);
      
      if (!updateData.transactionID || !updateData.fatura) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'transactionID e fatura são obrigatórios'
          })
        };
      }

      if (supabase) {
        console.log(`📋 Atualizando fatura para transação: ${updateData.transactionID}`);
        
        const { data, error } = await supabase
          .from('payments')
          .update({
            fatura_emitida: true,
            fatura: updateData.fatura,
            last_update: new Date().toISOString()
          })
          .eq('transaction_id', updateData.transactionID)
          .select()
          .single();

        if (error) {
          console.error('❌ Erro ao atualizar fatura:', error);
          throw error;
        }

        if (!data) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Pagamento não encontrado'
            })
          };
        }

        console.log(`✅ Fatura marcada como emitida na BD: ${updateData.transactionID}`);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Fatura atualizada com sucesso',
            payment: data
          })
        };

      } else {
        // Fallback para Map em memória
        const payment = Array.from(paymentsDB.values())
          .find(p => p.transactionID === updateData.transactionID);
        
        if (payment) {
          payment.fatura_emitida = true;
          payment.fatura = updateData.fatura;
          payment.lastUpdate = new Date().toISOString();
          paymentsDB.set(payment.id, payment);
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              message: 'Fatura atualizada com sucesso (memoria)',
              payment: payment
            })
          };
        } else {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Pagamento não encontrado'
            })
          };
        }
      }

    } catch (error) {
      console.error('❌ Erro ao atualizar fatura:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: error.message
        })
      };
    }
  }

  // GET: Listar pagamentos (para interface staff)
  if (event.httpMethod === 'GET') {
    try {
      let payments = [];

      if (supabase) {
        console.log('📋 Buscando pagamentos na Supabase...');
        
        const { data: supabasePayments, error } = await supabase
          .from('payments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) {
          console.error('❌ Erro ao buscar pagamentos Supabase:', error);
          throw error;
        }

        // Mapear para formato esperado pelo frontend
        payments = supabasePayments.map(p => ({
          id: p.id,
          transactionID: p.transaction_id,
          reference: p.reference,
          produto: p.produto_nome || p.produto,
          valor: parseFloat(p.valor),
          telefone: p.telefone,
          nome: p.nome,
          email: p.email,
          nif: p.nif,
          status: p.status,
          timestamp: p.timestamp,
          lastUpdate: p.last_update,
          fatura: p.fatura,
          fatura_emitida: p.fatura_emitida,
          fatura_tentativas: p.fatura_tentativas
        }));

        console.log(`📊 ${payments.length} pagamentos encontrados na Supabase`);
      } else {
        // Fallback para Map em memória
        console.log('📋 Usando fallback Map em memória...');
        payments = Array.from(paymentsDB.values())
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 50);
      }

      console.log('📋 Retornando', payments.length, 'pagamentos para staff.html');
      console.log('📊 Status dos pagamentos:', payments.map(p => `${p.produto} (${p.status})`));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          payments: payments
        })
      };

    } catch (error) {
      console.error('❌ Erro no GET:', error.message);
      
      // Fallback para Map em memória em caso de erro
      const payments = Array.from(paymentsDB.values())
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 50);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          payments: payments,
          warning: `Supabase error: ${error.message}`
        })
      };
    }
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
        transaction_id: transactionID,
        reference: reference,
        produto: identifier?.split(' - ')[0] || 'PRODUTO_UNKNOWN',
        produto_nome: identifier || 'Produto BE WATER',
        valor: amount || 0,
        telefone: clientData?.telefone ? clientData.telefone.substring(0, 3) + '***' + clientData.telefone.substring(6) : null,
        nome: clientData?.nome || null,
        email: clientData?.email || null,
        nif: clientData?.nif || null,
        status: paymentStatus,
        timestamp: timestamp || new Date().toISOString(),
        last_update: new Date().toISOString(),
        fatura: null,
        fatura_emitida: false,
        fatura_tentativas: 0,
        raw_webhook_data: decryptedData
      };

      // Guardar na Supabase (com fallback para Map)
      let savedPayment;
      try {
        if (supabase) {
          savedPayment = await upsertPayment(paymentRecord);
        } else {
          // Fallback para Map em memória
          const mapRecord = {
            id: transactionID || reference || `payment_${Date.now()}`,
            transactionID: transactionID,
            reference: reference,
            produto: identifier || 'Produto BE WATER',
            valor: amount || 0,
            telefone: clientData?.telefone ? clientData.telefone.substring(0, 3) + '***' + clientData.telefone.substring(6) : 'N/A',
            nome: clientData?.nome || null,
            email: clientData?.email || null,
            nif: clientData?.nif || null,
            status: paymentStatus,
            timestamp: timestamp || new Date().toISOString(),
            lastUpdate: new Date().toISOString(),
            fatura: null,
            fatura_emitida: false,
            fatura_tentativas: 0
          };
          paymentsDB.set(mapRecord.id, mapRecord);
          savedPayment = mapRecord;
        }
      } catch (supabaseError) {
        console.error('❌ Erro Supabase, usando fallback Map:', supabaseError.message);
        // Fallback para Map em caso de erro
        const mapRecord = {
          id: transactionID || reference || `payment_${Date.now()}`,
          transactionID: transactionID,
          reference: reference,
          produto: identifier || 'Produto BE WATER',
          valor: amount || 0,
          telefone: clientData?.telefone ? clientData.telefone.substring(0, 3) + '***' + clientData.telefone.substring(6) : 'N/A',
          nome: clientData?.nome || null,
          email: clientData?.email || null,
          nif: clientData?.nif || null,
          status: paymentStatus,
          timestamp: timestamp || new Date().toISOString(),
          lastUpdate: new Date().toISOString(),
          fatura: null,
          fatura_emitida: false,
          fatura_tentativas: 0
        };
        paymentsDB.set(mapRecord.id, mapRecord);
        savedPayment = mapRecord;
      }

      console.log(`✅ Pagamento ${paymentStatus}:`, savedPayment);

      // Log específico por tipo
      if (paymentStatus === 'confirmado') {
        console.log(`🎉 PAGAMENTO CONFIRMADO! ${savedPayment.produto || savedPayment.produto_nome} - €${savedPayment.valor} - ${savedPayment.telefone}`);
      } else if (paymentStatus === 'falhado') {
        console.log(`❌ PAGAMENTO FALHADO! ${savedPayment.produto || savedPayment.produto_nome} - €${savedPayment.valor} - ${savedPayment.telefone}`);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Webhook processado com sucesso',
          payment: savedPayment,
          database: supabase ? 'Supabase' : 'Memory'
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