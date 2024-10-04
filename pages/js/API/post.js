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

export async function getSearchedPost(userID, tags) {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { userID, tags },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSelectedPost(userID, postID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/select`, {
      params: { userID, postID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserPosts(userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      params: { userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePost(postID, tags, description, visibility) {
  try {
    const response = await axios.patch(`${API_BASE_URL}`, {
      postID,
      tags,
      description,
      visibility,
    });
    console.log(response);
    return response["status"];
  } catch (error) {
    console.error("Error updating post:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}

export async function sharePost(userID, postID) {
  try {
    const response = await axios.post(`${API_BASE_URL}/share`, {
      userID: userID,
      postID: postID,
    });
    console.log(response);
    return response["status"];
  } catch (error) {
    console.error(error);
  }
}
