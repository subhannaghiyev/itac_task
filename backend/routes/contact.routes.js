const express = require('express');
const contact_router = express.Router();
const contactModelController = require("../controllers/contact.controller")

contact_router.get('/',contactModelController.getAll);

contact_router.get('/:id', contactModelController.getOne);

contact_router.delete('/:id',contactModelController.delete);

contact_router.post('/',contactModelController.post);



module.exports = contact_router;