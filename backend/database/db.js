const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

module.exports = {
    db: 'mongodb://localhost:27017/ScolarlyRegistration',
    secret: crypto, // Cryto-created secret
    // db: 'Registration' // Database name

  };
