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
    // Novas barras específicas
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
    'AGUA_GAS_001': { nome: 'Água com Gás', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'RED_BULL_001': { nome: 'Red Bull', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'YOPRO_001': { nome: 'YoPro Iogurte Proteico', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'DROP_IN_001': { nome: 'Drop In (Aula avulso)', iva: 0, categoria: 'Serviços', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'DONATIVO_001': { nome: 'Donativo BE WATER', iva: 0, categoria: 'Donativos', tax_exempt_reason: 'Artigo 53º do CIVA' }
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

  // Determinar nome do cliente (usar "Consumidor Final" se não fornecido)
  const nomeCliente = dadosCliente.nome || "Consumidor Final";

  // Payload para Vendus API (estrutura FINAL conforme documentação oficial)
  const faturaPayload = {
    type: 'FT', // Fatura (códigos aceites: FT, FS, FR, NC, DC, PF, OT, EC, GA, GT, GR, GD, RG)
    client: {
      name: nomeCliente,
      fiscal_id: dadosCliente.nif || null, // era 'vat' → agora 'fiscal_id'
      email: dadosCliente.email,
      address: "Lisboa" // Morada obrigatória para empresas
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

const { createClient } = require('@supabase/supabase-js');

// Configuração Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) : null;

// Função para verificar se fatura já foi emitida
async function verificarFaturaEmitida(transactionID) {
  if (!supabase) {
    console.log('⚠️ Supabase não configurado, pulando verificação');
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('payments')
      .select('fatura_emitida, fatura, fatura_tentativas')
      .eq('transaction_id', transactionID)
      .single();

    if (error) {
      console.error('❌ Erro ao verificar fatura:', error);
      return false; // Em caso de erro, permitir tentativa
    }

    if (data && data.fatura_emitida) {
      console.log(`🚫 Fatura já emitida para transação ${transactionID}:`, data.fatura);
      return {
        emitida: true,
        fatura: data.fatura,
        tentativas: data.fatura_tentativas
      };
    }

    return false;
  } catch (error) {
    console.error('❌ Erro na verificação:', error);
    return false;
  }
}

// Função para marcar fatura como emitida na BD
async function marcarFaturaEmitida(transactionID, dadosFatura) {
  if (!supabase) {
    console.log('⚠️ Supabase não configurado, não atualizando BD');
    return;
  }

  try {
    const { error } = await supabase
      .from('payments')
      .update({
        fatura_emitida: true,
        fatura: dadosFatura,
        last_update: new Date().toISOString()
      })
      .eq('transaction_id', transactionID);

    if (error) {
      console.error('❌ Erro ao marcar fatura como emitida:', error);
    } else {
      console.log(`✅ Fatura marcada como emitida na BD: ${transactionID}`);
    }
  } catch (error) {
    console.error('❌ Erro ao atualizar BD:', error);
  }
}

// Função para incrementar tentativas de fatura
async function incrementarTentativas(transactionID) {
  if (!supabase) return;

  try {
    // Primeiro buscar o valor atual
    const { data: currentData, error: selectError } = await supabase
      .from('payments')
      .select('fatura_tentativas')
      .eq('transaction_id', transactionID)
      .single();

    if (selectError) {
      console.error('❌ Erro ao buscar tentativas atuais:', selectError);
      return;
    }

    const novasTentativas = (currentData?.fatura_tentativas || 0) + 1;

    const { error } = await supabase
      .from('payments')
      .update({
        fatura_tentativas: novasTentativas,
        last_update: new Date().toISOString()
      })
      .eq('transaction_id', transactionID);

    if (error) {
      console.error('❌ Erro ao incrementar tentativas:', error);
    } else {
      console.log(`📊 Tentativas de fatura incrementadas para ${novasTentativas}: ${transactionID}`);
    }
  } catch (error) {
    console.error('❌ Erro ao incrementar tentativas:', error);
  }
}

// Base de dados em memória para fallback (caso Supabase falhe)
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
    } else if (produtoNome.includes('red bull') || produtoNome.includes('redbull')) {
      produtoId = 'RED_BULL_001';
    } else if (produtoNome.includes('drop in') || produtoNome.includes('aula avulso') || produtoNome.includes('drop-in')) {
      produtoId = 'DROP_IN_001';
    } else if (produtoNome.includes('água pequena')) {
      produtoId = 'AGUA_PEQUENA_001';
    } else if (produtoNome.includes('água grande')) {
      produtoId = 'AGUA_GRANDE_001';
    } else if (produtoNome.includes('água com gás')) {
      produtoId = 'AGUA_GAS_001';
    } else if (produtoNome.includes('água')) {
      produtoId = 'AGUA_PEQUENA_001'; // Default para água
    } else if (produtoNome.includes('yopro') || produtoNome.includes('iogurte proteico') || produtoNome.includes('iogurte') || produtoNome.includes('yogurt')) {
      produtoId = 'YOPRO_001';
    } else if (produtoNome.includes('powerade')) {
      produtoId = 'POWERADE_001';
    } else if (produtoNome.includes('coca cola zero') || produtoNome.includes('coca-cola zero')) {
      produtoId = 'COCA_COLA_ZERO_001';
    } else if (produtoNome.includes('saqueta de proteína') || produtoNome.includes('saqueta') || produtoNome.includes('batido proteína')) {
      produtoId = 'BATIDO_PROTEINA_001';
    } else if (produtoNome.includes('energy crunch')) {
      produtoId = 'ENERGY_CRUNCH_BAR_001';
    } else if (produtoNome.includes('protein snack')) {
      produtoId = 'PROTEIN_SNACK_001';
    } else if (produtoNome.includes('billion')) {
      produtoId = 'BILLION_001';
    } else if (produtoNome.includes('protein brownie') || produtoNome.includes('brownie')) {
      produtoId = 'PROTEIN_BROWNIE_001';
                      } else if (produtoNome.includes('cookies') || produtoNome.includes('waffles')) {
      produtoId = 'COOKIES_PROTEICA_001';
      } else if (produtoNome.includes('limonada')) {
        produtoId = 'LIMONADA_001';
      } else if (produtoNome.includes('cadeado')) {
        produtoId = 'CADEADO_001';
    } else if (produtoNome.includes('sabonete') || produtoNome.includes('carvão') || produtoNome.includes('carvao')) {
      produtoId = 'SABONETE_CARVAO_001';
    } else if (produtoNome.includes('aminox')) {
      produtoId = 'AMINOX_001';
    } else if (produtoNome.includes('toalha')) {
      produtoId = 'TOALHA_001';
    } else if (produtoNome.includes('cerveja mini') || produtoNome.includes('cerveja')) {
      produtoId = 'CERVEJA_MINI_001';
  } else if (produtoNome.includes('ligaduras')) {
    produtoId = 'LIGADURAS_001';
  } else if (produtoNome.includes('luvas') || produtoNome.includes('boxe')) {
    produtoId = 'LUVAS_BOXE_001';
  } else if (produtoNome.includes('garrafa') || produtoNome.includes('hydra')) {
    produtoId = 'GARRAFA_HYDRA_001';
    }

    // Preparar dados para emissão (usar "Consumidor Final" se sem dados)
    const dadosCliente = {
      nome: input.nome || null,
      nif: input.nif || null,
      email: input.email || 'bewaterlisboa@gmail.com' // Email genérico para consumidor final
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
    console.log(`🔍 Verificando se fatura já foi emitida para: ${input.transactionID}`);
    
    const faturaExistente = await verificarFaturaEmitida(input.transactionID);
    
    if (faturaExistente && faturaExistente.emitida) {
      console.log(`⚠️ Tentativa de emissão duplicada bloqueada: ${input.transactionID}`);
      
      return {
        statusCode: 409, // Conflict
        headers,
        body: JSON.stringify({
          success: false,
          message: `❌ Fatura já foi emitida!\n\n🧾 Número: ${faturaExistente.fatura?.numero || 'N/A'}\n📅 Data: ${faturaExistente.fatura?.data_emissao ? new Date(faturaExistente.fatura.data_emissao).toLocaleString('pt-PT') : 'N/A'}\n🔢 Tentativas: ${faturaExistente.tentativas || 0}\n\n⚠️ Para evitar duplicações, não é possível emitir novamente.`,
          fatura_existente: faturaExistente.fatura,
          already_emitted: true
        })
      };
    }

    // Incrementar contador de tentativas
    await incrementarTentativas(input.transactionID);

    // Emitir fatura
    const resultadoFatura = await emitirFaturaVendus(dadosCliente, dadosProduto, dadosPagamento);

    if (resultadoFatura.success) {
      // 🔒 MARCAR fatura como emitida na BD Supabase
      await marcarFaturaEmitida(input.transactionID, resultadoFatura.fatura);
      
      // 🔄 TAMBÉM atualizar via webhook endpoint (garante sincronização)
      try {
        const baseUrl = event.headers.host ? `https://${event.headers.host}` : 'https://cool-starship-a7a3e1.netlify.app';
        const webhookUpdateUrl = `${baseUrl}/.netlify/functions/payment-webhook`;
        
        const updateResponse = await fetch(webhookUpdateUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'BE WATER Invoice System'
          },
          body: JSON.stringify({
            transactionID: input.transactionID,
            fatura: resultadoFatura.fatura
          })
        });

        const updateResult = await updateResponse.json();
        if (updateResponse.ok) {
          console.log('✅ Webhook também atualizado:', updateResult.message);
        } else {
          console.log('⚠️ Webhook update falhou:', updateResult.message);
        }
      } catch (webhookError) {
        console.log('⚠️ Erro ao atualizar webhook:', webhookError.message);
        // Não é crítico, continuar
      }
      
      // Fallback: também guardar na Map em memória
      const faturaKey = `${input.transactionID}_${input.produto}_${input.valor}`;
      faturas_emitidas.set(faturaKey, resultadoFatura.fatura);
      
      console.log(`✅ Fatura ${resultadoFatura.fatura.numero} emitida e registrada com sucesso`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: `✅ Fatura ${resultadoFatura.fatura.numero} emitida com sucesso!`,
          fatura: resultadoFatura.fatura,
          database_updated: !!supabase
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