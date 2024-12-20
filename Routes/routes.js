const express = require('express')
const recipeController = require('../Controllers/recipeController')
const testimonyController = require('../Controllers/testimonyController')
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../middleware/jwtmiddleware')
const downloadRecipeController = require('../Controllers/downloadRecipeController')
const saveRecipeController = require('../Controllers/saveRecipeController')

const router = new express.Router

router.get("/all-recipes", recipeController.getAllRecipeController)
router.post("/add-testimony", testimonyController.addTestimonyController)
router.post("/register", userController.addUserController)
router.post("/login", userController.loginUserController)
router.get("/recipe/:id/view", jwtMiddleware,recipeController.getARecipeController)
router.get("/related-recipes", jwtMiddleware,recipeController.relatedRecipeController)
router.post("/recipe/:id/download", jwtMiddleware,downloadRecipeController.addToDownloadRecipesController)
router.post("/recipe/:id/save", jwtMiddleware,saveRecipeController.addToSaveRecipeController)
router.get("/get-save-recipe", jwtMiddleware,saveRecipeController.getUserSaveRecipeController)
router.delete("/save-recipes/:id/remove", jwtMiddleware, saveRecipeController.removeSaveRecipeController)
router.get("/user-downloads", jwtMiddleware,downloadRecipeController.getDownloadUserListController)
router.post("/user/edit", jwtMiddleware, userController.editUserController)
router.get("/user-list", jwtMiddleware, userController.getAllUserController)
router.get("/download-list", jwtMiddleware, downloadRecipeController.getAllDownloadController)
router.get("/all-feedbacks", jwtMiddleware, testimonyController.getAllFeedbackController)
router.get("/feedback/:id/update", jwtMiddleware, testimonyController.updateFeedbackStatusController)
router.get("/all-approved-feedbacks", testimonyController.getAllApprovedFeedbackController)
router.post("/add-recipe",jwtMiddleware ,recipeController.addNewRecipeController)
router.put("/recipe/:id/edit",jwtMiddleware ,recipeController.updateRecipeController)
router.delete("/recipe/:id/delete", jwtMiddleware, recipeController.deleteRecipeController)













module.exports = router