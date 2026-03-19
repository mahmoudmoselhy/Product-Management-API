const fs = require("fs")



const logger = (req , res , next)=>{

const log = `${req.method} ${req.url} ${new Date().toISOString()}\n`

    // print log in console

    // console.log(log)

    fs.appendFile("./logs/log.txt", log, (err) => {
        if (err) {
            console.error("can not write in the file log", err)
        }
    })
    next()

};


module.exports = logger