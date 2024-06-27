const express = require('express');
const userRouter = require('./user_endpoints')
const cors = require('cors');
require('./db/mongoose')
const app = express();
app.use(cors())
app.use(express.json());
app.use(userRouter)

app.listen(4000, () => {
    console.log(`running on port 3000`);
})