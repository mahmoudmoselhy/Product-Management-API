const mongoose = require("mongoose")
const slugify =require("slugify")


 const ProductSchema = new mongoose.Schema({


name:{type:String,
    required:[true,"product name is required"] ,
    trim: true
 },

 description:{type:String,
    minlength: [10, "Description must be at least 10 characters"]
 },


 slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },


 price:{type:Number,
    required: [true, "Price is required"],
    min: [0, "Price must be positive"]
 },


 discount: {
    type: Number,
    default: 0
  },

  finalPrice: {
    type: Number
  },

  stock: {
    type: Number,
    required: true,
    min: 0
  },

   category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },



  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  images: [
    {
      type: String
    }
  ],

  mainImage: {
    type: String,
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },

  isActive: {
    type: Boolean,
    default: true
  }


}, { timestamps: true });



// make sluge the product name if user didn't write it 

ProductSchema.pre("save", function () {

  if (this.slug) {
    this.slug = slugify(this.slug, { lower: true });
  } else {
    this.slug = slugify(this.name, { lower: true });
  }


 if (this.discount) {
    this.finalPrice = this.price - (this.price * this.discount) / 100;
  } else {
    this.finalPrice = this.price;
  }

});


// sluge for update 

ProductSchema.pre("findOneAndUpdate", async function () {

  const update = this.getUpdate();

  if (update.slug) {
    update.slug = slugify(update.slug, { lower: true });
  }

  if (!update.slug && update.name) {
    update.slug = slugify(update.name, { lower: true });
  }

//   update price

  const product = await this.model.findOne(this.getQuery());

  const price = update.price ?? product.price;
  const discount = update.discount ?? product.discount;

  update.finalPrice = price - (price * discount) / 100;

  this.setUpdate(update);

});


module.exports = mongoose.model("Product", ProductSchema);