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
      console.log(emojis);
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
