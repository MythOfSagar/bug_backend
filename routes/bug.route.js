require("dotenv").config();
const { Router } = require("express");
const { BugModel } = require("../models/bug.model");

const bugRouter = Router();

bugRouter.get("/", async (req, res) => {
  try {

    const allBugs = await BugModel.find();
    res.send(allBugs);
  } catch (err) {
    res.send("Error Occured Please try Again");
  }
});



bugRouter.post("/create", async (req, res) => {
  const bugDetails = req.body;

  try {
    const newBug = new BugModel({ ...bugDetails });
    await newBug.save();
    res.send("Bug Creation Successfull");
  } catch (err) {
    res.send("Error Occured Please try Again");
  }
});

bugRouter.delete("/delete/:bugId", async (req, res) => {

    const {bugId}=req.params;
    try {
      
      await BugModel.findByIdAndDelete(bugId);
      res.send('Bug Deletion Successfull');
    } catch (err) {
      res.send("Error Occured Please try Again");
    }
  });

module.exports = { bugRouter };
