import React, { useState, useEffect } from "react";
import ApiService from "../lib/helpers/api.service";
import CustomTable from "../components/shared/CommonTable";
import Loader from "../lib/helpers/Loader";
import { HiDotsHorizontal } from "react-icons/hi";
import { Menu, MenuItem } from "@mui/material";
import TopupModal from "../components/shared/TopupWallet";
import UserModal from "../components/shared/UserDetailsDialog";

const TopBar = ({ searchText, handleSearchChange }) => (
  <div className="flex flex-row justify-between m-5">
    <div className="flex items-center rounded-lg w-2/3">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        className="text-sm w-full h-10 px-2 bg-gray-100 rounded-lg"
        placeholder="Search user..."
      />
    </div>
  </div>
);

const User = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedUserForMenu, setSelectedUserForMenu] = useState(null);
  const [selectedUserForTopup, setSelectedUserForTopup] = useState(null);
  const [topupModalOpen, setTopupModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUserForDetails, setSelectedUserForDetails] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await ApiService.fetchUser();
        setUser(data.data?.data);
        setFilteredList(data.data?.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    const filtered = user.filter((user) =>
      Object.values(user).some((val) =>
        val.toString().toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    setFilteredList(filtered);
  };

  const toggleMenu = (event, user) => {
    setMenuAnchor(event.currentTarget);
    setSelectedUserForMenu(user);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setSelectedUserForMenu(null);
  };

  const handleTopupOpen = (user) => {
    setSelectedUserForTopup(user);
    setTopupModalOpen(true);
    closeMenu();
  };

  const handleTopupClose = () => {
    setSelectedUserForTopup(null);
    setTopupModalOpen(false);
  };

  const handleUserOpen = (user) => {
    setSelectedUserForDetails(user);
    setUserModalOpen(true);
    closeMenu();
  };

  const handleUserClose = () => {
    setSelectedUserForDetails(null);
    setUserModalOpen(false);
  };

  const getTableHeaders = () => [
    "Customer Name",
    "Customer ID",
    "Customer Info",
    "Mobile No",
    "Created At",
    "Actions",
  ];

  const getTableRows = () =>
    filteredList.map((user) => {
      let addressInfo = "No customer information";
      if (user?.address && user.address.length > 0) {
        const firstAddress = user.address[0];
        addressInfo = `${firstAddress.addressLine1}, ${firstAddress.addressLine2}, ${firstAddress.city}, ${firstAddress.state}, ${firstAddress.pincode}`;
        if (user.address.length > 1) {
          addressInfo += " ...";
        }
      }

      return {
        "Customer Name": user?.address[0]?.recipientName || "-",
        "Customer ID": user.customerId,
        "Customer Info": addressInfo,
        "Mobile No": user.number,
        "Created At": new Date(user.createdAt).toLocaleDateString(),
        Actions: (
          <div onClick={(event) => event.stopPropagation()}>
            <HiDotsHorizontal onClick={(event) => toggleMenu(event, user)} />
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor && selectedUserForMenu === user)}
              onClose={closeMenu}
            >
              <MenuItem onClick={() => handleUserOpen(user)}>View</MenuItem>
              <MenuItem onClick={() => handleTopupOpen(user)}>Topup</MenuItem>
            </Menu>
          </div>
        ),
      };
    });

  return loading ? (
    <Loader />
  ) : (
    <div className="user-list">
      <TopBar searchText={searchText} handleSearchChange={handleSearchChange} />
      <CustomTable
        tableHeaders={getTableHeaders()}
        tableRows={getTableRows()}
        rowsPerPageOptions={[10, 15, 25]}
      />
      {selectedUserForTopup && (
        <TopupModal
          open={topupModalOpen}
          handleClose={handleTopupClose}
          user={selectedUserForTopup}
        />
      )}
      {selectedUserForDetails && (
        <UserModal
          open={userModalOpen}
          handleClose={handleUserClose}
          user={selectedUserForDetails}
        />
      )}
    </div>
  );
};

export default User;
