const express = require('express')
const connectToMongo = require('./db');
const cors = require('cors')
const app = express();

const port = 5000;
app.use(cors())

connectToMongo();

app.use(express.json())
app.use('/api/auth',require('./routes/Auth'));
app.use('/api/todo',require('./routes/Todo'));

app.listen(port);