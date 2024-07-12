const mongoose = require('mongoose');

const benefitorSplitSchema = new mongoose.Schema({
    benefitor :{
        type: String,
        required: true,
      },
      value:{
        type: Number,
        required: true,
      }

})

module.exports = benefitorSplitSchema;