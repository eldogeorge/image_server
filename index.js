
// CMAS3
//after install 'dotenv', file first should be req connect env file, then goto line serverS6
require('dotenv').config()


// import file
// ServerS1 after create folder
const express=require('express')
// ServerS3
const cors=require('cors')
// ServerS2
const server=express()
// SPS5 import router
const router=require('./Routes/Routes')


//CMAS6 import db connections file over ,then goto routes for set paths
require('./dataBase/connections')


// ServerS4 we are host server
server.use(cors())
// ServerS5  json to js
server.use(express.json())
// SPS6 over then goto logic.js
server.use(router)



// export uploads folder to client
server.use('/studentUploads',express.static('./studentUploads'))

// ServerS6 set port and listen
                //CMAS4 set port, then goto connections.js
const port=8000 || process.env.port
server.listen(port,()=>{
    console.log(`--------- ERP Server Started at Port Number ${port} ---------`);
})
