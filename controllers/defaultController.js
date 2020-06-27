const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('../models/user');
const Writer = require("../models/WriterModel");

//passportLocalMongoose




module.exports={



index: async (req,res)=>{
//part 16
  const posts = await Post.find().populate('author').sort({"creationDate":-1});
  const categories = await Category.find();

  res.render("default/home" , {posts:posts, categories:categories, user:req.user});
},



contact: (req,res)=>{
    res.render("default/contact");
},
blogShow: async (req,res)=>{
  // const id=await req.params.id;
  const blog= await Post.findOne({slug: req.params.slug}).populate("author").populate("category").exec();
  const posts = await Post.find().sort({"creationDate":-1}).populate("author");
  console.log(
  blog.populated("author"));
  console.log(
  blog.populated("category"));
//  console.log(blog);
  console.log(blog.author);
  if(!posts){
    return res.render('default/404');

  }
  if(!blog){
    return res.render('default/404');

  }else{
    res.render('default/show' , {blog: blog,posts:posts,error: false });

  }
},

blogs: async (req,res)=>{
  const posts = await Post.find().populate('author').sort({"creationDate":-1});
  res.render('default/blogs',{posts:posts,error: false});
},



loginGet: (req,res)=>{
    res.render("default/login");
},

loginPost: (req,res)=>{
  res.redirect("admin/")
},

registerGet: (req,res)=>{
  res.render('default/register');
},

registerPost:(req,res)=>{
// const newUser= new User({username:req.body.user});
const newUser= new User({username:"CollegeTime"});

console.log(req.body);
  User.register(newUser, req.body.password , (err,user)=>{
    if(err){
      console.log(err);
      req.flash('error-message', `Oops something went wrong` );
      return res.redirect('/blogs');
    }
    passport.authenticate("local")(req,res, ()=>{
      res.redirect("/");
    })

  });
},

errorGet :(req,res)=>{
  // console.log(err);
  res.render("default/404");
},

aboutus: (req,res)=>{
    res.render("default/aboutus");
}



};
