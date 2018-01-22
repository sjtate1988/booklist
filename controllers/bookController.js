// This file exports all of the http requests required by the application.
// We need to first obtain the secure database information from our .env file.
require('dotenv').config();
var mongoUser = process.env.MONGOUSER;
var mongoPw = process.env.MONGOPW;
// We require the body-parser module in order to interpret the json files from the MongoDB database.
var bodyParser = require('body-parser');

// We require the database connector mongoose.
var mongoose = require('mongoose');

// Connect to the database.
mongoose.connect('mongodb://'+mongoUser+':'+mongoPw+'@ds157185.mlab.com:57185/booklist')

// Create the schema for the project.
var bookSchema = new mongoose.Schema({
  title : String,
  author : String,
  category : String,
  haveRead : String,
  bookCover : String
});

// Create a model for the books, based on the schema.
var Book = mongoose.model('Book',bookSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/books', function(req,res){
    // Get data from the mongoDB database.
    Book.find({}, function(err,data){
      if (err) throw err;
      res.render('books', {books: data});
    });
  });
  app.post('/books', urlencodedParser, function(req,res){
    // Get data from the form and push it to mongoDB database.
    var newBook = Book(req.body).save(function(err,data){
      if (err) throw err;
      res.json(data);
    });
  });
  app.delete('/books/:title', function(req,res){
    // Delete the requested item from mongoDB.
    Book.find({title: req.params.title.replace(/\-/g," ")}).remove(function(err,data){
      if (err) throw err;
      res.json(data);
    })
  });
};
