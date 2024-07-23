import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  InputLabel,
  FormControl,
  MenuItem as MuiMenuItem,
  Select,
} from "@mui/material";
import ApiService from "../../lib/helpers/api.service";
import Swal from "sweetalert2";
import { InputField } from "./CustomInput"; // Assuming InputField is a custom component

const AddInventoryModal = ({
  open = false,
  handleClose = () => {},
  userRole = "hubadmin",
  categories = [],
  products = [],
}) => {
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [hubId, setHubId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("product", product);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("hubId", hubId);
      formData.append("quantity", quantity);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const response = await ApiService.addInventory(formData);
      if (response.data.success) {
        Swal.fire("Success", "Inventory added successfully", "success");
        handleClose();
      } else {
        throw new Error(response.data.message || "Error adding inventory");
      }
    } catch (error) {
      console.error("Error adding inventory:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <strong>Add Inventory</strong>
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4">
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <MuiMenuItem key={idx} value={cat}>
                  {cat}
                </MuiMenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Product</InputLabel>
            <Select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              {products.map((prod, idx) => (
                <MuiMenuItem key={idx} value={prod}>
                  {prod}
                </MuiMenuItem>
              ))}
            </Select>
          </FormControl>
          {userRole === "superadmin" && (
            <>
              <InputField
                fullWidth
                margin="normal"
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Discount</InputLabel>
                <Select
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                >
                  <MuiMenuItem value={5}>5%</MuiMenuItem>
                  <MuiMenuItem value={10}>10%</MuiMenuItem>
                  <MuiMenuItem value={20}>20%</MuiMenuItem>
                </Select>
              </FormControl>
              <InputField
                fullWidth
                margin="normal"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <InputField
                fullWidth
                margin="normal"
                label="Image Upload"
                type="file"
                onChange={handleImageUpload}
              />
            </>
          )}
          <InputField
            fullWidth
            margin="normal"
            label="Hub ID"
            value={hubId}
            onChange={(e) => setHubId(e.target.value)}
          />
          <InputField
            fullWidth
            margin="normal"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "1rem" }}
        >
          Add Inventory
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventoryModal;
