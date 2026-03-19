const mongoose = require("mongoose")
const slugify = require("slugify");

export const CategorySchema = new mongoose.Schema({

 

    name:{type:String ,
         require:true , 
         main:[3, "Category Name must be at least 10 characters"] , 
         unique:true },



    descripiton:{type:String  , 
        minlength:[10, "Description must be at least 10 characters"], 
        maxlength:300},


    slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },


  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
  },


  image: {
    type: String
  },


  isActive: {
    type: Boolean,
    default: true
  }



}, { timestamps: true });

// make sluge the category name if user didn't write it 

CategorySchema.pre("save",  function() {

  if (this.slug) {
    this.slug = slugify(this.slug, { lower: true });
  } else {
    this.slug = slugify(this.name, { lower: true });
  }

});


// sluge for update 
CategorySchema.pre("findOneAndUpdate",  function (next) {

  const update = this.getUpdate();

  if (update.slug) {
    update.slug = slugify(update.slug, { lower: true });
  }

  if (!update.slug && update.name) {
    update.slug = slugify(update.name, { lower: true });
  }

  this.setUpdate(update);
  next();
});



module.exports = mongoose.model("Category",  CategorySchema);