const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const logger = require("../logs/winston-setting");

const prisma = new PrismaClient()

// GET tasks
router.get('/', async(req, res, next) => {
  logger.info('Info Get tasks start');
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
  logger.info('Info Get tasks end');
});

// GET task
router.get('/:id', async(req, res, next) => {
  logger.info('Info Get task start');
  try {
    const { id } = req.params
    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      }
    })
    res.json(task);
  } catch (error) {
    next(error)
  }
  logger.info('Info Get task end');
});

// POST task
router.post('/', async(req, res, next) => {
  logger.info('Info Post task start');
  try {
    const task = await prisma.task.create({
      data: req.body,
    })
    res.json(task);
  } catch (error) {
    next(error)
  }
  logger.info('Info Post task end');
});

// DELETE task
router.delete('/:id', async(req, res, next) => {
  logger.info('Info Delete task start');
  try {
    const { id } = req.params
    const deleteTask = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(deleteTask);
  } catch (error) {
    next(error)
  }
  logger.info('Info Delete task end');
});

// PATCH task
router.patch('/:id', async(req, res, next) => {
  logger.info('Info Patch task start');
  try {
    const { id } = req.params
    const task = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: {
        category: true
      } 
    })
    res.json(task);
  } catch (error) {
    next(error)
  }
  logger.info('Info Patch task end');
});

module.exports = router;