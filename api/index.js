import express from "express"
import dotenv from "dotenv"
import connectDb from "./connectDb.js"
import UserRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"

const app = express()

dotenv.config()

connectDb()

app.use(express.json())

app.use("/api",UserRoutes)
app.use("/api",authRoutes)


// app.get("/test", (req, res) => {
//     res.json({message:"API is working"})
// })

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})