const Expense = require('../models/Expense');
const User = require('../models/User')
// const verifyToken = require('../middlewares/authMiddleware'); // Import authentication middleware

// Create new expense (POST)
exports.createExpense = async (req, res) => {
  
    const { costSplit, category,paidBy, recordedBy,note,place } = req.body;
    console.log("hi")
    const objj = costSplit.map(({name,amount})=>({
      benefitor: name,
      value: amount
    }))

    
    const newExpense = new Expense({ benefitorSplit:objj, category, paidBy, recordedBy,note, place });
    const savedExpense = await newExpense.save();

    res.json({message: "success"})
  
};




exports.getExpense = async (req, res) => {
  
    const {name} = req.params;
    

    
    
    

    const expenses = await Expense.find({paidBy: name}).sort({ timestamp: -1 }); 
    let i=0;
    let Map = {}
    while(i<expenses.length){
      let bens = expenses[i].benefitorSplit;
      let j=0
      while(j<bens.length){
        let name = bens[j].benefitor;
        if(hasOwnProperty.call(Map, name)){
          Map[name]=Map[name]+bens[j].value

        }else{
          Map[name]=bens[j].value
        }
        j++;
      }
      i++;
    }
    var list = []
    for (const key in Map) {
      let smallist = []
      smallist.push(key)
      smallist.push(Map[key])
      list.push(smallist)
    }

    ret = {...expenses,list}

    res.json(ret);
  
};


exports.getOwnExpenses = async (req, res) => {
  
    const { name } = req.params;
    
    const expense = await Expense.find();
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    let i=0
    var cost = []
    for(;i<expense.length;i++){
      var x = expense[i].benefitorSplit
      var microcost =0
      var topay = expense[i].paidBy      
      var f = false;
      for(let j=0;j<x.length;j++){
        
        var pair = x[j];
        
        if(pair.benefitor===name){
          microcost = pair.value
          f=true;
          break;
        }

      }
      if(f){
        if(hasOwnProperty.call(cost, topay)){
          cost[topay]=cost[topay]+microcost

        }else{
          cost[topay]=microcost
        }
      }
      var list = []
    for (const key in cost) {
      let smallist = []
      smallist.push(key)
      smallist.push(cost[key])
      list.push(smallist)
      
    }
     

    }
    res.json({costs: list})
 
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
    //errorHandler(res, error); 
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
    //errorHandler(res, error); 
  }
};
