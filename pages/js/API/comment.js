const API_BASE_URL = "http://127.0.0.1:5000/api/comment";

export async function like(userID, commentID) {
  try {
    const response = await axios.post(`${API_BASE_URL}/like`, {
      userID,
      commentID,
    });
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

export async function unlike(userID, commentID) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/like/${userID}/${commentID}`
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

export async function dislike(userID, commentID) {
  try {
    const response = await axios.post(`${API_BASE_URL}/dislike`, {
      userID,
      commentID,
    });
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

export async function unDislike(userID, commentID) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/dislike/${userID}/${commentID}`
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

export async function comment(postID, userID, comment) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, {
      postID,
      userID,
      comment,
    });
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

export async function getComments(postID, userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: { postID, userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
