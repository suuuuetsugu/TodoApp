const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const logger = require("../logs/winston-setting");

const prisma = new PrismaClient()

// GET categories
router.get('/', async(req, res, next) => {
  logger.info('Info Get categories start');
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    next(error);
  }
  logger.info('Info Get categories end');
});

// GET category
router.get('/:id', async(req, res, next) => {
  logger.info('Info Get category start');
  try {
    const { id } = req.params
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      }
    })
    res.json(category);
  } catch (error) {
    next(error)
  }
  logger.info('Info Get category end');
});

module.exports = router;