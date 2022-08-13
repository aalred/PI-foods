
function filterDiets(dietsTypes, newRecipes){
    if (dietsTypes !== 'all') {
        return newRecipes.map(e => {
            if(e.diets.includes(dietsTypes.toLowerCase())){
                return e
            }
            return undefined;
        }).filter(e => e !== undefined)
         
    }
    return newRecipes
}

function filterOrder ({alphabet, healthSc, dietsTypes}, recipes, search){
    if(search.api || search.db){
        let newRecipes = search.api.concat(search.db);
        newRecipes = filterDiets(dietsTypes, newRecipes);
        if (alphabet !== 'disabled') {
            return alphabet === 'asc'? 
            newRecipes.sort((a, b) =>  a.title.localeCompare(b.title)):
            newRecipes.sort((a, b) =>  b.title.localeCompare(a.title));
        }else if(healthSc !== 'disabled') {
            return healthSc === 'asc' ? 
            newRecipes.sort((a, b) =>  a.healthScore - b.healthScore):
            newRecipes.sort((a, b) =>  b.healthScore - a.healthScore);

        }else{
        return newRecipes
        }
    } 
    
    if(recipes.api || recipes.db){
        let newRecipes = recipes.api.concat(recipes.db);
        newRecipes = filterDiets(dietsTypes, newRecipes);
        if (alphabet !== 'disabled') {
            return alphabet === 'asc'? 
            newRecipes.sort((a, b) =>  a.title.localeCompare(b.title)):
            newRecipes.sort((a, b) =>  b.title.localeCompare(a.title));
        }else if(healthSc !== 'disabled') {
            return healthSc === 'asc' ? 
            newRecipes.sort((a, b) =>  a.healthScore - b.healthScore):
            newRecipes.sort((a, b) =>  b.healthScore - a.healthScore);
        }else{
            return newRecipes
        }
    } 
}

function createNumBtn(renderRec){
   const length = Math.ceil( renderRec.length/9 )
   let element = []
   
   for (let i = 1; i <= length; i++) {
    element.push(i)
   }
   
   return element
}

function switchBtns(id){

    document.querySelectorAll('.nums').forEach(e => e.disabled = false);

    document.getElementById(`${id}`).disabled = true

}

function arrayDiets(value, array){
    let diets = []
    if(array.includes(value)){        
        document.getElementById(value).style.backgroundColor = 'white';
        document.getElementById(value).style.color = 'black';
        return array.filter(e => e !== value) 
    }else if(!array.length){
        diets.push(value)
        return diets
    }
    return false
}

function arrayBackground(value, array) {
    if (!value && !array) {
        document.querySelectorAll('.diets-create').forEach(e =>{
            e.style.backgroundColor = 'white';
            e.style.color = 'black';
        })
    }else if(array.includes(value)){        
        document.getElementById(value).style.backgroundColor = 'white';
        document.getElementById(value).style.color = 'black'; 
    }else if (array) { 
        document.getElementById(value).style.backgroundColor = 'gray';
        document.getElementById(value).style.color = 'white'; 
    }
}
module.exports ={
    filterOrder,
    createNumBtn,
    switchBtns,
    arrayDiets,
    arrayBackground
}
