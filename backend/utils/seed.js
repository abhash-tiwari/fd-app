const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mockData = require('./mockData');
const FraudulentApp = require('../models/FraudulentApp');
const FraudulentUrl = require('../models/FraudulentUrl');
const User = require('../models/User');
const FraudTrend = require('../models/FraudTrend');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // Increase server selection timeout
      socketTimeoutMS: 45000,           // Increase socket timeout
      connectTimeoutMS: 30000,          // Increase connection timeout
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB(); 

    console.log('⚠️ Clearing existing data...');
    await Promise.all([
      FraudulentApp.deleteMany({}),
      FraudulentUrl.deleteMany({}),
      User.deleteMany({}),
      FraudTrend.deleteMany({})
    ]);

    console.log('🌱 Inserting mock data...');
    await Promise.all([
      FraudulentApp.insertMany(mockData.fraudulent_apps),
      FraudulentUrl.insertMany(mockData.fraudulent_urls),
      User.insertMany(mockData.user_authentication),
      FraudTrend.insertMany(mockData.fraud_trends_30_days)
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error(`Error seeding database: ${error}`);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
};

seedDatabase();
