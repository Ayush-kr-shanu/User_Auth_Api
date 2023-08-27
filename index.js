const express=require("express")
const { seq } = require("./Config/db")
const { routes } = require("./Routes/Routes")

const app=express()

app.use(express.json())


app.get("/", (req,res)=>{
    res.send("Welcome to backend")
})

app.use(routes)


seq.sync().then(()=>{
    app.listen(4500,()=>{
        console.log("Server Started");
    })
})