const express = require("express");
const applicationsModel = require("./model");
const ApplicationController = require("./controller");
const upload = require("./config");
const authenticateJWT = require("./authentication");
const authorizeRoles = require("./authorization");
const router = express.Router();

// router.post('/applications', upload.single('resume'), ApplicationController.createApplication);
router.post(
  "/applications",
  authenticateJWT,
  authorizeRoles(["admin", "employee"]),
  upload.single("resume"),
  ApplicationController.createApplication
);

// Get All Applications
router.get(
    '/applications',
    authenticateJWT,
    authorizeRoles(['admin', 'employee']),
    ApplicationController.getAllApplications
);

router.get(
    '/:id',
    authenticateJWT,
    authorizeRoles(['admin', 'employee']),
    ApplicationController.getApplicationById
);

// Update Application
router.put(
    '/:id',
    authenticateJWT,
    authorizeRoles(['admin', 'employee']),
    upload.single('resume'),
    ApplicationController.updateApplication
);

router.delete(
    '/:id',
    authenticateJWT,
    authorizeRoles(['admin', 'employee']),
    ApplicationController.deleteApplication
);
module.exports = router;
