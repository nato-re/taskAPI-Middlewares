const { Router } = require('express');
const rescue = require('express-rescue')
const TaskService = require('../services/TasksService');
const { validateToken, validateTaskName, validateTaskTodo } = require('../middlewares/validations')

const router = Router();

router.get('/', rescue(async (_req, res) => {
  const tasks = await TaskService.getAll();

  res.status(200).json(tasks)
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const task = await TaskService.findById(id);

  if (!task) return res.status(404).json({message: 'Task not found'})

  res.status(200).json(task);
}));

router.post('/', validateToken, validateTaskName, validateTaskTodo, rescue(async (req, res) => {
  const { name, status } = req.body;

  const task = await TaskService.create(name, status);
  
  res.status(200).json(task)
}));

router.put('/:id', validateToken, validateTaskName, validateTaskTodo, rescue(async (req, res, next) => {
    const { id } = req.params;
    const { name, deadline } = req.body;
  
    await TaskService.update(id, name, deadline);
  
    res.status(204).end();
}));

router.delete('/:id', rescue(async(req, res) => {
  const { id } = req.params;

  await TaskService.remove(id);

  res.status(204).end();
}));

module.exports = router;
