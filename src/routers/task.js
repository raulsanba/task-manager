const express = require("express")
const router = new express.Router()
const Task = require("../models/task")


router.post('/tasks', async(req, res)=>{
    const task = new Task(req.body)
    try{
        const newtask = await task.save()
         res.status(201).send(newtask)
    } catch(e){
        res.status(400).send(e)

    }
})

router.get('/tasks', async (req, res)=>{
    try {
        const findTask = await Task.find({})
        res.status(200).send(findTask)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/tasks/:id', async (req, res)=>{
    const _id = req.params.id
    try{
        const findTask = await Task.findById(_id)
        if (! findTask){
                    return res.status(404).send()
                } 
        res.send(findTask)
                  
    } catch(e){
        res.status(500).send() 
    }
})

router.patch('/tasks/:id', async (req, res)=>{
    const updates = Object.keys(req.body) 
    const allowUpdateArray = ["completed", "description"]
    const isValidOperation = updates.every((update)=>{
        return allowUpdateArray.includes(update)
    }) 
    if(!isValidOperation){
        return res.status(400).send({error: "Invalid update"})
    }
    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (! task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = router