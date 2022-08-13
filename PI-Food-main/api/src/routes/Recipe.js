const { Router } = require('express');
const {Recipe, Diet}= require('../db');
const { getListDb, getDetailApi, getListApi, getDetailDb } = require('../models/models functions/functions');
const routerRc = Router();

routerRc.get('/', async(req, res) =>{
  try {
    const {name} = req.query,
    api = await getListApi(name),
    db = await getListDb(name);
    
    data = {
      api:[...api], db:[...db]
    }
    
    if (!data.db.length && !data.api.length) {
      throw new Error('The requested resource is not available or cannot be found.')
    }
    res.json(data)
  } catch (error) {
    res.status(404).json({"Error" : error.message})
  }
});

routerRc.get('/:idReceta', async(req, res) =>{
  try {
    const {idReceta} = req.params;
    let data;
    if(/[0-9][.b]$/i.test(idReceta)){
      data = await getDetailDb(idReceta)
    }else{
      data = await getDetailApi(idReceta);
    }
    res.json(data)
  } catch (error) {
    res.status(404).json({"Error" : error.message})
  }
});

routerRc.post('/',  async(req, res) =>{
  try {
    const {title, summary, healthScore, instructions, dietsTypes } = req.body;
    const recipe = await Recipe.create({title, summary, healthScore, instructions});

    await recipe.addDiets([1 , 2, 3]);
    
    res.json({"message": mixin});
  } catch (error) {
    res.status(404).json({"Error" : error.message})
  }
});

module.exports = routerRc;