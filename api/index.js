import express from "express"
import dotenv from "dotenv"
import connectDb from "./connectDb.js"
import UserRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

const app = express()

dotenv.config()

connectDb()

app.use(express.json())
app.use(cookieParser())

app.use("/api",UserRoutes)
app.use("/api/auth",authRoutes)

//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})