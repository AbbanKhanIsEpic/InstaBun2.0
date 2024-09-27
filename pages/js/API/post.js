const API_BASE_URL = "http://127.0.0.1:5000/api/post";

export async function createPost(formData) {
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

export async function getFollowingPost(userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/followings`, {
      params: { userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function likePost(postID, userID) {
  try {
    const response = await axios.post(`${API_BASE_URL}/like`, {
      postID,
      userID,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function unlikePost(postID, userID) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/like/${postID}/${userID}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getLikeList(postID, userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/like`, {
      params: { postID, userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecommend(userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommend`, {
      params: { userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
