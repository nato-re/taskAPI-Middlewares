const express = require('express');
const TasksController = require('./controllers/TasksController');
const bodyParser = require('body-parser');
const middlewareErroInesperado = require('./middlewares/unexpextedError')

const app = express();

app.use(bodyParser.json());

app.use('/tasks', TasksController);

app.get('/', (req, res) => {
  res.status(200).json({ok: true})
})

app.use(middlewareErroInesperado)

app.listen(3000);