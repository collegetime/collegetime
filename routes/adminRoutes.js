const express = require("express");
const router = express.Router();
var expressLayouts = require('express-ejs-layouts');
const adminController =require("../controllers/adminController");
router.use(expressLayouts);

router.all('/*', isLoggedIn, (req,res,next)=>{
// router.all('/*', (req,res,next)=>{

 // req.app.locals.layout= 'admin';
 req.app.set('layout', 'layouts/admin');

  next();
})


//for the home page
router.route('/')
  .get(adminController.index);




//this is foor post
  router.route('/posts')
    .get(adminController.getPosts);



  router.route("/posts/create")
    .get(adminController.createPostsGet)
    .post(adminController.submitPosts);

  router.route('/posts/edit/:id')
  .get(adminController.editPostGetRoute)
  .put(adminController.editPostUpdateRoute);


  router.route('/posts/delete/:id')
    .delete(adminController.deletePost);

/* >>>>>>>>>>admin category routes<<<<<<<<<   */
router.route('/writers')
  .get(adminController.getWriters)
  .post(adminController.createWriters);

// router.route('/category/create')
//   .post(adminController.createCategories);

  router.route('/writers/edit/:id')
    .get(adminController.editWritersGetRoute)
    .post(adminController.editWritersPostRoute);

    router.route('/writers/delete/:id')
      .delete(adminController.deleteWriters);

router.route('/category')
  .get(adminController.getCategories)
  .post(adminController.createCategories);

// router.route('/category/create')
//   .post(adminController.createCategories);

  router.route('/category/edit/:id')
    .get(adminController.editCategoriesGetRoute)
    .post(adminController.editCategoriesPostRoute);

    router.route('/category/delete/:id')
      .delete(adminController.deleteCategory);

  router.route('/newsletter')
      .get(adminController.newsletter);

  router.route('/newsletter/create')
      .post(adminController.Createnewsletter);

  router.route('/contact')
      .get(adminController.Contactform);

  router.route('/contact/create')
      .post(adminController.submitContactform);

      //for log out
      router.get("/logout", (req,res)=>{
        req.logout();
        res.redirect('/');
      });

//authentication customFunction
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
// res.redirect('/err');
res.redirect('/404');

};


module.exports= router;
