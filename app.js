
const express = require('express')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')



const startServer = () => {
    const images = []
    console.log(images)
 
    const PORT_TO_USE = process.env.PORT || 3000


    const uploadDirectory = path.resolve(__dirname, 'public/uploads')
    
        
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: false}))
    app.use(express.static(uploadDirectory))
    const storageEngine = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, uploadDirectory)
        },
        filename: (req, file, cb) => {

            cb(null, uuidv4() + path.extname(file.originalname))
        }
        
    })    
   const uploader = multer({ storage: storageEngine })
    

    app.get('/', (req,res)=>{
        const path = `${uploadDirectory}`;
        console.log(path)
        
        fs.readdir(path, function(err, items) {
        let imageTags = []
        
        items.forEach(item => imageTags.push(`<img width="300px" height="250px" src="${item}"/>`))
        let newImageTags = imageTags.join(' ')
        res.send(`
        <!DOCTYPE html
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
                            ${newImageTags}
                            </body
                            </html>
        
        `)
        })
    })
  
    
    
    app.post('/upload', uploader.single('myImage'), function (req,res, next) {
        res.send(req.file)
        images.push(req.file)
        return
        
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




