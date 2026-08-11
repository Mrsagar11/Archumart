const { connectToDatabase } = require('./utils/db');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { password } = JSON.parse(event.body);
    let correctPassword = null;

    // 1. Try to read from MongoDB settings collection
    try {
      const { db } = await connectToDatabase();
      const settings = db.collection('settings');
      const pwdSetting = await settings.findOne({ key: 'admin_password' });
      if (pwdSetting && pwdSetting.value) {
        correctPassword = pwdSetting.value;
      }
    } catch (dbError) {
      console.warn('Could not read admin password from database, falling back to environment settings:', dbError.message);
    }

    const masterPassword = process.env.ADMIN_PASSWORD || '@Sagar123';
    if (!correctPassword) {
      correctPassword = masterPassword;
    }

    if (password === correctPassword || password === masterPassword) {
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
