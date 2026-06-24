const express = require("express");
const {
  analyzeProfile,
  getAllProfiles,
  getSingleProfile,
} = require("../controllers/github.controller");

const router = express.Router();

router.post("/analyze/:username", analyzeProfile);
router.get("/profiles", getAllProfiles);
router.get("/profiles/:username", getSingleProfile);

module.exports = router;
