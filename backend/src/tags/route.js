const express = require("express");
const tagsModel = require("./model");

const router = express.Router();

router.post("/tag", async (req, res) => {
  const tag = tagsModel(req.body);
  const tagResult = await tag.save();
  res.send(tagResult);
});

router.get("/allTags", async (req, res) => {
  const getTags = await tagsModel.find();
  res.send(getTags);
});

router.get("/getTag/:id", async (req, res) => {
  const getOneTag = await tagsModel.find({ _id: req.params.id });
  res.send(getOneTag);
});

router.delete("/deleteTag/:id", async (req, res) => {
  const deleteTag = await tagsModel.deleteOne({ _id: req.params.id });
  res.send(deleteTag);
});

router.put("/updateTag/:id", async (req, res) => {
  const updateTag = await tagsModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateTag);
});

module.exports = router;
