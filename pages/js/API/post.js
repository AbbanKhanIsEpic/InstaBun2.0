const API_BASE_URL = "http://127.0.0.1:5000/api/post";

export async function createPost(formData) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, {
      formData,
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
