// const emojiSearch = document.querySelector("#emojiSearch");
// const emojiSelector = document.querySelector("#emojiSelector");
// let target = null;

// getPopularEmoji();

// //Event listener to filter the list of emoji
// emojiSearch.addEventListener("input", function () {
//   console.log("Hi");
//   const keywords = emojiSearch.value.trim();
//   //Only display the list after 500ms -> user stop typing
//   setTimeout(function () {
//     if (keywords.length == 0) {
//       getPopularEmoji();
//     } else if (keywords == emojiSearch.value) {
//       getSearchedEmoji(keywords);
//     }
//   }, 500);
// });

// //Display the emoji
// function displayEmojies(data) {
//   let emojis = document.querySelectorAll(".emoji");
//   Array.from(emojis).forEach((emoji) => {
//     emoji.removeEventListener(
//       "click",
//       function () {
//         messageTextArea.innerHTML += emoji.innerHTML;
//       },
//       true
//     );
//   });

//   const template = Handlebars.templates["emoji-button"];

//   data = Object.fromEntries(data);

//   // Render the template with data
//   const htmlOutput = template({ emojiObject: data });

//   // Insert the HTML into the DOM
//   document.getElementById("emojiList").innerHTML = htmlOutput;

//   emojis = document.querySelectorAll(".emoji");
//   Array.from(emojis).forEach((emoji) => {
//     emoji.addEventListener("click", function () {
//       target.innerHTML += emoji.innerHTML;
//       const sendMessageBtn =
//         target.parentElement.parentElement.querySelector(`[role="button"]`);
//       console.log(sendMessageBtn);
//       if (typeof sendMessageBtn == "object") {
//         sendMessageBtn.classList.remove("invisible");
//       }
//     });
//   });
// }

// //Placeholder -> not make the modal look empty
// async function getPopularEmoji() {
//   fetch("https://api.emojisworld.fr/v1/popular")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((emojis) => {
//       const emojiMap = new Map();
//       Object.entries(emojis["results"]).map((emoji) => {
//         const key = emoji[1]["name"];
//         const value = emoji[1]["emoji"];
//         emojiMap.set(key, value);
//       });
//       displayEmojies(emojiMap);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// //Show list of emoji that is from the search
// async function getSearchedEmoji(query) {
//   fetch(`https://api.emojisworld.fr/v1/search?q=${query}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((emojis) => {
//       console.log(emojis);
//       const emojiMap = new Map();
//       Object.entries(emojis["results"]).map((emoji) => {
//         const key = emoji[1]["name"];
//         const value = emoji[1]["emoji"];
//         emojiMap.set(key, value);
//       });
//       displayEmojies(emojiMap);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function setTarget(element) {
//   console.log(element.parentElement.parentElement);
//   target = element.parentElement.parentElement.querySelector(".input");
// }
