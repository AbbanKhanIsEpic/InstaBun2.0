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

  // Insert the HTML into the DOM
  document.getElementById("emojiList").innerHTML = htmlOutput;

  emojis = document.querySelectorAll(".emoji");
  Array.from(emojis).forEach((emoji) => {
    emoji.addEventListener("click", function () {
      messageTextArea.innerHTML += emoji.innerHTML;
      if (typeof sendMessageBtn !== "undefined") {
        sendMessageBtn.classList.remove("invisible");
      }
    });
  });
}
