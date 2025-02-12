const AuditLog = require('../models/AuditLog');

module.exports = (action) => {
  return async (req, res, next) => {
    const log = new AuditLog({
      user: req.user?._id,
      action,
      target: req.params.id || req.body._id,
      details: req.body,
      ipAddress: req.ip
    });
    await log.save();
    next();
  };
}; 