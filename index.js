

const express = require('express')
const {userRouter} = require('./routes/user.Routes')
const {postRouter} = require('./routes/post.Routes')
const cors = require('cors')
const {connection} = require('./db')
const { allPostRouter } = require('./routes/allPost.Routes')

const app = express()
app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send({"msg":"this is the homepage"})
})


app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/allpost',allPostRouter)

app.listen(8080, async()=>{
     try{
         await connection
         console.log('Connected to DB')
         console.log('Server is running at port 8080')
     }catch(err){
        console.log("Error:",err)
     }
})