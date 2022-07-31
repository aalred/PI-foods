const axios = require('axios')
const { Recipe } = require('../../db');
const { Op } = require("sequelize");

const {apiKey} = process.env

let data;

module.exports={
  getListApi:  async function(name){
    if (!name){
       await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100`)
        .then((response) => {
          if (!response.data.results) {
            data = [404];
          }
          data = response.data.results
      })
        .catch(err => {
          throw new Error(err.message)
      })
    } else if (name) {
       await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${apiKey}`)
      .then((response) => {
        if (!response.data.results.length) {
          data = [404];
        }
          data = response.data.results
        })
        .catch(err => {
          throw new Error(err.message)
      })
    }   
    return data;
  }, 

  
  getDetailApi: async function(id){
    if(/[a-zA-Z]/.test(id) )throw new Error('"Id" must be a number.')
    data ={
      id,
    }
    await (axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
      .then((response) => {
        data.image = response.data.image;
        data.name = response.data.title;
        data.healthScore = response.data.healthScore;
        data.diets = response.data.diets;
        data.dishTypes = response.data.dishTypes;
        data.summary = response.data.summary;
        data.instructions = response.data.instructions;
      })
      .catch(err => {
        throw new Error(err.message)
    }))

    return data;
  },
    
  getListDb: async function(name){
    if (!name) {
      data = await Recipe.findAll()  
    }else if(name){
      data = await Recipe.findAll({
        where: {
          name:{
            [Op.iLike]:`%${name}%`,
          }
        }
      })
    }
    if(!data.length) return [404]
    return data
  },

  getDetailDb: async function(id){
    id = parseInt(id)
    data = await Recipe.findByPk(id)
    if(!data) throw new Error('Request failed with status code 404')
    return data
  }

}
