import express from "express";


const app = express()

app.get("/", (req, res) => {
    res.end("HELLO FROM YOUR SERVER, good morning")
})

app.get("/health", (req, res) => {
    res.end("Server is on")
})

app.listen(process.env.PORT, ()=> console.log(`Listenning on port ${process.env.PORT}`))