import React, { useState, useEffect } from "react";
import { FaTable, FaTh } from "react-icons/fa";
import { HiDotsHorizontal, HiEye } from "react-icons/hi";
import { Menu, MenuItem, Switch } from "@mui/material";
import CustomTable from "../components/shared/CommonTable";
import Loader from "../lib/helpers/Loader";
import { AppColors } from "../lib/helpers/colors";
import ProductModal from "../components/shared/ProductModal";
import milkProduct from "../assets/images/milkProductsList.png";
import AddInventoryModal from "../components/shared/AddInventoryModal"; // Import the AddInventoryModal component
import ApiService from "../lib/helpers/api.service";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedInventoryForMenu, setSelectedInventoryForMenu] =
    useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [openProductModal, setOpenProductModal] = useState(false); // State for ProductModal
  const [openAddInventory, setOpenAddInventory] = useState(false); // State for AddInventoryModal

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const data = await ApiService.getInventory();
        const inventoryList = data.data?.data;

        // Ensure the status is active by default
        const updatedInventoryList = inventoryList.map((item) => ({
          ...item,
          status: item.status !== undefined ? item.status : true, // Set status to true if undefined
        }));

        setInventory(updatedInventoryList);
        setFilteredList(updatedInventoryList);

        // Generate categories and products lists
        const categorySet = new Set();
        const productSet = new Set();
        updatedInventoryList.forEach((item) => {
          categorySet.add(`${item.categoryName}-${item.categoryId}`);
          productSet.add(`${item.productName}-${item.productId}`);
        });
        const categoryList = Array.from(categorySet);
        const productList = Array.from(productSet);
        setCategories([...categoryList, "Others"]);
        setProducts([...productList, "Others"]);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    const filtered = inventory.filter((inventory) =>
      Object.values(inventory).some((val) =>
        val.toString().toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    setFilteredList(filtered);
  };

  const handleOpenAddInventory = () => {
    setOpenAddInventory(true);
  };

  const handleCloseAddInventory = () => {
    setOpenAddInventory(false);
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setOpenProductModal(true);
  };

  const handleToggleView = () => {
    setIsGridView(!isGridView);
  };

  const toggleMenu = (event, inventory) => {
    setMenuAnchor(event.currentTarget);
    setSelectedInventoryForMenu(inventory);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setSelectedInventoryForMenu(null);
  };
  const handleToggleStatus = (inventory) => {
    const updatedStatus = !inventory.status;
    // Update the local state with the new status
    const updatedInventory = filteredList.map((item) =>
      item.productId === inventory.productId
        ? { ...item, status: updatedStatus }
        : item
    );
    setFilteredList(updatedInventory);
  };

  const getTableHeaders = () => [
    // "Product ID",
    "Product Name",
    "Category ID",
    "Hub ID",
    "Quantity",
    "Price/unit",
    "Status",
    "Actions",
  ];

  const getTableRows = () =>
    filteredList.map((inventory) => ({
      "Product Name": inventory.productName,
      "Category ID": inventory.categoryId,
      "Hub ID": inventory.hubId,
      Quantity: inventory.quantity,
      Price: `₹${inventory.price}`,
      Status: (
        <div className="flex items-center">
          <span
            className={`mr-2 ${
              inventory.status ? "text-green-500" : "text-red-500"
            }`}
          >
            {inventory.status ? "Active" : "Inactive"}
          </span>
          <Switch
            checked={inventory.status}
            onChange={() => handleToggleStatus(inventory)}
            color="primary"
          />
        </div>
      ),
      Actions: (
        <div onClick={(event) => event.stopPropagation()}>
          <HiDotsHorizontal onClick={(event) => toggleMenu(event, inventory)} />
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor && selectedInventoryForMenu === inventory)}
            onClose={closeMenu}
          >
            <MenuItem
              onClick={() => {
                handleRowClick(inventory);
                closeMenu();
              }}
            >
              <HiEye className="mr-2" /> View
            </MenuItem>
          </Menu>
        </div>
      ),
    }));

  return loading ? (
    <Loader />
  ) : (
    <div className="inventory-list">
      <div className="flex flex-row justify-between m-5">
        <div className="flex items-center rounded-lg w-2/3">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            className="text-sm w-full h-10 px-2 bg-gray-100 rounded-lg"
            placeholder="Search inventory..."
          />
        </div>
        <div className="flex items-center">
          <button
            className="ml-4 rounded-lg px-4 py-2 cursor-pointer flex items-center h-10"
            style={{
              backgroundColor: AppColors.appBlue,
              color: AppColors.appLight,
            }}
            onClick={handleToggleView}
          >
            {isGridView ? <FaTable /> : <FaTh />}
          </button>
          <button
            className="ml-4 rounded-lg px-4 py-2 cursor-pointer h-10"
            style={{
              backgroundColor: AppColors.appBlue,
              color: AppColors.appLight,
            }}
            onClick={handleOpenAddInventory}
          >
            + Add Inventory
          </button>
        </div>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {filteredList.map((inventory) => (
            <div
              key={inventory.productId}
              className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <div onClick={() => handleRowClick(inventory)}>
                <img
                  src={milkProduct}
                  alt={inventory.productName}
                  className="h-32 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold">{inventory.productName}</h3>
                <p>Quantity: {inventory.quantity}</p>
                <p>Price/unit: ₹{inventory.price}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`text-sm ${
                    inventory.status ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {inventory.status ? "Active" : "Inactive"}
                </span>
                <Switch
                  checked={inventory.status}
                  onChange={() => handleToggleStatus(inventory)}
                  color="primary"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CustomTable
          tableHeaders={getTableHeaders()}
          tableRows={getTableRows()}
          rowsPerPageOptions={[10, 15, 25]}
        />
      )}

      {selectedProduct && (
        <ProductModal
          open={openProductModal}
          handleClose={() => setOpenProductModal(false)}
          product={selectedProduct}
        />
      )}

      <AddInventoryModal
        open={openAddInventory} // Pass state to control modal open/close
        handleClose={handleCloseAddInventory} // Pass function to close modal
        userRole={JSON.parse(sessionStorage.getItem("user")).role} // Pass necessary props to AddInventoryModal
        categories={categories}
        products={products}
      />
    </div>
  );
};

export default Inventory;
