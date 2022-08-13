const axios = require('axios');
const { Op } = require("sequelize");
const { Recipe, Diet } = require('../../db');

const {apiKey} = process.env;

let data;

module.exports={
  getListApi:  async function(name){

    if (!name){
       await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)
        .then((response) => {
          if (!response.data.results) {
            data = [];
          }
          data = response.data.results
      })
        .catch(err => {
          throw new Error(err.message)
      })
    } else if (name) {
       await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${apiKey}&number=100&addRecipeInformation=true`)
      .then((response) => {
        if (!response.data.results.length) {
          data = [];
        }
          data = response.data.results
        })
        .catch(err => {
          throw new Error(err.message)
      })
    }   
  
    return data.map(e => {
      const recipes = {};
      recipes.id = e.id;
      recipes.title = e.title;
      recipes.image = e.image;
      recipes.healthScore = e.healthScore;
      recipes.diets = e.diets;

      return recipes
    });
  }, 

  
  getDetailApi: async function(virtualID){
    if(/[a-zA-Z]/.test(virtualID) )throw new Error('"Id" must be a number.')
    data = {
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
        throw new Error(err.message);
    }));
    return data;
  },
    
  getListDb: async function(name){
    if (!name) {
      data = await Recipe.findAll({
        include: Diet
      });  
    }else if(name){
      data = await Recipe.findAll({
        include: Diet, 
        where: {
          name:{
            [Op.iLike]:`%${name}%`,
          }
        },
      });
    }
    if(!data.length) return []
    return data;
  },

  getDetailDb: async function(id){
    id = parseInt(id)
    data = await Recipe.findByPk(id)
    if(!data) throw new Error('Request failed with status code 404');
    return data;
  },

  getDiets: async function(){
    data = await Diet.findAll();
    if(!data.length){
      data = await Diet.bulkCreate([
        {name:"Gluten Free"},
        {name:"Ketogenic"},
        {name:"Lacto Ovo Vegetarian"},
        {name:"Vegan"},
        {name:"Pescatarian"},
        {name:"Paleolithic"},
        {name:"Primal"},
        {name:"Fodmap Friendly"},
        {name:"Whole 30"},
        {name:"Fruitarian"},
        {name:"Clean Eating"},
        {name:"Mediterranean"},
        {name:"Weight Watchers"},
        {name:"Grain Free"},
        {name:"Dairy Free"},
        {name:"GAPS"},
      ]);
    }
    return data;
  }
}
