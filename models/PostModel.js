const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
title :{
  type: String,
  required : true
},

//This is for Url Slug

slug :{
  type: String,
  required : true
},
author :{
  type:Schema.Types.ObjectId,
  ref: 'author'


},

// status :{
//   type:String,
//   default: 'public'
//
// },

imgalt :{  //this is for img alt
  type:String,
  required: true
},

summary :{
  type:String,
  required: true
},

 description :{
   type:String,
   required: true
},

 creationDate: {
   type: String,
   required: true
 },

 //linkng this user model
 user:{
   type: Schema.Types.ObjectId,
   ref: 'user'   //name of the post model model
 },

 //linking category model
 category : {
   type: Schema.Types.ObjectId,
   ref : 'category'
 },
  // allowComments: {
  //   type:Boolean,
  //   default: false
  // },

    file: {
        type: String,
        default: ''
    },
    //This is for Url Slug

    quote :{
      type: String,
      required : true
    },
    quoteaut :{
      type:String,
      default: ''
    }
});

module.exports=mongoose.model('post', PostSchema );
