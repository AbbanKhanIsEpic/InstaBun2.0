function createGroup(formData) {
  const server = "http://127.0.0.1:5000/api/group";
  fetch(server, {
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
