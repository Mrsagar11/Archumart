const { connectToDatabase } = require('./utils/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let dbStatus = 'Disconnected';
    let dbError = null;

    try {
      await connectToDatabase();
      dbStatus = 'Connected successfully!';
    } catch (e) {
      dbStatus = 'Connection failed';
      dbError = e.message;
    }

    return res.status(200).json({
      databaseStatus: dbStatus,
      databaseError: dbError,
      hasAdminPasswordEnv: !!process.env.ADMIN_PASSWORD,
      adminPasswordLength: process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.length : 0,
      envKeysDetected: Object.keys(process.env).filter(k => k.includes('PASSWORD') || k.includes('URI') || k.includes('MONGODB'))
    });
  } catch (error) {
    return res.status(500).json({ error: 'Diagnostics failed', message: error.message });
  }
};
