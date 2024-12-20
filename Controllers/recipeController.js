const recipes = require('../Models/recipeModel')

// get all recipes
exports.getAllRecipeController = async (req,res) =>{
    console.log("Inside get all recipe controller");
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get a recipes details
exports.getARecipeController = async(req,res)=>{
    console.log(("Inside get a recipe contoller"));
    const {id} = req.params
    try {
        const recipeDetails = await recipes.findById({_id:id})
        res.status(200).json(recipeDetails)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.relatedRecipeController = async(req,res)=>{
    console.log("Inside Related Recipe Controller");
    const cuisine = req.query.cuisine
    try {
        const relatedRecipes = await recipes.find({cuisine})
        res.status(200).json(relatedRecipes)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.addNewRecipeController = async(req,res)=>{
    console.log("Inside Add New Recipe Controller");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType } = req.body
    try {
        const existingRecipe = await recipes.findOne({name})
        if(existingRecipe){
            res.status(406).json("Alredy Existing in our Collection.. Add a new Recipe")
        }else{

            const newRecipe = new recipes({name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType})
            console.log(newRecipe);
            
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(401).json(error)
    }

    
}

exports.updateRecipeController = async(req,res)=>{
    console.log("Inside Update Recipe Controller");
    const {id} = req.params
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType } = req.body
    try {
        const existingRecipe = await recipes.findOne({name})
            const updatedRecipe = await recipes.findByIdAndUpdate({_id:id},{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType }, {new:true} )
            await updatedRecipe.save()
            res.status(200).json(updatedRecipe)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.deleteRecipeController = async(req,res)=>{
    console.log("Inside Delete Recipe Controller");
    const {id} = req.params
    try {
        const removeRecipe = await recipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeRecipe)
    } catch (error) {
        res.status(401).json(error)
    }
    
}