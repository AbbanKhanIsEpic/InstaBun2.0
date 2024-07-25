getEmoji();

function displayEmojies(data) {
  let emojis = document.querySelectorAll(".emoji");
  Array.from(emojis).forEach((emoji) => {
    emoji.removeEventListener("click", function () {
      messageTextArea.innerHTML += emoji.innerHTML;
    });
  });
  // Get the template source
  const templateSource = document.getElementById(
    "emoji-button-template"
  ).innerHTML;

  // Compile the template
  const template = Handlebars.compile(templateSource);

  data = Object.fromEntries(data);

  // Render the template with data
  const htmlOutput = template({ emojiObject: data });

  console.log(data);

  // Insert the HTML into the DOM
  document.getElementById("emojiList").innerHTML = htmlOutput;

  emojis = document.querySelectorAll(".emoji");
  Array.from(emojis).forEach((emoji) => {
    emoji.addEventListener("click", function () {
      messageTextArea.innerHTML += emoji.innerHTML;
    });
  });
}

async function getEmoji() {
  fetch("https://api.emojisworld.fr/v1/popular")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((emojis) => {
      const emojiMap = new Map();
      Object.entries(emojis["results"]).map((emoji) => {
        const key = emoji[1]["name"];
        const value = emoji[1]["emoji"];
        emojiMap.set(key, value);
      });
      displayEmojies(emojiMap);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
