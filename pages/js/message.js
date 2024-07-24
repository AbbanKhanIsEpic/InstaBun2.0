//Declarations
const searchUsersInput = document.querySelector("#searchUsersInput");
const messageTextArea = document.querySelector("#messageTextArea");
const userList = document.getElementById("userList");
const showcaseSelectedUsers = document.getElementById("showcaseSelectedUsers");

const sendMessage = document.querySelector("#sendMessage");

const selectedArray = [];

//Event listeners
searchUsersInput.addEventListener("input", function () {
  const keywords = searchUsersInput.value;
  //Only display the list after 500ms -> user stop typing
  setTimeout(function () {
    if (keywords !== searchUsersInput.value) {
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
    const id = user.id;
    const displayName = user
      .querySelector('[aria-label="display name"]')
      .textContent.trim();
    console.log(displayName);
    const checkbox = user.querySelector("input[type=checkbox]");
    const checkmark = user.querySelector(".checkmark > svg");
    checkbox.addEventListener("change", function () {
      const isSelected = user.classList.contains("selected");
      if (isSelected) {
        user.classList.remove("selected");
        const index = selectedArray.findIndex(function (selected) {
          return selected.id == id;
        });
        selectedArray.splice(index, 1);
      } else {
        user.classList.add("selected");
        selectedArray.push({ id: id, DisplayName: displayName });
        console.log(selectedArray);
      }
      console.log(selectedArray);
      displaySelectedUsers(selectedArray);
      checkmark.classList.toggle("d-none");
    });
  });
}

function displaySelectedUsers(selectedArray) {
  // Get the template source
  const templateSource = document.getElementById(
    "selected-user-template"
  ).innerHTML;

  // Compile the template
  const template = Handlebars.compile(templateSource);
  const data = { users: selectedArray };

  console.log(data);

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  showcaseSelectedUsers.innerHTML = htmlOutput;

  const selectedUsers =
    showcaseSelectedUsers.getElementsByClassName("selectedUser");

  Array.from(selectedUsers).forEach((selectedUser) => {
    const closeButton = selectedUser.querySelector(".btn-close");
    const id = selectedUser.id;
    console.log(id);
    closeButton.addEventListener("click", function () {
      const index = selectedArray.findIndex(function (selected) {
        return selected.id == id;
      });
      selectedArray.splice(index, 1);
      console.log(selectedArray);
      displaySelectedUsers(selectedArray);
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
      result = data;
    });
  return result;
}
