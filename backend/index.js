const express = require('express');
const userRouter = require('./user_endpoints')
require('./db/mongoose')
const app = express();
app.use(express.json());
app.use(userRouter)

app.listen(3000, () => {
    console.log(`running on port 3000`);
})