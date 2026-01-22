exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  try {
    const { password } = JSON.parse(event.body);
    const STAFF_PASSWORD = process.env.STAFF_PASSWORD;

    if (!STAFF_PASSWORD) {
      console.error('❌ STAFF_PASSWORD env var not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'Server configuration error' })
      };
    }

    if (password === STAFF_PASSWORD) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Authenticated' })
      };
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, message: 'Invalid password' })
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, message: 'Invalid request' })
    };
  }
};
