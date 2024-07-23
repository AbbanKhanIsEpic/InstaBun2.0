//Declarations
const searchUsersInput = document.querySelector("#searchUsersInput");
const messageTextArea = document.querySelector("#messageTextArea");
const userList = document.getElementById("userList");

const sendMessage = document.querySelector("#sendMessage");

//Event listeners
searchUsersInput.addEventListener("input", function () {
  const keywords = searchUsersInput.value;
  //Only display the list after 500ms -> user stop typing
  setTimeout(function () {
    if (keywords.length > searchUsersInput.value) {
      userList.innerHTML = "";
    } else if (keywords == searchUsersInput.value) {
      displayUserList();
    }
  }, 500);
});

messageTextArea.addEventListener("input", function () {
  if (messageTextArea.value.length == 0) {
    sendMessage.classList.add("invisible");
  } else {
    sendMessage.classList.remove("invisible");
  }
});
//Functions

async function displayUserList() {
  // Get the template source
  const templateSource = document.getElementById(
    "search-user-template"
  ).innerHTML;

  // Compile the template
  const template = Handlebars.compile(templateSource);
  console.log(searchUsersInput.value);
  const data = await getUserList(searchUsersInput.value);

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  userList.innerHTML = htmlOutput;

  const users = document.getElementsByClassName("user");

  Array.from(users).forEach((user) => {
    const checkbox = user.querySelector("input[type=checkbox]");
    const checkmark = user.querySelector(".checkmark > svg");
    checkbox.addEventListener("change", function () {
      checkmark.classList.toggle("d-none");
    });
  });
}

async function getUserList(searchQuery) {
  const server = "http://127.0.0.1:5000/api/user/search";
  const query = `?searchQuery=${encodeURIComponent(
    searchQuery
  )}&userPerPage=${encodeURIComponent(4)}&page=${encodeURIComponent(0)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      console.log(data["users"]);
      result = data;
    });
  return result;
}
