const { Router } = require('express');
const { getDiets } = require('../models/models functions/functions');
const routerDt = Router();

routerDt.get('/',async (req, res) =>{
  const diets = await getDiets();
  res.json(diets)
});

module.exports = routerDt;