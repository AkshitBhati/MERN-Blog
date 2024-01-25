import express from "express"
import dotenv from "dotenv"
import connectDb from "./connectDb.js"

const app = express()

dotenv.config()

connectDb()

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})