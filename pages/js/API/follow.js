const API_BASE_URL = "http://127.0.0.1:5000/api/follow";

export async function follow(requestingUserID, targetUserID) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, {
      requestingUserID,
      targetUserID,
    });
    console.log(response);
    return response.status;
  } catch (error) {
    if (error.response) {
      console.error("Follow error:", error.response.data);
      return error.response.status;
    } else {
      console.error("Unexpected error:", error.message);
      throw new Error("Failed to follow due to network error or server issue.");
    }
  }
}

export async function unfollow(requestingUserID, targetUserID) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${requestingUserID}/${targetUserID}`
    );
    return response.status;
  } catch (error) {
    if (error.response) {
      console.error("Unfollow error:", error.response.data);
      return error.response.status;
    } else {
      console.error("Unexpected error:", error.message);
      throw new Error(
        "Failed to unfollow due to network error or server issue."
      );
    }
  }
}

export async function getFollowingList(requestingUserID, targetUserID) {
  try {
    console.log("Hello");
    const response = await axios.get(`${API_BASE_URL}/followingList`, {
      params: { requestingUserID, targetUserID },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getFollowerList(requestingUserID, targetUserID) {
  try {
    console.log("Hello");
    const response = await axios.get(`${API_BASE_URL}/followerList`, {
      params: { requestingUserID, targetUserID },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
