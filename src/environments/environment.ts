import secrets from './secrets.environment';

export const environment = {
  production: false,

  // Import Keys & Links
  ...secrets,

  authTimeOuter: 5000,
  mapOptions: { "latitude": 37.9709831, "longitude": 23.7224135, "zoom": 12 },

  access: [
    true, // community,
    true, // loyalty,
    true, // microcredit,
    false // microfunding
  ],
  subAccess: [
    true, //partner_address,
    true, // partner_contacts,
    true, // partner_payments, 
    true, // partner_auto_registration, 
    false // partner_fixed_campaign
  ],

  version: 'undefined',

  fixedMicrocreditCampaign: {
    'title': 'One Click Microcredit Campaign',
    'subtitle': 'Support',
    'terms': 'Support Us',
    'description': 'Description',
    'category': 'Random',
    'access': 'public',
    'quantitative': 'true',
    'minAllowed': '1',
    'maxAllowed': '15',
    'stepAmount': '1',
    'maxAmount': '5000',
    'whenSupportStarts': 0, //days 
    'whenSupportEnds': 360, //days 
    'whenRedeemStarts': 361, //days 
    'whenRedeemEnds': 720, //days 
  }
};

