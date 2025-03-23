const fraudulent_apps = [
  {
    app_name: "FakeBank Pro",
    developer: "ScamCorp",
    category: "Finance",
    risk_level: "High",
    reported_on: "2024-03-15"
  },
  {
    app_name: "SecureWallet",
    developer: "MaliciousDev",
    category: "Finance",
    risk_level: "High",
    reported_on: "2024-03-14"
  },
  {
    app_name: "CryptoTrader",
    developer: "FakeCrypto",
    category: "Finance",
    risk_level: "Medium",
    reported_on: "2024-03-13"
  },
  {
    app_name: "InvestmentPro",
    developer: "ScamInvest",
    category: "Finance",
    risk_level: "High",
    reported_on: "2024-03-12"
  },
  {
    app_name: "BankSecure",
    developer: "FakeBank",
    category: "Finance",
    risk_level: "Medium",
    reported_on: "2024-03-11"
  }
];

// Mock data for fraudulent URLs
const fraudulent_urls = [
  {
    url: "https://fakebank.com",
    risk_level: "High",
    detected_on: "2024-03-15",
    category: "Phishing"
  },
  {
    url: "https://securewallet-scam.com",
    risk_level: "High",
    detected_on: "2024-03-14",
    category: "Phishing"
  },
  {
    url: "https://cryptotrader-fake.com",
    risk_level: "Medium",
    detected_on: "2024-03-13",
    category: "Scam"
  },
  {
    url: "https://investmentpro-scam.com",
    risk_level: "High",
    detected_on: "2024-03-12",
    category: "Phishing"
  },
  {
    url: "https://banksecure-fake.com",
    risk_level: "Medium",
    detected_on: "2024-03-11",
    category: "Scam"
  }
];

// Mock data for fraud trends
const fraud_trends_30_days = [
  { date: "2024-03-15", fraud_cases_detected: 5 },
  { date: "2024-03-14", fraud_cases_detected: 4 },
  { date: "2024-03-13", fraud_cases_detected: 3 },
  { date: "2024-03-12", fraud_cases_detected: 6 },
  { date: "2024-03-11", fraud_cases_detected: 4 }
];

// Helper function to get dashboard statistics
export const getDashboardStats = () => {
  const today = new Date().toISOString().split('T')[0];
  const recentDetections = [...fraudulent_apps, ...fraudulent_urls]
    .filter(item => new Date(item.reported_on || item.detected_on) >= new Date(today))
    .length;

  return {
    totalFraudulentApps: fraudulent_apps.length,
    totalFraudulentUrls: fraudulent_urls.length,
    recentDetections,
    activeInvestigations: 12 // Mock number of active investigations
  };
};

// Helper function to get fraud list
export const getFraudList = () => {
  const allFraud = [
    ...fraudulent_apps.map(app => ({
      type: 'app',
      name: app.app_name,
      category: app.category,
      status: app.risk_level,
      detectionDate: app.reported_on
    })),
    ...fraudulent_urls.map(url => ({
      type: 'url',
      name: url.url,
      category: url.category,
      status: url.risk_level,
      detectionDate: url.detected_on
    }))
  ];

  // Sort by detection date, most recent first
  return allFraud.sort((a, b) => 
    new Date(b.detectionDate) - new Date(a.detectionDate)
  );
};

// Helper function to get fraud trends
export const getFraudTrends = () => {
  return fraud_trends_30_days;
}; 