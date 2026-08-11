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

  // Verify Admin Token
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader || authHeader !== 'Bearer archumart-admin-token-session') {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ success: false, error: 'Unauthorized: Invalid admin session' })
    };
  }

  try {
    const { newPassword } = JSON.parse(event.body);

    if (!newPassword || newPassword.trim().length < 4) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Password must be at least 4 characters long' })
      };
    }

    const { db } = await connectToDatabase();
    const settings = db.collection('settings');
    
    // Update or insert the password key
    await settings.updateOne(
      { key: 'admin_password' },
      { $set: { value: newPassword.trim(), updatedAt: new Date() } },
      { upsert: true }
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Password updated successfully in database!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Internal server error', message: error.message })
    };
  }
};
