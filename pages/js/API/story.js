const API_BASE_URL = "http://127.0.0.1:5000/api/story";

export async function createStory(formData) {
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

export async function getStories(userID) {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: { userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
