const API_BASE_URL = "http://127.0.0.1:5000/api/email";

export async function sendAuth(email, code, location) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, {
      email,
      code,
      location,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function sendCreationCode(email, code, location) {
  try {
    const response = await axios.post(`${API_BASE_URL}/creation`, {
      email,
      code,
      location,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function sendChangePasswordCode(email, code, location) {
  try {
    const response = await axios.post(`${API_BASE_URL}/changePassword`, {
      email,
      code,
      location,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
