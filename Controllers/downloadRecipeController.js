const downloadRecipes = require('../Models/downloadModel')

exports.addToDownloadRecipesController = async(req,res)=>{
    console.log("Inside add to download recipes controller");
    const {id} = req.params
    const userId = req.userId
    const {name,image,cuisine} = req.body
    console.log(id, name, image, cuisine, userId);
    try {
        const existingRecipe = await downloadRecipes.findOne({recipeId:id})
        if(existingRecipe){
            existingRecipe.count += 1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            const newRecipe = new downloadRecipes({
                recipeId:id,
                recipeName:name,
                recipeCuisine:cuisine,
                recipeImage:image,
                count:1,
                userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.getDownloadUserListController = async(req,res)=>{
    console.log("Inside get download user list controller");
    const userId = req.userId
    try {
        const allUserDownloads = await downloadRecipes.find({userId})
        res.status(200).json(allUserDownloads)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllDownloadController = async(req,res)=>{
    console.log("inside Get all Download Controller");
    try {
        const  allDownloads = await downloadRecipes.find()
        res.status(200).json(allDownloads)
    } catch (error) {
        res.status(401).json(error)
    }
    
}