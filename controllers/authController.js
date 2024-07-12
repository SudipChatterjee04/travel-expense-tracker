const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler'); 


// Signup
exports.createUser = async (req, res) => {
  
  const {name,type} = req.body;
  const ret = await User.create({name,type});
  

  res.json({message: "success"})

};

exports.getUser = async (req, res) => {
  
  const {name} = req.params;
  const ret = await User.find({name});
  console.log(ret)
  

  res.json({data: ret})

};
exports.checks = async (req, res) => {
  
  
  

  res.json({message: "checking123"})

};

// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
//     const savedUser = await user.save();

//     const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '365d' }); 

//     res.status(201).json({ user: savedUser.toJSON(), token }); 
//   } catch (error) {
//     errorHandler(res, error); 
//   }
// };

// // Login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '365d' }); 

//     res.json({ user: user.toJSON(), token });
//   } catch (error) {
//     errorHandler(res, error); 
//   }
// };
