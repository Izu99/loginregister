import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Itemspage.css"; // For custom styling

const ItemManager = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [image, setImage] = useState(null); // For file input
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setItems(response.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateItem = async () => {
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("price", newItem.price);
    formData.append("description", newItem.description);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/items", formData);
      fetchItems();
      resetForm();
    } catch (err) {
      console.error("Error creating item:", err);
    }
  };

  const handleUpdateItem = async () => {
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("price", newItem.price.toString()); // Ensure price is a string
    formData.append("description", newItem.description);
    if (image) formData.append("image", image);

    // Log the FormData contents for debugging
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/items/${editingItem._id}`,
        formData
      );
      console.log("Update response:", response); // Log the response from the server
      fetchItems();
      setEditingItem(null);
      resetForm();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image, // Preserve the existing image when editing
    });
  };

  const resetForm = () => {
    setNewItem({
      name: "",
      price: "",
      description: "",
      image: null,
    });
    setImage(null);
  };

  return (
    <div className="item-manager">
      <h1>Item Manager</h1>

      {/* Form for creating or updating an item */}
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newItem.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newItem.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newItem.description}
          onChange={handleInputChange}
        />
        <input type="file" onChange={handleImageChange} />
        <button onClick={editingItem ? handleUpdateItem : handleCreateItem}>
          {editingItem ? "Update Item" : "Add Item"}
        </button>
        {editingItem && (
          <button className="cancel-edit" onClick={() => setEditingItem(null)}>
            Cancel Edit
          </button>
        )}
      </div>

      {/* Display items as cards */}
      <div className="card-container">
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <div className="item-image">
              {item.image ? (
                <img
                  src={`http://localhost:5000/${item.image.path}`}
                  alt={item.name}
                />
              ) : (
                <div className="placeholder">No Image</div>
              )}
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p className="price">${item.price.toFixed(2)}</p>
              <button
                className="edit-button"
                onClick={() => handleEditItem(item)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemManager;
