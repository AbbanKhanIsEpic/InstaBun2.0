const emojiMap = new Map();

getEmoji();

function displayEmojies() {
  // Get the template source
  const templateSource = document.getElementById(
    "emoji-button-template"
  ).innerHTML;

  // Compile the template
  const template = Handlebars.compile(templateSource);

  const data = Object.fromEntries(emojiMap);

  // Render the template with data
  const htmlOutput = template({ emojiObject: data });

  console.log(data);

  // Insert the HTML into the DOM
  document.getElementById("emojiList").innerHTML = htmlOutput;
}

async function getEmoji() {
  fetch("https://emoji.gg/api/")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((emojis) => {
      Object.entries(emojis).map((emoji) => {
        const key = emoji[1]["title"];
        const value = emoji[1]["image"];
        emojiMap.set(key, value);
      });
      console.log(emojiMap);
      displayEmojies();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
