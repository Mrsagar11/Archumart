const { connectToDatabase } = require('./utils/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {}
    }
    const password = body ? body.password : null;
    let correctPassword = null;

    try {
      const { db } = await connectToDatabase();
      const settings = db.collection('settings');
      const pwdSetting = await settings.findOne({ key: 'admin_password' });
      if (pwdSetting && pwdSetting.value) {
        correctPassword = pwdSetting.value;
      }
    } catch (dbError) {
      console.warn('Could not read admin password from database:', dbError.message);
    }

    if (!correctPassword) {
      correctPassword = process.env.ADMIN_PASSWORD || '@Archana//123';
    }

    if (password === correctPassword) {
      return res.status(200).json({ success: true, token: 'archumart-admin-token-session' });
    } else {
      return res.status(401).json({ success: false, error: 'Incorrect password' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
