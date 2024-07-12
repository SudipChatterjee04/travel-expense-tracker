// errorHandler.js

module.exports = (res, error) => {
    console.error(error); 
  
    let statusCode = 500; 
    let message = 'Internal Server Error';
  
    
    if (error.name === 'ValidationError') {
      statusCode = 400; 
      message = error.errors.map(err => err.message).join(', '); 
    } else if (error.name === 'CastError') {
      statusCode = 400; 
      message = 'Invalid ID format';
    } else if (error.code === 11000) { 
      statusCode = 400; 
      message = 'Duplicate entry detected';
    }
  
    
  
    res.status(statusCode).json({ message });
  };
  