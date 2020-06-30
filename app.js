//importing diffrent modules

const {globalVariables} = require('./config/configuration');

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("express-handlebars");
const {mongoDbUrl,PORT, hostname }= require('./config/configuration');
// var expressLayouts = require('express-ejs-layouts');
var bodyParser= require("body-parser");
const ejsLint = require('ejs-lint');

const flash = require("connect-flash");
const session = require('express-session'); //with flash
const methodOverride = require('method-override');

// const {selectOption}= require("./config/customFunctions");  //fro config/customFunction

const fileUpload = require("express-fileupload");//for file upload

const expressSanitizer = require("express-sanitizer");

const app = express();



//configure Mongoose to Connect to mongoose
mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true } )
 .then(response=>{
   console.log('MongoDB Connected Sucessfully');
 }) .catch( err=>{
   console.log('Database connection failed');
 })

 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json());

//sanitizer (it remove the script tag)
app.use(expressSanitizer());


 /*configure express*/
 app.use(express.json()); //same as body parser
 app.use(express.urlencoded({extended:true}));
 app.use(express.static(path.join(__dirname, 'public')));


 /*Flash and session*/
 app.use(session({
   secret: 'College time is of 7 people' ,
   saveUninitialized : true, //save the session if it even unmodified
   resave : true

 }));




 /*  view Engine to Use ejs*/
 // app.use(expressLayouts);
 // app.set('layout', 'layouts/default');
 app.set('view engine' , 'ejs');
 app.use(flash());


 /*  view Engine to Use Handlebars*/

 // app.engine('handlebars', hbs({defaultLayout: 'default'}));
 // app.set('view engine' , 'handlebars');
 // /*  view Engine to Use ejs*/

 /*method overricde methos for put and delete*/
app.use(methodOverride('newMethod'));

//for flash and views/partials/admin/messages
 app.use(globalVariables);

//for file upload middleware
app.use(fileUpload());

//local username
app.use(function(req,res,next){
  res.locals.user = req.user;
  next();
})


//routes things
  const defaultRoutes = require("./routes/defaultRoutes");
  const adminRoutes = require("./routes/adminRoutes");

  app.use("/", defaultRoutes);
  app.use("/admin", adminRoutes);
 

//passport


//404 error
app.get("/*" , (req,res)=>{
  res.render("default/404");
});


app.listen(PORT, () => {
console.log("**********************>><<***********************")
console.log(`Server running at port ${PORT}`);
console.log("**********************>><<***********************")
});
