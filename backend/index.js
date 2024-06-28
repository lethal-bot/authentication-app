const express = require('express');
const userRouter = require('./user_endpoints')
require('dotenv').config();
const cors = require('cors');
require('./db/mongoose')
const app = express();
app.use(cors())
app.use(express.json());
app.use(userRouter)

app.listen(process.env.PORT || 4000, () => {
    console.log(`running`);
})