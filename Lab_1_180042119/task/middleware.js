function logRequest(req, res, next) {
    res.send(`Request received for: ${req.method} ${req.url}`);
    next();
  }
  
  module.exports = {
    logRequest
  };