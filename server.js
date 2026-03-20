const express = require("express")
const mongoose = require('mongoose');
const errorHandler = require("./middleware/error_handelar")
const logger = require("./middleware/logger")

require('dotenv').config({ path: './conf.env' });
const app = express()


app.use(express.json())
app.use(logger)



const userRoute = require("./Routes/User_route")
const adminRoute = require("./Routes/admin_route")
const categoryRoutes = require("./Routes/category_route");
const productRoutes = require("./Routes/product_route");


app.use("/api/users",userRoute)
app.use("/api/admin",adminRoute)
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);


app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Conected sucssess"))
.catch((err)=>console.log(err))




app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`server is runing on http://localhost:${process.env.PORT}`)
})