const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Fetch All Notes;

router.get("/fetchAllnotes", fetchuser, async (req, res, next) => {
    try{
        const notes = await Notes.find({ user: req.user.id });
         res.json(notes);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2 ADD NEW NOTE USING POST

router.post(
  "/addNote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Description must be of 5 characters").isLength({min:5}),
  ],
  async (req, res, next) => {
    try{
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ erros: errors.array() });
    }
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const notes = await note.save();
     res.json(notes);
    }
catch(err){
    console.log(err);
    res.status(500).send("Internal Server Error");
}
});
 
// ROUTE 3 UPDATE NEW NOTE USING PUT
router.put(
  "/updatenote/:id",
  fetchuser, async (req, res, next) => {
  
    const {title,description,tag}= req.body;
    // Create a new Notes object;
    const newNote = {};
    if(title){
      newNote.title=title;
    }
    if(description){
      newNote.description=description;
    }
    if(tag){
      newNote.tag=tag;
    }
  // Find the note to be update;

let note = await Notes.findById(req.params.id);
// console.log(note.user._id);
// console.log(req.user.id);
if(!note){
  return res.status(404).send({error:"Note not Found"});
}
if(note.user.toString()!=req.user.id){
  return res.status(401).send("Not Allowed");
}
note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
res.json({note});
  })

// ROUTE 4:- Delete Note route
router.delete(
  "/deletenote/:id",
  fetchuser, async (req, res, next) => {
try{
let note = await Notes.findById(req.params.id);
if(!note){
  return res.status(404).send({error:"Note not Found"});
}
if(note.user.toString()!=req.user.id){
  return res.status(401).send("Not Allowed");
}
note = await Notes.findByIdAndDelete(req.params.id);
res.json({"success":"Note has been deleted"});
}
catch(err){
  res.status(500).send({error:"Internal Server error"});
}
  })

module.exports = router;
