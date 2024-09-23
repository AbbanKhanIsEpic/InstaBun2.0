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

// async function getFollowingPost(userID) {
//   const server = "http://127.0.0.1:5000/api/message/group";
//   const query = `?userID=${encodeURIComponent(
//     userID
//   )}&groupID=${encodeURIComponent(groupID)}`;

//   let result;
//   await fetch(server + query)
//     .then((response) => response.json())
//     .then((data) => {
//       result = data;
//     });
// }
