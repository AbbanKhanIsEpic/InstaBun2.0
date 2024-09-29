const API_BASE_URL = "http://127.0.0.1:5000/api/message";

//Send messages
export async function sendGroupMessage(groupID, senderID, message) {
  try {
    const response = await axios.post(`${API_BASE_URL}/group`, {
      groupID,
      senderID,
      message,
    });
    return { status: 200, response: response };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      internalMessage: "Failed to send group message",
      error: error.message,
    };
  }
}

export async function sendDirectMessage(senderID, receiverID, message) {
  try {
    const response = await axios.post(`${API_BASE_URL}/direct`, {
      senderID,
      receiverID,
      message,
    });
    return { status: 200, response: response };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      internalMessage: "Failed to send direct message",
      error: error.message,
    };
  }
}

//Get messages
export async function getMessageLists(userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/list`, {
      params: { userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getHiddenMessageList(userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/hiddenList`, {
      params: { userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getDirectMessages(requestingUserID, targetUserID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/direct`, {
      params: { requestingUserID, targetUserID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getGroupMessages(userID, groupID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/group`, {
      params: { userID, groupID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDirectMessage(messageID) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/direct/${messageID}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteGroupMessage(messageID) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/group/${messageID}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}
