const saveRecipes = require('../Models/saveRecipeModel')

exports.addToSaveRecipeController = async(req,res)=>{
    console.log("Inside Add to Save Recipe Controller");
    const {id} = req.params
    const userId = req.userId
    const {name, image} = req.body
    try {
        const existingRecipe = await saveRecipes.findOne({recipeId:id, userId})
        if(existingRecipe){
            res.status(406).json("Selected recipe is already in your collection!!! Please add another")
        }else{
            const newRecipe = new saveRecipes({
                recipeId:id, name, image, userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.getUserSaveRecipeController = async(req,res)=>{
    console.log("Inside Get User Save Recipe Controller");
    const userId = req.userId
    try {
        const userRecipeCollection = await saveRecipes.find({userId})
        res.status(200).json(userRecipeCollection)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.removeSaveRecipeController = async(req,res)=>{
    console.log(("Inside remove save recipe controller"));
    const {id} = req.params
   try {
    const removeSaveRecipe = await saveRecipes.findByIdAndDelete({_id:id})
    res.status(200).json(removeSaveRecipe)
   } catch (error) {
    res.status(401).json(error)
   }
    
}