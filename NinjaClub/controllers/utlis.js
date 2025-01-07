const {db} = require('../db');

// exports.getBaseUrl = (req) => {
//     return req.connection && req.connection.encrypted ? "https" : "http" + `://${req.headers.host}`;
// }


// utils.js
exports.getBaseURL = (req) => {
    return req.connection && req.connection.encrypted ? "https" : "http" + `://${req.headers.host}`;
  };
  
  