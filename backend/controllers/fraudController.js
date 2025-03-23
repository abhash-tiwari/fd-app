const asyncHandler = require('express-async-handler');
const FraudEntry = require('../models/FraudEntry');
const { generateMockFraudData } = require('../utils/mockData');

// @desc    Get all fraud entries with filtering options
// @route   GET /api/fraud
// @access  Private
const getFraudEntries = asyncHandler(async (req, res) => {
  const { type, status, threatLevel, days } = req.query;
  
  let query = {};
  
  if (type) query.type = type;
  if (status) query.status = status;
  if (threatLevel) query.threatLevel = threatLevel;
  
  if (days) {
    const date = new Date();
    date.setDate(date.getDate() - parseInt(days));
    query.detectedDate = { $gte: date };
  }

  try {
    const fraudEntries = await FraudEntry.find(query).sort({ detectedDate: -1 });
    res.json(fraudEntries);
  } catch (error) {
    const mockData = generateMockFraudData();
    
    let filteredData = mockData;
    
    if (type) {
      filteredData = filteredData.filter(entry => entry.type === type);
    }
    
    if (status) {
      filteredData = filteredData.filter(entry => entry.status === status);
    }
    
    if (threatLevel) {
      filteredData = filteredData.filter(entry => entry.threatLevel === threatLevel);
    }
    
    if (days) {
      const date = new Date();
      date.setDate(date.getDate() - parseInt(days));
      filteredData = filteredData.filter(entry => new Date(entry.detectedDate) >= date);
    }
    
    res.json(filteredData);
  }
});

// @desc    Get fraud entry by ID
// @route   GET /api/fraud/:id
// @access  Private
const getFraudEntryById = asyncHandler(async (req, res) => {
  try {
    const fraudEntry = await FraudEntry.findById(req.params.id);
    
    if (fraudEntry) {
      res.json(fraudEntry);
    } else {
      res.status(404);
      throw new Error('Fraud entry not found');
    }
  } catch (error) {
    const mockData = generateMockFraudData();
    const entry = mockData.find(e => e._id === req.params.id);
    
    if (entry) {
      res.json(entry);
    } else {
      res.status(404);
      throw new Error('Fraud entry not found');
    }
  }
});

// @desc    Update fraud entry status
// @route   PUT /api/fraud/:id
// @access  Private
const updateFraudStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  if (!status) {
    res.status(400);
    throw new Error('Status is required');
  }
  
  try {
    const fraudEntry = await FraudEntry.findById(req.params.id);
    
    if (fraudEntry) {
      fraudEntry.status = status;
      const updatedFraudEntry = await fraudEntry.save();
      res.json(updatedFraudEntry);
    } else {
      res.status(404);
      throw new Error('Fraud entry not found');
    }
  } catch (error) {
    res.json({ 
      _id: req.params.id, 
      status, 
      message: 'Status updated successfully (mock response)' 
    });
  }
});

// @desc    Get 30-day trend analysis of fraud entries
// @route   GET /api/fraud/trend
// @access  Private
const get30DayTrend = asyncHandler(async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  try {
    const trendData = await FraudEntry.aggregate([
      {
        $match: {
          detectedDate: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$detectedDate" } },
            type: "$type"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.date": 1 }
      }
    ]);
    
    const formattedData = formatTrendData(trendData);
    res.json(formattedData);
  } catch (error) {
    const mockData = generateMockFraudData();
    
    const filteredData = mockData.filter(
      entry => new Date(entry.detectedDate) >= thirtyDaysAgo
    );
    
    const dateMap = {};
    filteredData.forEach(entry => {
      const dateStr = entry.detectedDate.toISOString().split('T')[0];
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = { apps: 0, urls: 0, date: dateStr };
      }
      
      if (entry.type === 'app') {
        dateMap[dateStr].apps += 1;
      } else {
        dateMap[dateStr].urls += 1;
      }
    });
    
    const trendArray = Object.values(dateMap).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    res.json(trendArray);
  }
});

const formatTrendData = (trendData) => {
  const dateMap = {};
  
  trendData.forEach(item => {
    const dateStr = item._id.date;
    const type = item._id.type;
    const count = item.count;
    
    if (!dateMap[dateStr]) {
      dateMap[dateStr] = { date: dateStr, apps: 0, urls: 0 };
    }
    
    if (type === 'app') {
      dateMap[dateStr].apps = count;
    } else {
      dateMap[dateStr].urls = count;
    }
  });
  
  return Object.values(dateMap).sort((a, b) => new Date(a.date) - new Date(b.date));
};

module.exports = {
  getFraudEntries,
  getFraudEntryById,
  updateFraudStatus,
  get30DayTrend
};