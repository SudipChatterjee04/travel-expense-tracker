const mongoose = require('mongoose');
const benefitorSplitSchema = require('./Benefitor_cost.js');

const expenseSchema = new mongoose.Schema({
  
  benefitorSplit: {
    type: [benefitorSplitSchema],
    required: true,
  },
  category: {
    type: String,
    enum: ['Food', 'Room Rent', 'Travel Charges', 'Other'],
    required: true,
  },
  note: {
    type: String,

    
  },
  paidBy:{
    type: String,
    required: true,
  },
  recordedBy:{
    type: String,
    required: true,
  }
  ,
  place: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Expense', expenseSchema);
