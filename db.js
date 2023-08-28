const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect("mongodb+srv://Rohit2002:20022003@cluster0.riuail2.mongodb.net/geogo?retryWrites=true&w=majority");

module.exports = connection;
