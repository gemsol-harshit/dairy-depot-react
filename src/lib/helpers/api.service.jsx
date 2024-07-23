import axios from "axios";
import Swal from "sweetalert2";

const ApiService = {
  async callApi({
    method,
    url,
    data = null,
    headers = { "Content-Type": "application/json" },
  }) {
    try {
      let response;

      switch (method.toLowerCase()) {
        case "get":
          response = await axios.get(url, { headers });
          break;
        case "post":
          response = await axios.post(url, data, { headers });
          break;
        case "patch":
          response = await axios.patch(url, data, { headers });
          break;
        case "delete":
          response = await axios.delete(url, { headers, data });
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      return this.handleResponse(response);
    } catch (error) {
      alert("API Error: Something went wrong");
      return null;
    }
  },

  handleResponse(response) {
    if (response.status === 200 || response.status === 201) {
      return response;
    } else if (response.status === 400) {
      Swal.fire("Error", response.data.message, "error");
      return null;
    } else {
      Swal.fire(
        "Error",
        response.data.message
          ? response.data.message
          : "API Error: Something went wrong",
        "error"
      );
      return null;
    }
  },

  // Example API call functions
  async getAgents(status) {
    return await this.callApi({
      method: "get",
      url: `https://fvl4o1xcb5.execute-api.ap-south-1.amazonaws.com/dev/get-agents?status=${status}`,
    });
  },

  async addAgent(agentData) {
    const data = {
      name: `${agentData.firstName} ${agentData.middleName} ${agentData.lastName}`,
      mobile: agentData.mobile,
      email: agentData.email,
      gender: agentData.gender,
      location: "",
      addressLine1: agentData.address,
      pincode: agentData.pincode,
      city: agentData.city,
      state: agentData.state,
      country: agentData.country,
      documentType: agentData.documentType,
      documentNumber: agentData.documentId,
      documentImage: "",
    };
    console.log(" data", data);
    return await this.callApi({
      method: "post",
      url: "https://fvl4o1xcb5.execute-api.ap-south-1.amazonaws.com/dev/add-agent",
      data,
    });
  },
  async updateAgent(agentId, agentData) {
    // return await this.callApi({
    //   method: "post",
    //   url: "https://fvl4o1xcb5.execute-api.ap-south-1.amazonaws.com/dev/delete-agent",
    //   agentId,
    // });
    console.log("Edit", agentId, "AgentDATA", agentData);
  },

  async deleteAgent(agentId) {
    return await this.callApi({
      method: "post",
      url: "https://fvl4o1xcb5.execute-api.ap-south-1.amazonaws.com/dev/delete-agent",
      agentId,
    });
  },

  async verifyKyc(agentData) {
    const data = {
      agentId: agentData.agentId,
      status: agentData.status,
      remarks: agentData.remarks,
    };

    return await this.callApi({
      method: "patch",
      url: "https://fvl4o1xcb5.execute-api.ap-south-1.amazonaws.com/dev/verify-kyc",
      data,
      headers: { "Content-Type": "application/json" },
    });
  },

  async login(userId, password) {
    let data = {
      hubId: userId,
      password: password,
    };
    return await this.callApi({
      method: "post",
      url: "https://b9a65oestl.execute-api.ap-south-1.amazonaws.com/dev/login-admin",
      data,
    });
  },

  async getHubList() {
    return await this.callApi({
      method: "get",
      url: "https://nsqp5v7w3j.execute-api.ap-south-1.amazonaws.com/dev/get-hub",
    });
  },

  async getInventory() {
    return await this.callApi({
      method: "get",
      url: "https://nsqp5v7w3j.execute-api.ap-south-1.amazonaws.com/dev/get-inventory",
    });
  },

  async addInventoey(data) {
    return await this.callApi({
      method: "post",
      url: "https://nsqp5v7w3j.execute-api.ap-south-1.amazonaws.com/dev/insert-inventory",
      data,
    });
  },

  async addAdmin(data) {
    return await ApiService.callApi({
      method: "post",
      url: "https://b9a65oestl.execute-api.ap-south-1.amazonaws.com/dev/register-admin",
      data,
    });
  },
  async fetchUser() {
    return await this.callApi({
      method: "get",
      url: "https://b9a65oestl.execute-api.ap-south-1.amazonaws.com/dev/get-all-users",
    });
  },

  async topupWallet(customerId, amount, txType) {
    let data = {
      customerId: customerId,
      amount: amount,
      txType: txType,
    };
    return await this.callApi({
      method: "post",
      url: "https://fvl4o1xcb5.execute-api.ap-south-1.amazonaws.com/dev/topup-wallet",
      data,
    });
  },

  async fetchOrder(hubId) {
    let url;
    if (hubId === "" || hubId === "HUB_1fd5") {
      url =
        "https://hu0z103ij0.execute-api.ap-south-1.amazonaws.com/dev/get-orders-data?hubId=";
    } else {
      url = `https://hu0z103ij0.execute-api.ap-south-1.amazonaws.com/dev/get-orders-data?hubId=${hubId}`;
    }
    return await this.callApi({
      method: "get",
      url: url,
    });
  },

  // async updateProduct(productId, data) {
  //   return await this.callApi({
  //     method: "patch",
  //     url: `/api/products/${productId}`,
  //     data,
  //   });
  // },

  // async deleteProduct(productId) {
  //   return await this.callApi({
  //     method: "delete",
  //     url: `/api/products/${productId}`,
  //   });
  // },
};

export default ApiService;
