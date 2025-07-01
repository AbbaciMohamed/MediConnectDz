import React, { createContext, useContext, useEffect, useState } from 'react';

const OrgContext = createContext({ orgBranding: {}, orgName: '', loading: true });

export const OrgProvider = ({ children }) => {
  const [orgBranding, setOrgBranding] = useState({});
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detect org from subdomain, query param, or token
    let orgId = null;
    // Example: from query param
    const params = new URLSearchParams(window.location.search);
    if (params.get('org')) orgId = params.get('org');
    // TODO: Add subdomain or token logic if needed
    if (!orgId) {
      setLoading(false);
      return;
    }
    fetch(`/api/orgs/${orgId}`)
      .then(res => res.json())
      .then(data => {
        setOrgBranding(data.branding || {});
        setOrgName(data.name || '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <OrgContext.Provider value={{ orgBranding, orgName, loading }}>
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = () => useContext(OrgContext); 