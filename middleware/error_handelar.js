const fs = require("fs")


const errorHandler = (err , req ,res , next)=>{

const log = `${new Date().toISOString()} - ${err.message}\n`
    // print the erorr in console 

    // console.error(err.stack);




    // write the erorr in log file 

    fs.appendFile("./logs/error.log",log ,(er)=>{
        if(er){
            console.error("can not write in the file log erorrr",er)
        }
    })



    const statusCode =err.statusCode || 500 ;

    res.status(statusCode).json({message:"something error", err : err.message})
}


module.exports = errorHandler