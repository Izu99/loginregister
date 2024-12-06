const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Item = require("../models/itemModel");

// Configure multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create a new item
exports.createItem = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });

    const { name, price, description } = req.body;

    // Ensure the price is a number
    const itemPrice = parseFloat(price);
    if (isNaN(itemPrice)) {
      return res.status(400).json({ message: "Invalid price value" });
    }

    const newItem = new Item({
      name,
      price: itemPrice,
      description,
      image: req.file
        ? { filename: req.file.filename, path: req.file.path }
        : null,
    });

    console.log("Creating item with price:", itemPrice); // Debugging log

    newItem
      .save()
      .then((item) => res.json({ message: "Item created successfully", item }))
      .catch((error) =>
        res.status(500).json({ message: "Error creating item", error })
      );
  });
};

// Get all items
exports.getItems = (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((error) =>
      res.status(500).json({ message: "Error fetching items", error })
    );
};

// Get a single item
exports.getItem = (req, res) => {
  const { id } = req.params;
  Item.findById(id)
    .then((item) => {
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item);
    })
    .catch((error) =>
      res.status(500).json({ message: "Error fetching item", error })
    );
};

// Update an item
exports.updateItem = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const itemId = req.params.id;
      const item = await Item.findById(itemId);

      if (!item) {
        console.error("Item not found");
        return res.status(404).json({ message: "Item not found" });
      }

      console.log("Updating item with data:", req.body); // Debugging log

      // Check if the price is being passed and ensure it's a valid number
      let updatedPrice = item.price; // Default to the current price if not updated
      if (req.body.price) {
        updatedPrice = parseFloat(req.body.price);
        if (isNaN(updatedPrice)) {
          return res.status(400).json({ message: "Invalid price value" });
        }
      }

      // Log the updated price to ensure it's correct
      console.log("Updated price:", updatedPrice); // Debugging log

      // Check if the user is updating the image
      if (req.file) {
        console.log("New image received:", req.file);

        // If the item already has an image, delete the old one from the server
        if (item.image && item.image.path) {
          const oldImagePath = path.join(__dirname, "..", item.image.path);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Delete the old image
            console.log("Old image deleted:", oldImagePath);
          } else {
            console.log("Old image file not found, skipping deletion");
          }
        }

        // Update the item's image path with the new file
        item.image = { filename: req.file.filename, path: req.file.path };
      }

      // Update other fields if necessary
      item.name = req.body.name || item.name;
      item.price = updatedPrice; // Update price
      item.description = req.body.description || item.description;

      console.log("Saving updated item with price:", updatedPrice); // Debugging log

      // Save the updated item to the database
      const updatedItem = await item.save();
      console.log("Item updated successfully:", updatedItem);

      return res
        .status(200)
        .json({ message: "Item updated successfully", item: updatedItem });
    } catch (err) {
      console.error("Error updating item:", err);
      return res.status(500).json({ message: "Error updating item", error: err });
    }
  });
};

// Delete an item
exports.deleteItem = (req, res) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id)
    .then((item) => {
      if (!item) return res.status(404).json({ message: "Item not found" });
      // Delete image from the server if it exists
      if (item.image && item.image.path) {
        const imagePath = path.join(__dirname, "..", item.image.path);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the image
          console.log("Image deleted:", imagePath);
        }
      }
      res.json({ message: "Item deleted successfully", item });
    })
    .catch((error) =>
      res.status(500).json({ message: "Error deleting item", error })
    );
};
