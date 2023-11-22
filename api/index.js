import express from "express"
import authRoutes from "./routes/auth.js"
import profileRoute from "./routes/profile.js"
import studentRoutes from "./routes/student.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoute)
app.use("/api/student", studentRoutes)

app.listen(8800, () => {
    console.log("Connected to backend.")
})