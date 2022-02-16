const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

router.post("/", auth, projectController.crearProject)


module.exports = router;