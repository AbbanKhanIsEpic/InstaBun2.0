const API_BASE_URL = "http://127.0.0.1:5000/api/group";

export async function createGroup(formData) {
  fetch(API_BASE_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Group creation failed:", error.message);
    });
}
