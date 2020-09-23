
const express = require('express')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const multer = require('multer')





const startServer = () => {
    const PORT_TO_USE = process.env.PORT || 3000
    const app = express()
    app.use(express.static('./public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false}))

    app.get('/', (req,res)=>{
        res.send(`<h1>Welcome to Kenziegram!</h1>
    
        <form action="/upload" method="POST" enctype="multipart/form-data">
            <div class="file-field input-field">
              <div class="btn">
                <span>File</span>
                <input type="file" name="myFile">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
              </div>
            </div>
            <button type="submit" class="btn">Submit</button>
          </form>
        
        `)
    })

    app.get('/upload',(req, res) =>{
        res.send("Working")
    })    
    app.post('/upload',(req,res) => {
       if(!req.body){
           return 
       }
        

        })
    
    
    app.listen(PORT_TO_USE, () => console.log(`Server loaded on port ${PORT_TO_USE}`))
}

try{
    startServer()
}
catch(err){
    console.error("Server Error")
}

process.on('unhandledRejection', (reason, rejectedPromise) => {
    console.error(`Unhandled Rejection at${rejectedPromise} reason:${reason}`)
    process.exit(1)
})



// const storageEngine = multer.diskStorage({
//     destination: './public/uploads',
//     filename: function(req, file, callback){
//         callback(null, file.fieldname.jpg)
//     }
// })

// const fileUpload = multer({
//     storage:storageEngine
// }).single('myFile')





// ;
// fs.readdir('public/uploads', function(err, items) {
//     console.log(items);
//     ;
// });

// app.get('/upload',(req,res)=>{
//     res.send
// })



// app.post('/upload', (req,res) => {
//     fileUpload(req, res, (err) => {
//         if(err){
//             res.render('index',{
//                 err:"Error"
//             })

//          }
//               else{
//                   res.render('index')
//                   res.send(`public/uploads/${req.file.filename}`)    
//               } 
//              })
//             })
         




// app.set('view engine', 'ejs')




//app.put(/uploads/:picsID)