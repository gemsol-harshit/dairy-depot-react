import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  IconButton,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import ApiService from "../../lib/helpers/api.service";
import { AppColors } from "../../lib/helpers/colors";
import Swal from "sweetalert2";

const TopupModal = ({ open, handleClose, user }) => {
  const [transactionType, setTransactionType] = useState("topup");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (event) => {
    const validInput = event.target.value.replace(/[^0-9]/g, "");
    setAmount(validInput);
  };

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
  };

  const handleSubmit = async () => {
    const parsedAmount = parseInt(amount, 10);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      try {
        setLoading(true);
        const resp = await ApiService.topupWallet(
          user.customerId,
          parsedAmount,
          transactionType
        );
        if (resp && resp.data.success) {
          Swal.fire("Success", resp.data.message, "success");
        }
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show error message)
      } finally {
        setLoading(false);
        handleClose(); // Close modal on success or failure
      }
    } else {
      console.error("Invalid amount entered");
      // Handle invalid input (e.g., show error message)
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white border border-gray-300 shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold mb-10">User Actions</h2>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div>
          <h2 className="text-l mb-10">Top Up Wallet for: {user.customerId}</h2>
          <div className="flex space-x-5">
            <div className="w-2/3">
              <TextField
                fullWidth
                margin="normal"
                label="Enter Amount"
                value={amount}
                onChange={handleAmountChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="w-1/3">
              <FormControl fullWidth margin="normal">
                <InputLabel id="transaction-type-label">
                  Transaction Type
                </InputLabel>
                <Select
                  labelId="transaction-type-label"
                  value={transactionType}
                  onChange={handleTransactionTypeChange}
                  label="Transaction Type"
                >
                  <MenuItem value="topup">Top Up</MenuItem>
                  {/* Add more options if needed */}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-flow-col justify-stretch space-x-10">
          {[500, 1000, 2000, 3000].map((amt) => (
            <button
              className="px-4 py-2 text-black rounded"
              style={{ backgroundColor: AppColors.appGrey }}
              key={amt}
              onClick={() => setAmount(amt.toString())}
            >
              ₹{amt}
            </button>
          ))}
        </div>
        <button
          className="mt-20 mb-2 px-4 py-2 bg-blue-500 text-white rounded"
          style={{ backgroundColor: AppColors.appBlue }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </button>
      </Box>
    </Modal>
  );
};

export default TopupModal;
