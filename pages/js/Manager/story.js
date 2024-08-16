function createStory(formData) {
  const server = "http://127.0.0.1:5000/api/story";
  fetch(server, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      uploadButton.classList.remove("disabled");
      alert("The story has been uploaded, the page will be refreshed now");
      window.open("http://127.0.0.1:5500/pages/create.html", "_self");
      return response.json();
    })
    .catch((error) => {
      console.error("Message deletion failed:", error.message);
    });
}

async function getStories(userID) {
  const server = `http://127.0.0.1:5000/api/story`;
  const query = `?userID=${encodeURIComponent(userID)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  return result;
}
