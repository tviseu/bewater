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
    'PROTEIN_WAFER_001': { nome: 'Protein Wafer', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'ALL_PEANUTS_BAR_001': { nome: 'All Peanuts Bar', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'PROTEIN_GOURMET_BAR_001': { nome: 'Protein Gourmet Bar', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
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
    'MIMOSA_001': { nome: 'Mimosa - Iogurte Proteico', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'DROP_IN_001': { nome: 'Drop In (Aula avulso)', iva: 0, categoria: 'Serviços', tax_exempt_reason: 'Artigo 53º do CIVA' },
    'DONATIVO_001': { nome: 'Donativo BE WATER', iva: 0, categoria: 'Donativos', tax_exempt_reason: 'Artigo 53º do CIVA' }
  };

  // Novos produtos físicos
  PRODUTOS_VENDUS['LIGADURAS_001'] = { nome: 'Ligaduras BeWater', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' };
  PRODUTOS_VENDUS['LUVAS_BOXE_001'] = { nome: 'Luvas de Boxe BeWater', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' };
  PRODUTOS_VENDUS['GARRAFA_HYDRA_001'] = { nome: 'Garrafa de Água Hydra', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' };

  // Suporte para array de produtos (multi-produto) ou produto único (legacy)
  const isMultiProduct = Array.isArray(dadosProduto);
  const produtos = isMultiProduct ? dadosProduto : [dadosProduto];
  
  console.log(`🧾 Modo fatura: ${isMultiProduct ? 'multi-produto' : 'produto único'} (${produtos.length} items)`);

  // Criar items array para Vendus
  const items = produtos.map(produto => {
    const produtoVendus = PRODUTOS_VENDUS[produto.id] || {
      nome: produto.id?.includes('DONATIVO') ? 'Donativo BE WATER' : produto.nome || 'Produto BE WATER',
      iva: 0,
      categoria: produto.id?.includes('DONATIVO') ? 'Donativos' : 'Consumíveis',
      tax_exempt_reason: 'Artigo 53º do CIVA'
    };

    return {
      reference: produto.id,
      title: produtoVendus.nome,
      gross_price: produto.preco_unitario || produto.preco,
      qty: produto.quantidade || 1,
      tax_exemption: true,
      tax_exemption_law: 'Artigo 53º do CIVA'
    };
  });

  // Determinar nome do cliente (usar "Consumidor Final" se não fornecido)
  const nomeCliente = dadosCliente.nome || "Consumidor Final";

  // Payload para Vendus API (estrutura FINAL conforme documentação oficial)
  const faturaPayload = {
    type: 'FT',
    client: {
      name: nomeCliente,
      fiscal_id: dadosCliente.nif || null,
      email: dadosCliente.email,
      address: "Lisboa"
    },
    items: items,
    notes: `Pagamento MBWay - Ref: ${dadosPagamento.reference || dadosPagamento.transactionID}${isMultiProduct ? ` (${items.length} produtos)` : ''}`,
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
    // BUSCAR PRIMEIRO PRODUTO (pode haver múltiplos com mesmo transaction_id)
    const { data, error } = await supabase
      .from('payments')
      .select('fatura_emitida, fatura, fatura_tentativas')
      .eq('transaction_id', transactionID)
      .limit(1)
      .maybeSingle(); // Usa maybeSingle em vez de single para evitar erro

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

// Função para marcar fatura como emitida na BD (atualiza TODOS os produtos da transação)
async function marcarFaturaEmitida(transactionID, dadosFatura) {
  if (!supabase) {
    console.log('⚠️ Supabase não configurado, não atualizando BD');
    return;
  }

  try {
    // Atualizar TODOS os produtos desta transação
    const { error, count } = await supabase
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
      console.log(`✅ Fatura marcada como emitida para ${count || 'todos'} produto(s) da transação: ${transactionID}`);
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

    // Validar campos obrigatórios
    const requiredFields = ['transactionID'];
    for (const field of requiredFields) {
      if (!input[field]) {
        throw new Error(`Campo obrigatório ausente: ${field}`);
      }
    }

    console.log(`🔍 Buscando produtos para transação: ${input.transactionID}`);

    // Buscar TODOS os produtos desta transação (suporte multi-produto)
    let produtosArray = [];
    
    if (supabase) {
      try {
        const { data: payments, error } = await supabase
          .from('payments')
          .select('*')
          .eq('transaction_id', input.transactionID);

        if (error) {
          console.error('❌ Erro ao buscar pagamentos:', error);
        } else if (payments && payments.length > 0) {
          console.log(`📦 Encontrados ${payments.length} produto(s) na transação ${input.transactionID}`);
          
          // DEBUG: Ver campos detalhados de cada pagamento
          payments.forEach((p, idx) => {
            console.log(`📋 Produto ${idx + 1}:`, {
              id: p.id,
              transaction_id: p.transaction_id,
              produto: p.produto,
              produto_nome: p.produto_nome,
              produto_id: p.produto_id,
              quantidade: p.quantidade,
              preco_unitario: p.preco_unitario,
              valor: p.valor,
              is_multi_product: p.is_multi_product,
              status: p.status
            });
          });
          
          // Agregar produtos numa estrutura comum
          produtosArray = payments.map(payment => ({
            id: payment.produto_id || 'UNKNOWN_001',
            nome: payment.produto_nome || payment.produto,
            preco: parseFloat(payment.preco_unitario || payment.valor),
            preco_unitario: parseFloat(payment.preco_unitario || payment.valor),
            quantidade: payment.quantidade || 1
          }));
          
          console.log(`📊 Array produtos mapeado:`, produtosArray);
        } else {
          console.log('⚠️ Nenhum pagamento encontrado na BD para esta transação');
        }
      } catch (dbError) {
        console.error('❌ Erro ao consultar Supabase:', dbError);
      }
    }

    // Fallback: usar dados do input se não encontrou na BD
    if (produtosArray.length === 0) {
      console.log('⚠️ Usando dados do input (fallback)');
      
      if (!input.produto || !input.valor) {
        throw new Error('Campos obrigatórios ausentes: produto e valor');
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
    } else if (produtoNome.includes('milbona')) {
      produtoId = 'MILBONA_001';
    } else if (produtoNome.includes('mimosa')) {
      produtoId = 'MIMOSA_001';
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
    } else if (produtoNome.includes('sommersby')) {
      produtoId = 'SOMMERSBY_001';
  } else if (produtoNome.includes('ligaduras')) {
    produtoId = 'LIGADURAS_001';
  } else if (produtoNome.includes('luvas') || produtoNome.includes('boxe')) {
    produtoId = 'LUVAS_BOXE_001';
  } else if (produtoNome.includes('garrafa') || produtoNome.includes('hydra')) {
    produtoId = 'GARRAFA_HYDRA_001';
      }

      // Criar produto fallback
      produtosArray = [{
        id: produtoId,
        nome: input.produto,
        preco: parseFloat(input.valor),
        preco_unitario: parseFloat(input.valor),
        quantidade: 1
      }];
    }

    // Buscar dados do cliente do primeiro produto (todos têm os mesmos dados de cliente)
    let dadosCliente = {
      nome: input.nome || null,
      nif: input.nif || null,
      email: input.email || 'bewaterlisboa@gmail.com'
    };

    // Se buscou da BD, usar os dados do primeiro pagamento
    if (supabase && produtosArray.length > 0) {
      try {
        const { data: firstPayment } = await supabase
          .from('payments')
          .select('nome, nif, email')
          .eq('transaction_id', input.transactionID)
          .limit(1)
          .single();

        if (firstPayment) {
          dadosCliente = {
            nome: firstPayment.nome || null,
            nif: firstPayment.nif || null,
            email: firstPayment.email || 'bewaterlisboa@gmail.com'
          };
        }
      } catch (clientError) {
        console.log('⚠️ Erro ao buscar dados do cliente, usando fallback');
      }
    }

    const dadosPagamento = {
      transactionID: input.transactionID,
      reference: input.reference || null
    };

    console.log(`🧾 Preparando fatura com ${produtosArray.length} produto(s)`);
    console.log(`👤 Cliente: ${dadosCliente.nome || 'Consumidor Final'}`);
    console.log(`📦 Produtos:`, produtosArray.map(p => `${p.nome} x${p.quantidade}`).join(', '));

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

    // 🆕 EMITIR UMA FATURA POR PRODUTO (solução mais simples e robusta!)
    const faturasEmitidas = [];
    const faturasErros = [];
    
    console.log(`🔄 Emitindo ${produtosArray.length} fatura(s) individual(is)...`);
    
    for (let i = 0; i < produtosArray.length; i++) {
      const produto = produtosArray[i];
      console.log(`📄 Emitindo fatura ${i + 1}/${produtosArray.length}: ${produto.nome} (${produto.id})`);
      
      // Emitir fatura individual para este produto
      const resultadoFatura = await emitirFaturaVendus(dadosCliente, [produto], dadosPagamento);
      
      if (resultadoFatura.success) {
        faturasEmitidas.push({
          produto: produto.nome,
          fatura: resultadoFatura.fatura
        });
        console.log(`✅ Fatura ${resultadoFatura.fatura.numero} emitida: ${produto.nome}`);
      } else {
        faturasErros.push({
          produto: produto.nome,
          erro: resultadoFatura.error
        });
        console.error(`❌ Erro ao emitir fatura para ${produto.nome}:`, resultadoFatura.error);
      }
    }
    
    // Verificar se pelo menos uma fatura foi emitida com sucesso
    if (faturasEmitidas.length > 0) {
      // 🔒 MARCAR todas as faturas como emitidas na BD Supabase
      const dadosFaturas = {
        quantidade: faturasEmitidas.length,
        faturas: faturasEmitidas.map(f => f.fatura),
        primeira_fatura: faturasEmitidas[0].fatura
      };
      
      await marcarFaturaEmitida(input.transactionID, dadosFaturas);
      
      // 🔄 TAMBÉM atualizar via webhook endpoint (garante sincronização)
      try {
        const baseUrl = event.headers.host ? `https://${event.headers.host}` : 'https://pagamentos.bewaterlisboa.pt';
        const webhookUpdateUrl = `${baseUrl}/.netlify/functions/payment-webhook`;
        
        const updateResponse = await fetch(webhookUpdateUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'BE WATER Invoice System'
          },
          body: JSON.stringify({
            transactionID: input.transactionID,
            fatura: dadosFaturas
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
      
      // Mensagem de sucesso
      const mensagemSucesso = faturasEmitidas.length === 1
        ? `✅ Fatura ${faturasEmitidas[0].fatura.numero} emitida com sucesso!`
        : `✅ ${faturasEmitidas.length} faturas emitidas com sucesso!\n${faturasEmitidas.map(f => `• ${f.produto}: Fatura ${f.fatura.numero}`).join('\n')}`;
      
      const mensagemCompleta = faturasErros.length > 0
        ? `${mensagemSucesso}\n\n⚠️ ${faturasErros.length} erro(s):\n${faturasErros.map(e => `• ${e.produto}: ${e.erro}`).join('\n')}`
        : mensagemSucesso;
      
      console.log(`✅ Processo concluído: ${faturasEmitidas.length} fatura(s) emitida(s), ${faturasErros.length} erro(s)`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: mensagemCompleta,
          faturas: faturasEmitidas,
          erros: faturasErros.length > 0 ? faturasErros : undefined,
          database_updated: !!supabase
        })
      };
    } else {
      // Todas falharam
      const errosMsg = faturasErros.map(e => `${e.produto}: ${e.erro}`).join('\n');
      throw new Error(`Falha ao emitir todas as faturas:\n${errosMsg}`);
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