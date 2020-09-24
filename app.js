
const express = require('express')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { v4: uuidv4 } = require('uuid')



//WHY IN THE $%^() DOES FILENAME NOT WORK AND WTF IS THE BUFFER?????>??


const startServer = () => {
    const PORT_TO_USE = process.env.PORT || 3000
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: false}))
    // app.use('/public',express.static(uploadDirectory))
    
    const storageEngine = multer.diskStorage({
        destination: (req, file, callback) =>{
            callback(null, uploadDirectory)
        },
        filename: (req, file, callback) => {
            const fileName = file.fieldname + Date.now() + path.extname(file.originalname)
            console.log(fileName)
            callback(null, fileName)
        }
    })

    const uploadDirectory = path.resolve(__dirname, 'public/uploads')

    console.log(`The directory is ${uploadDirectory}`)


    console.log(storageEngine)
  
   const uploader = multer({ storageEngine })
    

    app.get('/', (req,res)=>{
        const path = './public/upload';
        fs.readdir(path, function(err, items) {
        
        res.send(`
        <!DOCTYPE html>
                <html lang="en">
                        <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                        </head>
                            <body>
                            <h1>Welcome to Kenziegram!</h1>
    
                            <form action="/upload" method="POST" enctype="multipart/form-data">
                                <div class="file-field input-field">
                                  <div class="btn">
                                    <span>File</span>
                                    <input type="file" name="myImage">
                                  </div>
                                  <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                  </div>
                                </div>
                                <button type="submit" class="btn">Submit</button>
                              </form>
                            </body>
                            </html>
        
        
       
        
        `)
        })
    })
    
      
    app.post('/upload', uploader.single('myImage'), function (req,res, next) {
        console.log("hello")
        res.send(req.file)
        console.log(req.file)
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