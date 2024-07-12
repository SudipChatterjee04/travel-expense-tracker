const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(error => console.error('MongoDB connection error:', error));


app.use(cors()); 
app.use(express.json()); 


const apiRouter = require('./routes/api'); 
app.use('/api', apiRouter);

// const errorHandler = require('./utils/errorHandler'); 
// app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
