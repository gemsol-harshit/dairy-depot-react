import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../lib/helpers/api.service";
import CustomTable from "../components/shared/CommonTable";
import Loader from "../lib/helpers/Loader";
import { AppColors } from "../lib/helpers/colors";
import { HiDotsHorizontal, HiEye, HiPencil, HiTrash } from "react-icons/hi";
import AgentDetailsModal from "../components/shared/AgentDetailsDialog";
import { Menu, MenuItem } from "@mui/material";

const TopBar = ({ searchText, handleSearchChange, handleAddAgent }) => (
  <div className="flex flex-row justify-between m-5">
    <div className="flex items-center rounded-lg w-2/3">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        className="text-sm w-full h-10 px-2 bg-gray-100 rounded-lg"
        placeholder="Search agents..."
      />
    </div>
    <button
      className="ml-4 rounded-lg px-4 py-2 cursor-pointer"
      style={{ backgroundColor: AppColors.appBlue, color: AppColors.appLight }}
      onClick={handleAddAgent}
    >
      + Add Agent
    </button>
  </div>
);

const Agent = () => {
  const [agents, setAgents] = useState([]);
  const [radioValue, setRadioValue] = useState("all");
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedAgentForMenu, setSelectedAgentForMenu] = useState(null);
  const navigate = useNavigate();
  const fetchAgents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ApiService.getAgents(radioValue);
      setAgents(data.data?.data || []);
      setFilteredList(data.data?.data || []);
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  }, [radioValue]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const handleRadioChange = (value) => setRadioValue(value);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = agents.filter((agent) =>
      Object.values(agent).some(
        (val) => val && val.toString().toLowerCase().includes(searchValue)
      )
    );

    setFilteredList(filtered);
  };

  const handleAddAgent = () => navigate("/addAgent");

  const handleRowClick = (agent) => {
    console.log("Agent clicked:", agent);
    // Implement row click logic here
  };

  const toggleMenu = (event, agent) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedAgentForMenu(agent);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setSelectedAgentForMenu(null);
  };

  const viewAgent = (agent) => {
    setSelectedAgent(agent);
    closeMenu();
  };

  const editAgent = (agent) => {
    navigate(`/addAgent?agentId=${agent.agentId}`, {
      state: { agentData: agent },
    });
    closeMenu();
  };

  const deleteAgent = async (agentId) => {
    // Implement delete agent logic here
    closeMenu();
  };

  const getTableHeaders = () => [
    "Agent ID",
    "Name",
    "Mobile No",
    "Email",
    "State",
    "Status",
    "Actions",
  ];

  const getTableRows = () =>
    filteredList.map((agent) => ({
      "Agent ID": agent.agentId,
      Name: agent.name,
      "Mobile No": agent.mobile,
      Email: agent.email,
      State: agent.state,
      Status: <StatusBox status={agent.status} />,
      Actions: (
        <div onClick={(event) => event.stopPropagation()}>
          <HiDotsHorizontal onClick={(event) => toggleMenu(event, agent)} />
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor && selectedAgentForMenu === agent)}
            onClose={closeMenu}
          >
            <MenuItem onClick={() => viewAgent(agent)}>
              <HiEye className="mr-2" /> View
            </MenuItem>
            <MenuItem onClick={() => editAgent(agent)}>
              <HiPencil className="mr-2" /> Edit
            </MenuItem>
            <MenuItem onClick={() => deleteAgent(agent.agentId)}>
              <HiTrash className="mr-2" /> Delete
            </MenuItem>
          </Menu>
        </div>
      ),
    }));

  return loading ? (
    <Loader />
  ) : (
    <div className="agent-list">
      <TopBar
        searchText={searchText}
        handleSearchChange={handleSearchChange}
        handleAddAgent={handleAddAgent}
      />
      <div className="flex space-x-5 m-5">
        {["all", "verified", "pending", "rejected"].map((value) => (
          <label key={value} className="flex items-center">
            <input
              type="radio"
              value={value}
              checked={radioValue === value}
              onChange={() => handleRadioChange(value)}
            />
            <span className="ml-1 capitalize">{value}</span>
          </label>
        ))}
      </div>
      <CustomTable
        tableHeaders={getTableHeaders()}
        tableRows={getTableRows()}
        rowsPerPageOptions={[10, 15, 25]}
        onRowClick={handleRowClick}
      />
      {selectedAgent && (
        <AgentDetailsModal
          open={Boolean(selectedAgent)}
          onClose={() => setSelectedAgent(null)}
          agentData={selectedAgent}
        />
      )}
    </div>
  );
};

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

export default Agent;
