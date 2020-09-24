
const express = require('express')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { v4: uuidv4 } = require('uuid')






const startServer = () => {
    const PORT_TO_USE = process.env.PORT || 4000
    const app = express()
    app.use(express.static('./public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false}))
    
    

    const uploadDirectory = path.resolve(__dirname, "public/uploads")

    console.log(`The directory is ${uploadDirectory}`)

    const storageEngine = multer.diskStorage({
        destination: (req, file, callback) =>{
            callback(null, uploadDirectory)
        },
        filename: function(req, file, callback){
            const fileName =`${uuidv4}${path.extname(file.originalname)}`
            callback(null, fileName)
        }
    })

   const uploader = multer({ storageEngine })
    

    app.get('/', (req,res)=>{
        const path = './public/uploads';
        fs.readdir(path, function(err, items) {
        
        res.send(`<h1>Welcome to Kenziegram!</h1>
    
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
        
        `)
        })
    })
    
      
    app.post('/upload', uploader.single('myImage'), function (req,res, next) {
        console.log("hello")
        res.send(req.file)
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