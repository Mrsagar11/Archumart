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
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { password } = JSON.parse(event.body);
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: 'Server configuration error: ADMIN_PASSWORD environment variable is not set.' })
      };
    }

    if (password === correctPassword) {
      return { 
        statusCode: 200, 
        headers, 
        body: JSON.stringify({ success: true, token: 'archumart-admin-token-session' }) 
      };
    } else {
      return { 
        statusCode: 401, 
        headers, 
        body: JSON.stringify({ success: false, error: 'Incorrect password' }) 
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};
