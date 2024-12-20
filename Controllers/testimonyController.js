const testimonials = require('../Models/testimonyModel')

exports.addTestimonyController = async(req,res)=>{
    console.log("Inside addTestimonyController");
    const {name, email, message} = req.body
    try {
        const newTestimonial = new testimonials({
            name, email, message
        })
        newTestimonial.save()
        res.status(200).json(newTestimonial)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.getAllFeedbackController = async(req,res)=>{
    console.log("Inside Get all Feedback Controller");
    try {
        const  allFeedbacks = await testimonials.find()
        res.status(200).json(allFeedbacks)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.updateFeedbackStatusController = async(req,res)=>{
    console.log("Inside Update Feedback Status Controller");
    const {id} = req.params
    const status = req.query.status
    try {
        const existingFeedback = await testimonials.findById({_id:id})
        existingFeedback.status = status
        existingFeedback.save()
        res.status(200).json(existingFeedback)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllApprovedFeedbackController = async(req,res)=>{
    console.log("Inside Get all Approved Feedback Controller");
    try {
        const  allApprovedFeedbacks = await testimonials.find({status:"Approved"})
        res.status(200).json(allApprovedFeedbacks)
    } catch (error) {
        res.status(401).json(error)
    }
}