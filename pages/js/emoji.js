getPopularEmoji();

const emojiSearch = document.querySelector("#emojiSearch");
const emojiSelector = document.querySelector("#emojiSelector");

emojiSearch.addEventListener("input", function () {
  const keywords = emojiSearch.value.trim();
  //Only display the list after 500ms -> user stop typing
  setTimeout(function () {
    if (keywords.length == 0) {
      getPopularEmoji();
    } else if (keywords == emojiSearch.value) {
      getSearchedEmoji(keywords);
    }
  }, 500);
});

function displayEmojies(data) {
  let emojis = document.querySelectorAll(".emoji");
  Array.from(emojis).forEach((emoji) => {
    emoji.removeEventListener(
      "click",
      function () {
        messageTextArea.innerHTML += emoji.innerHTML;
      },
      true
    );
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
      sendMessage.classList.remove("invisible");
    });
  });
}

async function getPopularEmoji() {
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

async function getSearchedEmoji(query) {
  fetch(`https://api.emojisworld.fr/v1/search?q=${query}`)
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
