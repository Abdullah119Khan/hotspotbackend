const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRoutes = require('./routes/user.routes')
const managerRoutes = require('./routes/manager.routes')
const ticketRoutes = require('./routes/ticket.routes')

dotenv.config({ path: './config/config.env' })
require('./dbConn/dbConn')

app.use(express.json())
app.use(cors({origin: ["http://localhost:3000"], credentials: true}))
app.use(cookieParser())

app.use('/api/v1', userRoutes)
app.use('/api/v1', managerRoutes)
app.use('/api/v1', ticketRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`)
})