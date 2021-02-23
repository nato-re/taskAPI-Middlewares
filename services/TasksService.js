const Task = require('../models/Task');
const TelegramClient = require('../utils/TelegramClient');

const getAll = async () => {
  return await Task.getAll();
};

const findById = async (id) => {
  return await Task.findById(id);
};

const create = async (name, status) => {
  const task = await Task.create(name, status);

  await TelegramClient.sendMessage(name);

  return task;
}

const update = async (id, name, deadline) => {
  await TelegramClient.sendMessage(`${name} foi atualizada!`);

  return await Task.update(id, name, deadline);
}

const remove = async (id) => {
  await TelegramClient.sendMessage(`Tarefa #${id} foi removida!`);

  return await Task.remove(id);
}



module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
}