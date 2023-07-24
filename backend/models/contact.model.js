const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  firstname: String,
  email: String,
  subject: String,
  messages:String
});

const contactModel = mongoose.model('Contact', contactSchema);


module.exports = contactModel