const express = require('express')
 require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

// app.use((req, res, next)=>{
//     if(req.method === 'GET'){
//         res.send('get request disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next)=>{
    
//         res.status(503).send("WEBPAGE IN MAINTENANCE")
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('SERVER CONNECTED TO PORT : '+ port)
})
 
