import express from "express"
import dotenv from "dotenv"
import connectDb from "./connectDb.js"
import cookieParser from "cookie-parser"
import UserRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import commetRoutes from "./routes/comment.route.js"
import path from "path"

const app = express()

dotenv.config()

const __dirname = path.resolve()

connectDb()

app.use(express.json())
app.use(cookieParser())

app.use("/api",UserRoutes)
app.use("/api/auth",authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commetRoutes)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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