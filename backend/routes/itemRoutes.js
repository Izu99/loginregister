const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// CRUD routes for items
router.post("/", itemController.createItem); // Create
router.get("/", itemController.getItems); // Read all
router.get("/:id", itemController.getItem); // Read one
router.put("/:id", itemController.updateItem); // Update one
router.delete("/:id", itemController.deleteItem); // Delete

module.exports = router;
