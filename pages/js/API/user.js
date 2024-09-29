const API_BASE_URL = "http://127.0.0.1:5000/api/user";

export async function login(userIdentifier, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      userIdentifier,
      password,
    });
    return response.status;
  } catch (error) {
    return error.response.status;
  }
}

export async function getEmailAddress(username) {
  try {
    const response = await axios.get(`${API_BASE_URL}/email`, {
      params: { username },
    });
    return response.data.email;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserList(searchQuery, userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { searchQuery, userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecommendedUsers(type, userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommended`, {
      params: { type, userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createAccount(username, emailAddress, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, {
      username,
      emailAddress,
      password,
    });
    return response.status;
  } catch (error) {
    return error.response.status;
  }
}

export async function getUserID(userIdentifier) {
  try {
    const response = await axios.get(`${API_BASE_URL}/userID`, {
      params: { userIdentifier },
    });
    console.log(response);
    return response["data"]["userID"];
  } catch (error) {
    console.error(error);
  }
}

export async function getProfile(requestingUserID, targetUserID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      params: { requestingUserID, targetUserID },
    });
    console.log(response);
    return response["data"];
  } catch (error) {
    console.error(error);
  }
}

export async function block(requestingUserID, targetUserID) {
  try {
    const response = await axios.post(`${API_BASE_URL}/block`, {
      requestingUserID,
      targetUserID,
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

export async function unblock(requestingUserID, targetUserID) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/block/${requestingUserID}/${targetUserID}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
