const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const userRoutes = require('./routes/user.routes')
const managerRoutes = require('./routes/manager.routes')
const ticketRoutes = require('./routes/ticket.routes')
const commentRoutes = require('./routes/comments.routes')

dotenv.config({ path: './config/config.env' })
require('./dbConn/dbConn')

app.use(express.json())
app.use(cors({origin: ["http://localhost:3000"], credentials: true}))
app.use(cookieParser())
app.use("/public", express.static(path.join(__dirname, "uploads")))

app.use('/api/v1', userRoutes)
app.use('/api/v1', managerRoutes)
app.use('/api/v1', ticketRoutes)
app.use('/api/v1', commentRoutes)

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Apis Working Successfully</h1>")
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`)
})