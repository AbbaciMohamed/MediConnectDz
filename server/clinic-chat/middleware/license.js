const Organization = require('../models/Organization');

module.exports = async (req, res, next) => {
  const orgId = req.headers['x-org-id'];
  if (!orgId) return res.status(400).json({ message: 'Organization ID required' });
  const org = await Organization.findById(orgId);
  if (!org) return res.status(404).json({ message: 'Organization not found' });
  if (org.licenseExpiry && new Date(org.licenseExpiry) < new Date()) {
    return res.status(403).json({ message: 'License expired' });
  }
  req.orgBranding = org.branding || {};
  req.orgName = org.name;
  next();
}; 