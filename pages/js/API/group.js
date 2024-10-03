const API_BASE_URL = "http://127.0.0.1:5000/api/group";

export async function createGroup(formData) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getOwnerID(groupID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/owner`, {
      params: { groupID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMembers(groupID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/groupMembers`, {
      params: { groupID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addMember(groupID, userID) {
  try {
    const response = await axios.post(`${API_BASE_URL}/member`, {
      groupID,
      userID,
    });
    return { status: 200, response: response };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      internalMessage: "Failed to add member",
      error: error.message,
    };
  }
}

export async function removeMember(groupID, userID) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/member/${groupID}/${userID}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function changeOwner(groupID, newOwnerID) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/transferOwnership`, {
      groupID,
      newOwnerID,
    });
    console.log(response);
    return response["status"];
  } catch (error) {
    console.error("Error updating post:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}
export async function changeGroupIcon(formData) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/icon`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response["status"];
  } catch (error) {
    console.error("Error updating post:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}

export async function updateTitle(groupID, groupName) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/groupTitle`, {
      groupID,
      groupName,
    });
    console.log(response);
    return response["status"];
  } catch (error) {
    console.error("Error updating post:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}
