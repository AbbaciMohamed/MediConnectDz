const requirePlan = (required) => (req, res, next) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Unauthorized' });
  const allowed = Array.isArray(required) ? required : [required];
  if (!allowed.includes(user.planType)) {
    return res.status(403).json({ message: `Requires ${allowed.join(' or ')} plan` });
  }
  next();
};

module.exports = requirePlan; 