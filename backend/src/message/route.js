const express = require("express");
const messagesModel = require("./model");

const router = express.Router();

router.post("/message", async (req, res) => {
  const message = messagesModel(req.body);
  const messageResult = await message.save();
  res.send(messageResult);
});

router.get("/allMessages", async (req, res) => {
  const getmessages = await messagesModel.find();
  res.send(getmessages);
});

router.get("/getmessage/:id", async (req, res) => {
  const getOneMessage = await messagesModel.find({ _id: req.params.id });
  res.send(getOneMessage);
});

router.delete("/deleteMessage/:id", async (req, res) => {
  const deleteMessage = await messagesModel.deleteOne({ _id: req.params.id });
  res.send(deleteMessage);
});

router.put("/updateMessage/:id", async (req, res) => {
  const updateMessage = await messagesModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(updateMessage);
});

module.exports = router;
