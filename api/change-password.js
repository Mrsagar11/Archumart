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

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || authHeader !== 'Bearer archumart-admin-token-session') {
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid admin session' });
  }

  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.trim().length < 4) {
      return res.status(400).json({ success: false, error: 'Password must be at least 4 characters long' });
    }

    const { db } = await connectToDatabase();
    const settings = db.collection('settings');
    
    await settings.updateOne(
      { key: 'admin_password' },
      { $set: { value: newPassword.trim(), updatedAt: new Date() } },
      { upsert: true }
    );

    return res.status(200).json({ success: true, message: 'Password updated successfully in database!' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error', message: error.message });
  }
};
