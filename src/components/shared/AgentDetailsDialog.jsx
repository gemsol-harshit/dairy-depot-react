import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { AppColors } from "../../lib/helpers/colors";
import profileImg from "../../assets/images/profile.png";
import Swal from "sweetalert2";
import ApiService from "../../lib/helpers/api.service";
import { useNavigate } from "react-router-dom";
import Loader from "../../lib/helpers/Loader";

const AgentDetailsModal = ({ open, onClose, agentData }) => {
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyKyc = async (status) => {
    const data = { status, agentId: agentData.agentId, remarks };
    setLoading(true);
    try {
      const response = await ApiService.verifyordersKyc(data);
      if (response?.data?.success) {
        Swal.fire("Success", `Agent verified successfully`, "success");
        navigate("/agent");
        onClose();
      } else {
        throw new Error(response?.data?.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verify KYC error:", error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <strong>Agent Details</strong>
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="ml-4">
        <AgentInfo agentData={agentData} />
        {agentData.status === "pending" && (
          <PendingActions
            remarks={remarks}
            setRemarks={setRemarks}
            handleVerifyKyc={handleVerifyKyc}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

const AgentInfo = ({ agentData }) => (
  <>
    <div className="flex items-center grid grid-cols-2 gap-2 mb-4">
      <div className="w-20 h-20 rounded-full flex items-center justify-center pb-2">
        <img
          src={profileImg}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div>
        <div className="font-bold text-lg pb-2">{agentData.name}</div>
        <div className="text-sm text-gray-500 pb-2 flex items-baseline mr-10">
          <strong>KYC Status:</strong>
          <span className="text-sm pb-2 ml-1 text-gray-700">
            <StatusBox status={agentData.status} />
          </span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {[
        { label: "Agent Id", value: agentData?.agentId },
        { label: "Mobile No", value: `+91 ${agentData?.mobile}` },
        { label: "Email Id", value: agentData?.email },
        { label: "State", value: agentData?.state },
        { label: "City", value: agentData?.city },
        { label: "Address", value: agentData?.addressLine1 },
      ].map(({ label, value }) => (
        <div key={label} className="text-sm text-gray-500 pb-2">
          <strong>{label}:</strong> {value}
        </div>
      ))}
    </div>
  </>
);

const PendingActions = ({ remarks, setRemarks, handleVerifyKyc, loading }) => (
  <>
    <div className="mt-4">
      <textarea
        placeholder="Remarks"
        className="w-full h-20 p-2 border rounded"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
    </div>
    <div className="flex justify-end mt-4">
      <Button
        onClick={() => handleVerifyKyc("verified")}
        style={{
          backgroundColor: AppColors.appGreen,
          color: AppColors.appLight,
          marginRight: 8,
        }}
        disabled={loading}
      >
        {loading ? <Loader /> : "Verify KYC"}
      </Button>
      <Button
        onClick={() => handleVerifyKyc("rejected")}
        style={{
          backgroundColor: AppColors.appRed,
          color: AppColors.appLight,
          marginRight: 8,
        }}
        disabled={loading}
      >
        {loading ? <Loader /> : "Reject KYC"}
      </Button>
    </div>
  </>
);

const StatusBox = ({ status }) => {
  const statusStyles = {
    verified: {
      backgroundColor: AppColors.appGreen,
      color: AppColors.appLight,
    },
    pending: {
      backgroundColor: AppColors.appYellow,
      color: AppColors.appLight,
    },
    rejected: { backgroundColor: AppColors.appRed, color: AppColors.appLight },
    default: { backgroundColor: AppColors.appGrey, color: AppColors.appLight },
  };

  return (
    <div
      className="rounded-lg px-2 py-1 text-center whitespace-nowrap overflow-hidden overflow-ellipsis"
      style={statusStyles[status] || statusStyles.default}
    >
      {status}
    </div>
  );
};

AgentDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  agentData: PropTypes.object.isRequired,
};

export default AgentDetailsModal;
