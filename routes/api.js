const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const expenseController = require('../controllers/expenseController');
const verifyToken = require('../middlewares/authMiddleware');

console.log('api.js file is being executed');

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);

// router.use(verifyToken);
// router.use((req, res, next) => {
//     console.log('Applying verifyToken middleware');
//     verifyToken(req, res, next);
//   });

router.post('/expenses', expenseController.createExpense);

router.get('/expenses/:name', expenseController.getExpense);
router.get('/ownexpenses/:name', expenseController.getOwnExpenses);


module.exports = router;
