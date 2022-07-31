const { Router } = require('express');
const {Recipe}= require('../db');
const { getListDb, getDetailApi, getListApi, getDetailDb } = require('../models/models functions/functions');
const routerRc = Router();

routerRc.get('/', async(req, res) =>{
  try {
    const {name} = req.query,
    // dataApi = await getListApi(name),
    dataApi =[],
    dataDb = await getListDb(name);
    
    data = {
      dataApi:[...dataApi], dataDb:[...dataDb]
    }

    if (data.dataApi[0] === 404 && data.dataApi[0] === 404 ) {
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
})

routerRc.post('/',  async(req, res) =>{
  try {
    const {name, summary, healthScore, instructions } = req.body
    const recipe = await Recipe.create({name, summary, healthScore, instructions})
    res.json({"message": recipe.toJSON().name + " successfully loaded"})  
  } catch (error) {
    res.status(404).json({"Error" : error.message})
  }
})

module.exports = routerRc;