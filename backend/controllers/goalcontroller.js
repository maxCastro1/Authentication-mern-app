const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')


const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals) 
})

const createGoals = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')  
    }
    const goal = await Goal.create({
        text:req.body.text,
        user:req.user.id

    })
    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(404)
        throw new Error('goal was not found')  
    }
    if(!req.user){
        res.status(401)
        throw new Error("user not found")
    }
    if (goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })
    res.status(200).json(updateGoal)
})

const deleteGoal = asyncHandler(async (req,res)=> {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(404)
        throw new Error('goal was not found')  
    }
   
    if(!req.user){
        res.status(401)
        throw new Error("user not found")
    }
    if (goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
    await goal.remove()
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getGoals,
    createGoals,
    updateGoal,
    deleteGoal 

}