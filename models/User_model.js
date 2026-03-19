const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

 const UserSchema = new mongoose.Schema({



    name:{type:String , 
       
        required:[true,"your name  is required"]},



    email:{type:String , 
        required:[true,"email is required"],
        unique : [true,"email must be unique"] ,
        lowercase:true,
       trim:true,
       match:[/^\S+@\S+\.\S+$/,"Please use a valid email"]
    },


    phone:{
  type:String,
  minlength:[8,"Phone must be at least 8 digits"],
  maxlength:[15,"Phone must be less than 15 digits"]
},

    address:{
  city:String,
  street:String,
  country:String,
  postalCode:String
},
    
    age: { type: Number },

    password:{type:String , 
        required:[true,"Password is require"] },

    //  confirmpassword: { type: String, 
    //     required: true },

   role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
},


}, { timestamps: true });



// Hash password before saving
UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // this.confirmpassword = this.password; // store hashed password
    }
   
});




module.exports = mongoose.model('User', UserSchema);