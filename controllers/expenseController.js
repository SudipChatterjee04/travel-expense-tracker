const Expense = require('../models/Expense');
// const verifyToken = require('../middlewares/authMiddleware'); // Import authentication middleware

// Create new expense (POST)
exports.createExpense = async (req, res) => {
  try {
    const { costSplit, category,paidBy, recordedBy,note,place } = req.body;
    const objj = costSplit.map(([name,amount])=>({
      benefitor: name,
      value: amount
    }))

    const newExpense = new Expense({ benefitorSplit:objj, amount, category, paidBy, recordedBy,note, place });
    const savedExpense = await newExpense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    // errorHandler(res, error); 
  }
};


exports.getExpensesByName = async (req, res) => {
  try {
    const userId = req.user;
    let filter = { user: userId };

    const { category, name } = req.query;
    if (category) {
      filter.category = category;
    }
    if (name) {
      filter.name = { $regex: new RegExp(name, 'i') }; 
    }

    const expenses = await Expense.find(filter).sort({ timestamp: -1 }); 

    res.json(expenses);
  } catch (error) {
    errorHandler(res, error); 
  }
};


exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    errorHandler(res, error); 
  }
};


exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, name, place } = req.body; 

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { $set: { amount, category, name, place } }, 
      { new: true } 
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (error) {
    errorHandler(res, error); 
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    errorHandler(res, error); 
  }
};
