import express from "express"
import authRoutes from "./routes/auth.js"
import profileRoute from "./routes/profile.js"
import studentRoutes from "./routes/student.js"
import exploreRoute from "./routes/explore.js"
import clubRoutes from "./routes/club.js"
import volunteerRoutes from "./routes/volunteer.js"
import programRoutes from "./routes/program.js"
import eventRoutes from "./routes/event.js"
import announcementRoutes from "./routes/announcement.js"
import cookieParser from "cookie-parser"
import tagRoutes from './routes/tag.js'

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoute)
app.use("/api/student", studentRoutes)
app.use("/api/explore", exploreRoute)
app.use("/api/club", clubRoutes)
app.use("/api/volunteer", volunteerRoutes)
app.use("/api/program", programRoutes)
app.use("/api/event", eventRoutes)
app.use("/api/announcement", announcementRoutes)
app.use('/api/tag', tagRoutes)

app.listen(8800, () => {
    console.log("Connected to backend.")
})