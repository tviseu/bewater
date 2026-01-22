const { createClient } = require('@supabase/supabase-js');

// Configuração Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const path = event.path.split('/').pop();

    // GET: Listar dados (sessões, coaches, settings)
    if (event.httpMethod === 'GET') {
      const { month, year, type } = event.queryStringParameters || {};

      if (type === 'initial_data') {
        // Buscar coaches e settings
        const [coachesRes, settingsRes] = await Promise.all([
          supabase.from('pt_coaches').select('*').eq('active', true).order('name'),
          supabase.from('pt_settings').select('*')
        ]);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            coaches: coachesRes.data,
            settings: settingsRes.data
          })
        };
      }

      // Buscar sessões por mês
      if (month && year) {
        const startOfMonth = new Date(Date.UTC(year, month - 1, 1)).toISOString();
        const startOfNextMonth = new Date(Date.UTC(year, month, 1)).toISOString();

        const { data, error } = await supabase
          .from('pt_sessions')
          .select('*, pt_coaches(name)')
          .gte('timestamp', startOfMonth)
          .lt('timestamp', startOfNextMonth)
          .order('timestamp', { ascending: false });

        if (error) throw error;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, sessions: data })
        };
      }
    }

    // POST: Criar nova sessão
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const { coach_id, client_name, type, timestamp } = body;

      // 1. Buscar taxa atual das settings para garantir persistência histórica
      const { data: settings, error: settingsError } = await supabase
        .from('pt_settings')
        .select('value')
        .eq('key', `gym_rate_${type}`)
        .single();

      if (settingsError) throw settingsError;

      // 2. Criar sessão
      const { data, error } = await supabase
        .from('pt_sessions')
        .insert({
          coach_id,
          client_name,
          type,
          gym_fee: settings.value,
          timestamp: timestamp || new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, session: data })
      };
    }

    // DELETE: Remover sessão
    if (event.httpMethod === 'DELETE') {
      const { id } = event.queryStringParameters || {};
      if (!id) throw new Error('ID da sessão obrigatório');

      const { error } = await supabase
        .from('pt_sessions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Sessão removida' })
      };
    }

    // PUT: Atualizar settings ou coaches (Admin)
    if (event.httpMethod === 'PUT') {
      const body = JSON.parse(event.body);
      const { action } = body;

      if (action === 'update_setting') {
        const { key, value } = body;
        const { error } = await supabase
          .from('pt_settings')
          .update({ value, updated_at: new Date().toISOString() })
          .eq('key', key);
        
        if (error) throw error;
        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
      }

      if (action === 'add_coach') {
        const { name } = body;
        const { data, error } = await supabase
          .from('pt_coaches')
          .insert({ name })
          .select()
          .single();
        
        if (error) throw error;
        return { statusCode: 200, headers, body: JSON.stringify({ success: true, coach: data }) };
      }
    }

    return { statusCode: 405, headers, body: JSON.stringify({ message: 'Método não permitido' }) };

  } catch (error) {
    console.error('❌ Erro PT Management:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};
