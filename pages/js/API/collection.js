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
