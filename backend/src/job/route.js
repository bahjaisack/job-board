const express = require("express");
const JobController = require("./controller");
const authenticateJWT = require("./authorization");
const authorizeRoles = require("./authroles");
const multer = require("multer");
const router = express.Router();

// router.post("/job", async (req, res) => {
//   const jobs = jobsModel(req.body);
//   const jobResult = await jobs.save();
//   res.send(jobResult);
// });

// router.get("/alljobs", async (req, res) => {
//   const getJobs = await jobsModel.find();
//   res.send(getJobs);
// });

// router.get("/getJob/:id", async (req, res) => {
//   const getOneJob = await jobsModel.find({ _id: req.params.id });
//   res.send(getOneJob);
// });

// router.delete("/deleteJob/:id", async (req, res) => {
//   const deleteOneJob = await jobsModel.deleteOne({ _id: req.params.id });
//   res.send(deleteOneJob);
// });

// router.put("/updateJob/:id", async (req, res) => {
//   const updateJob = await jobsModel.updateOne(
//     { _id: req.params.id },
//     { $set: req.body }
//   );
//   res.send(updateJob);
// });
router.post(
  "/job",
  authenticateJWT,
  authorizeRoles(["admin", "employer"]),
  JobController.createJob
);

router.get(
  '/jobs',
  authenticateJWT,
  authorizeRoles(['admin', 'employee']),
  JobController.getAllJobs
);

router.get(
  "/job/:id",
  authenticateJWT,
  authorizeRoles(["admin", "employer"]),
  JobController.getJobById
);
router.put(
  "/job/:id",
  authenticateJWT,
  authorizeRoles(["admin", "employer"]),
  JobController.updateJob
);
router.delete(
  "/job/:id",
  authenticateJWT,
  authorizeRoles(["admin", "employer"]),
  JobController.deleteJob
);

module.exports = router;
