const API_BASE_URL = "http://127.0.0.1:5000/api/collection";

export async function getUserCollection(userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      params: { userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCollectionList(userID, storyID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/list`, {
      params: { userID, storyID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createCollection(formData) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function addStory(collectionID, storyID) {
  try {
    const response = await axios.post(`${API_BASE_URL}/story`, {
      collectionID,
      storyID,
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

export async function removeStory(collectionID, storyID) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/story/${collectionID}/${storyID}`
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
