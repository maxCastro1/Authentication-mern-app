const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
var cors = require('cors')
const app = express()
connectDB(app)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals',require('./routes/goalRoutes.js'))
app.use('/api/users',require('./routes/userRoutes.js'))
app.use(errorHandler)
