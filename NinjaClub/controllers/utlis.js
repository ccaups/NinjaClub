const {db} = require('../db');

// utils.js
exports.getBaseURL = (req) => {
    return req.connection && req.connection.encrypted ? "https" : "http" + `://${req.headers.host}`;
  };
  
  