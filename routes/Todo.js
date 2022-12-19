const Todo = require('../model/Todo');
const express = require('express');
const router = express.Router();

router.post('/add/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, label } = req.body;
    if (title && description) {
        if (await Todo.findOne({ user: id, title: title })) {
            res.status(404).json({ success: false, msg: "please enter another title", statusCode: 404 });
        } else {
            try {
                let todo = await Todo.create({ title: title, description: description, label: label, user: id });
                res.status(201).json({ success: true, data: todo,statusCode:201 })
            }
            catch (err) {
                console.log(err)
                res.status(500).json({ success: false, msg: "Internal server error",statusCode:500 });
            }
        }

    } else {
        res.status(404).json({ success: false, msg: "all fields are not provided", statusCode: 401 });
    }

})

// router.update('/add/:id',async (req,res)=>{
//     const {id} = req.params;
//     const {title,description,label} = req.body;

//     try{
//         let todo = await Todo.create({title:title,description:description,label:label,user:id});
//         res.status(201).json({success:true,data:todo})
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({success:false,msg:"Internal server error"});
//     }
// })

router.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let notes = await Todo.find({ user: id })
        res.status(200).json({ success: true, data: notes })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, msg: "Internal server error" })
    }
})

router.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const {title} = req.body;
    try{
        let note = await Todo.findOne({user:id});
        if(!note){
            res.status(404).json({success:false,msg:"notes not found"})
        }else{
            await Todo.findOneAndDelete({user:id,title:title})
            res.status(200).json({success:true})
        }
    }
    catch(err){
        res.status(500).json({success: false, ms:"Internal server error"})
    }
})


module.exports = router;