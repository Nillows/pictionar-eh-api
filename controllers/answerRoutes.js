const express = require("express");
const router = express.Router();
const { Answer } = require("../models"); //Imports answer model

// GET all answers
router.get(`/`,(req,res) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token)
    console.log('==============================')
    try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            Answer.findAll().then(dbAnswers => {
                res.json(dbAnswers);
            }).catch(err => {
                res.status(500).json({msg:`Server Error!`, err});
            })
        }catch(err){
            console.log(err);
        return  res.status(403).json({msg:"invalid token!"})
        }
})

// GET random answer
router.get('/random', (req, res) => {
    Answer.findAll().then(dbAnswers => {
        res.json(dbAnswers[Math.floor(Math.random() * dbAnswers.length)])
    }).catch(err => {
        res.status(500).json({msg:`Server Error!`, err});
    })
})

// GET one answer by id
router.get(`/:id`,(req,res) => {
    Answer.findByPk(req.params.id,{
        // include:[User]
    }).then(dbAnswer => {
       if(!dbAnswer) {
        return res.status(404).json(`No answer exists!`)
       }
       res.json(dbAnswer)
    }).catch(err => {
        res.status(500).json({msg:`Server Error!`, err});
        console.log(err);
    })
})

// CREATE new answer
router.post(`/`,(req,res) => {
    console.log(req.body)
    Answer.create({
        word: req.body.word
    }).then(dbAnswer => {
        res.json(dbAnswer)
    }).catch(err => {
        res.status(500).json({msg:`Server error!`,err});
    })
});

// DELETE answer
router.delete(`/:id`, (req,res) => {
    Answer.destroy({
        where: {
            id:req.params.id
        }
    }).then(dbAnswer => {
        res.json(dbAnswer)
    }).catch(err => {
        res.status(500).json({msg:`Server error!`,err})
    })
});

// UPDATE answer
router.put('/:id', (req, res)  => {
    const updatedData = {
        word: req.body.word
    }
    Answer.update(updatedData, {
        where: {id: req.params.id}
    }).then(updatedAnswer => {
        if(!updatedAnswer) {
            res.json({msg:"No such answer to update."})
        } else {
            res.json({msg:"Answer succesfully updated!"})
        }
    }).catch(err => {
        res.status(500).json({msg:`Server Error!`, err});
    })
})

module.exports = router;