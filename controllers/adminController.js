  const Post = require("../models/PostModel");
  const Category = require("../models/CategoryModel");
  const {isEmpty}= require("../config/customFunctions");  //fro config/customFunction
  const Newsletter = require("../models/NewsletterModel");
  const Contact = require("../models/ContactModel");
  const Writer = require("../models/WriterModel");
  const moment = require("moment");
  const slugify = require('slugify');

  module.exports={

  index: (req,res)=>{
    res.render("admin/index");

  console.log(req.user);
  },


  getPosts: (req,res)=>{
     // res.send("this is submitting");
     //this will display all post in admin/post/index

                  Post.find().sort({"rank":1})

                  .populate('category').populate('author')  //this si adding whole category model to  id linked with  postPush
                  .then(posts => {
                    if(!posts)
                    {res.render("default/404");}
                    else{
                      res.render('admin/posts/index' ,{ posts: posts});

                    }
                  })
                  .catch(error => {
                    console.log(error);
                    req.flash('error-message', `Oops something went wrong` );
                    res.redirect('/admin');
                  });


   },



   submitPosts: (req,res)=>{
            // res.send("post submitted")
            //this is from post model
            // console.log(req.body);  //this was just for debugging

         // /this is for passing on and off comments
            // const commentAllowed = req.body.allowComments ? true: false;

   //sanitize the blog from script file
             req.body.description =req.sanitize(req.body.description);


            //check for any input file "||" part 17
            let filename = '';

        if(!isEmpty(req.files)) {
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';

            file.mv(uploadDir+filename, (err) => {  //.mv function comes with our package
                if (err)
                    throw err;
            });
        }
        title1 = req.body.title.toLowerCase();
        var today = moment().format('DD MMM YYYY');
        var count;
            const newPost = new Post({
              title : title1,
              author : req.body.author,
              summary : req.body.summary,
              imgalt : req.body.imgalt,
              creationDate : today,
              slug : req.body.slug,
              description : req.body.description,
              // status : req.body.status,
              // allowComments: commentAllowed,  //this is for passing on and off comments
              category: req.body.category,//connecting id of categorymodel to PostModel
              file: `/uploads/${filename}`,
              quote : req.body.quote,
              quoteaut : req.body.quoteaut,
            });

            newPost.save().then(post =>{
              // console.log(post); //this is just for debugging
              req.flash('success-message' , "Post Created Sucessfully");
              res.redirect("/admin/posts");
            }).catch((error) => {
              console.log(err);
              req.flash('error-message', `Oops something went wrong` );
              res.redirect('/admin/posts');
            });

          },




  createPostsGet:async (req,res)=>{
    const writers = await Writer.find();
    Category.find().then(cats=>{
      res.render("admin/posts/create", {categories:cats,writers:writers});

    }).catch((error) => {
      console.log(err);
      req.flash('error-message', `Oops something went wrong` );
      res.redirect('/admin/posts');
    });

  },


  editPostGetRoute : async (req,res)=>{
    //id from params root
    const id= req.params.id;
    const writers = await Writer.find();
    Post.findById(id)

    .then(post => {
        //passing to edit form, and finding category and sending into edit form
        Category.find().then(cats=>{

          res.render('admin/posts/edit' , {post: post, categories:cats,writers:writers });

        })

    }).catch((error) => {
      console.log(err);
      req.flash('error-message', `Oops something went wrong` );
      res.redirect('/admin/posts');
    });


  },


//for updating post
editPostUpdateRoute: (req, res) => {
          // const commentsAllowed = req.body.allowComments ? true : false;


          const id = req.params.id;
        console.log(req.body);
          //sanitize the blog from script file
                    req.body.description =req.sanitize(req.body.description);
                    req.body.summary =req.sanitize(req.body.summary);
                    req.body.slug =slugify(req.body.slug, {
                                                              replacement: '-',  // replace spaces with replacement character, defaults to `-`
                                                              remove: undefined, // remove characters that match regex, defaults to `undefined`
                                                              lower: true,      // convert to lower case, defaults to `false`
                                                              strict: false,     // strip special characters except replacement, defaults to `false`
                                                            });

          Post.findById(id)
              .then(post => {

                  post.title = req.body.title;
                  post.author = req.body.author;
                  post.slug = req.body.slug.toLowerCase();
                  // post.status = req.body.status;
                  // post.allowComments = req.body.allowComments;
                  post.summary = req.body.summary;
                  post.imgalt = req.body.imgalt;
                  post.description = req.body.description;
                  post.category = req.body.category;
                  quote : req.body.quote;
                  quoteaut : req.body.quoteaut;

                  post.save().then(updatePost => {
                      req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                      res.redirect('/admin/posts');

                  });
              })
              .catch((error) => {
                console.log(err);
                res.redirect('/admin/posts');
                req.flash('error-message', `Oops something went wrong` );

              });

      },



deletePost : (req,res)=>{

  Post.findByIdAndDelete(req.params.id)
      .then(deletedPost =>{
        // deletedPost.remove();
        req.flash('success-message', `The post ${deletedPost.title} has been deleted` );
        res.redirect('/admin/posts');
      })
      .catch((error) => {
        console.log(err);
        req.flash('error-message', `Oops something went wrong` );
        res.redirect('/admin/posts');
      });

  },
  getWriters : (req,res)=>{
  Writer.find().then(cats =>{
      res.render('admin/writers/index' ,{writers :cats});
    }).catch((error) => {
      console.log(err);
      req.flash('error-message', `Oops something went wrong` );
      res.redirect('/admin');
    });

  },
  createWriters: (req, res) => {
        var aut = req.body.author;
        var insta = req.body.insta;
        var linked = req.body.linked;
        let filename='';
          // console.log(categoryName);
          // console.log("par");
          // console.log(req.body.title);
          if(!isEmpty(req.files)) {
              let file = req.files.file;
              filename = file.name;
              let uploadDir = './public/uploads/';

              file.mv(uploadDir+filename, (err) => {  //.mv function comes with our package
                  if (err)
                      throw err;
              });
          }
        if (aut) {
            const newCategory = new Writer({
                author: aut,
                autphoto: `/uploads/${filename}`,
                Instagram: insta,
                LinkedIn: linked
            });

            newCategory.save().then(writer => {
                res.status(200).json(writer);
            }).catch((error) => {
              console.log(err);
              req.flash('error-message', `Oops something went wrong` );
              res.redirect('/admin');
            });
        }

    },
    editWritersGetRoute: async (req, res) => {
          const wrId = req.params.id;
  //INSTED OF .then we have used asynk and await
          const wrs = await Writer.find();


          Writer.findById(wrId).then(wr => {

              res.render('admin/writers/edit', {writers: wrs, writer: wr});

          });
      },


      editWritersPostRoute: (req, res) => {
          const wrtId = req.params.id;
          const wrname = req.body.author;
          var insta = req.body.insta;
          var linked = req.body.linked;

          if (wrname) {
              Writer.findById(wrtId).then(writer => {

                  writer.author = wrname;
                  writer.Instagram = insta;
                  writer.LinkedIn = linked;
                  writer.save().then(updated => {
                      res.status(200).json({url: '/admin/writers'}); //json response for ajax
                  });

              });
          }
      },
      deleteWriters: (req,res)=>{

        Writer.findByIdAndDelete(req.params.id)
            .then(deletedPost =>{
              // deletedPost.remove();
              req.flash('success-message', `The post ${deletedPost.author} has been deleted` );
              res.redirect('/admin/writers');
            }).catch((err) => {
              console.log(err);
              req.flash('error-message', `Oops something went wrong` );
              res.redirect('/admin');
            });

        },
  /* >>>>>>>>>>admin category methods<<<<<<<<<   */

getCategories : (req,res)=>{
  Category.find().then(cats =>{
    res.render('admin/category/index' ,{ categories :cats});
  }).catch((error) => {
    console.log(err);
    req.flash('error-message', `Oops something went wrong` );
    res.redirect('/admin/posts');
  });

},
createCategories: (req, res) => {
      var categoryName = req.body.name;
        // console.log(categoryName);
        // console.log("par");
        // console.log(req.body.title);

      if (categoryName) {
          const newCategory = new Category({
              title: categoryName
          });

          newCategory.save().then(category => {
              res.status(200).json(category);
          }).catch((error) => {
            console.log(err);
            req.flash('error-message', `Oops something went wrong` );
            res.redirect('/admin/category');
          });
      }

  },


  editCategoriesGetRoute: async (req, res) => {
        const catId = req.params.id;
//INSTED OF .then we have used asynk and await
        const cats = await Category.find();


        Category.findById(catId).then(cat => {

            res.render('admin/category/edit', {category: cat, categories: cats});

        });
    },


    editCategoriesPostRoute: (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.name;

        if (newTitle) {
            Category.findById(catId).then(category => {

                category.title = newTitle;

                category.save().then(updated => {
                    res.status(200).json({url: '/admin/category'}); //json response for ajax
                });

            });
        }
    },
    deleteCategory : (req,res)=>{

      Category.findByIdAndDelete(req.params.id)
          .then(deletedPost =>{
            // deletedPost.remove();
            req.flash('success-message', `The post ${deletedPost.title} has been deleted` );
            res.redirect('/admin/category');
          }).catch((err) => {
            console.log(err);
            req.flash('error-message', `Oops something went wrong` );
            res.redirect('/admin/category');
          });

      },

      newsletter : (req,res)=>{
        Newsletter.find().then(mail =>{
          res.render('admin/newsletter/index' ,{ mails :mail});
        }).catch((error) => {
          console.log(err);
          req.flash('error-message', `Oops something went wrong` );
          res.redirect('/admin/index');
        });

      },
      Createnewsletter: (req, res) => {
            var categoryName = req.body.mail;
              // console.log(categoryName);
              // console.log("par");
              // console.log(req.body.title);

            if (categoryName) {
                const newCategory = new Newsletter({
                    mail: categoryName
                });

                newCategory.save().then(category => {
                    res.status(200).json(category);
                }).catch((error) => {
                  console.log(err);
                  req.flash('error-message', `Oops something went wrong` );
                  res.redirect('/admin/newsletter');
                });
            }

        },
        Contactform: (req,res)=>{
           // res.send("this is submitting");
           //this will display all post in admin/post/index

                        Contact.find()
                        .then(contact => {
                        res.render('admin/contact/index' ,{ contact: contact});
                        })
                        .catch(error => {
                          console.log(err);
                          req.flash('error-message', `Oops something went wrong` );
                          res.redirect('/admin');
                        });


         },
         submitContactform: (req,res)=>{



         //sanitize the blog from script file
                   req.body.message =req.sanitize(req.body.message);

                  const contact = new Contact({
                    message : req.body.message,
                    name : req.body.name,
                    mail : req.body.mail,
                    subject : req.body.subject,
                  });

                  contact.save().then(contact => {
                      res.status(200).json(contact);
                  }).catch((error) => {
                    console.log(err);
                    req.flash('error-message', `Oops something went wrong` );
                    res.redirect('/admin/contact');
                  });

                },




}
