//Declarations
const searchUsersInput = document.querySelector("#searchUsersInput");
const userList = document.getElementById("userList");
const showcaseSelectedUsers = document.getElementById("showcaseSelectedUsers");

const startConversationButton = document.querySelector(
  "#startConversationButton"
);

const createGroupModal = document.querySelector("#createGroup");
const selectedArray = [];

document.addEventListener("DOMContentLoaded", displayMessageLists(userID));

//Event listeners
searchUsersInput.addEventListener("input", function () {
  const keywords = searchUsersInput.value.trim();
  //Only display the list after 500ms -> user stop typing
  setTimeout(function () {
    if (keywords !== searchUsersInput.value || keywords.length == 0) {
      userList.innerHTML = "";
    } else if (keywords == searchUsersInput.value) {
      displayUserList();
    }
  }, 500);
});

startConversationButton.addEventListener("click", function () {
  const numSelected = selectedArray.length;
  const hasSelectedSelf =
    selectedArray.findIndex(function (selected) {
      return selected.id == userID;
    }) != -1;
  if (numSelected == 0) {
    alert("You need to select someone to message to");
  } else if (numSelected == 1) {
  } else if (hasSelectedSelf) {
    alert("You can not select yourself as another member in a group");
  } else {
    const selectedUserID = [];
    selectedArray.forEach((selectedUser) => {
      console.log(selectedUser);
      selectedUserID.push(selectedUser["id"]);
    });
    selectedUserID.push(userID);
    createGroupModal.style.display = "block";
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
    const id = user.id.split("-")[1];
    const displayName = user
      .querySelector('[aria-label="display name"]')
      .textContent.trim();
    const checkbox = user.querySelector("input[type=checkbox]");
    const checkmark = user.querySelector(".checkmark > svg");

    const isAlreadySelected =
      selectedArray.findIndex(function (selected) {
        return selected.id == id;
      }) != -1;

    if (isAlreadySelected) {
      user.classList.add("selected");
      checkmark.classList.toggle("d-none");
      checkbox.value = "on";
    }

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
      }
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
    const id = selectedUser.id.split("-")[1];

    closeButton.addEventListener("click", function () {
      const index = selectedArray.findIndex(function (selected) {
        return selected.id == id;
      });
      selectedArray.splice(index, 1);

      const deSelectedUser = document.querySelector(`#user-${id}`);
      if (deSelectedUser !== null) {
        const checkbox = deSelectedUser.querySelector("input[type=checkbox]");
        const checkmark = deSelectedUser.querySelector(".checkmark > svg");
        deSelectedUser.classList.remove("selected");
        checkmark.classList.toggle("d-none");
        checkbox.value = "off";
      }

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

function createGroup(userID, groupName, groupProfileIcon, groupMembers) {
  const server = "http://127.0.0.1:5000/api/group/create";
  const data = { userID, groupName, groupProfileIcon, groupMembers };

  fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
    });
}

async function displayMessageLists(userID) {
  // Get the template source
  const templateSource = document.getElementById(
    "message-selection-template"
  ).innerHTML;

  // Compile the template
  const template = Handlebars.compile(templateSource);

  const data = { messageList: await getMessageLists(userID) };

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  document.getElementById("messageColumn").innerHTML += htmlOutput;

  const messageSelections = document.querySelectorAll(".message");

  let selectedMessage;

  Array.from(messageSelections).forEach((messageSelection) => {
    messageSelection.addEventListener("click", function () {
      const id = messageSelection.id;
      const isDirect = messageSelection.classList.contains("direct");
      const icon = messageSelection.querySelector("img").src;
      const name = messageSelection.querySelector(
        '[aria-label="name"]'
      ).innerHTML;
      if (selectedMessage != undefined) {
        selectedMessage.classList.remove("selected");
      }
      setMessageContainer(userID, isDirect, id, name, icon);
      messageSelection.classList.add("selected");
      selectedMessage = messageSelection;
    });
  });
}

async function setMessageContainer(
  userID,
  isDirect,
  toID,
  toName,
  toProfileIcon
) {
  // Get the template source
  const templateSource = document.getElementById(
    "conversation-container-template"
  ).innerHTML;

  // Compile the template
  const template = Handlebars.compile(templateSource);

  const data = { name: toName, profileIcon: toProfileIcon };

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  document.getElementById("conversationContainer").innerHTML = htmlOutput;

  const messageTextArea = document.querySelector("#messageTextArea");

  const sendMessageBtn = document.querySelector("#sendMessageBtn");

  if (isDirect) {
    Handlebars.registerHelper("isSendMessage", function (senderID) {
      return senderID == userID;
    });

    const directMessageData = await getDirectMessage(userID, toID);
    // Get the template source
    const messageTemplateSource =
      document.getElementById("message-template").innerHTML;

    // Compile the template
    const messageTemplate = Handlebars.compile(messageTemplateSource);

    const data = { messages: directMessageData };

    // Render the template with data
    const messageHtmlOutput = messageTemplate(data);

    // Insert the HTML into the DOM
    document.getElementById("messageOutput").innerHTML = messageHtmlOutput;
  } else {
  }

  messageTextArea.addEventListener("input", function () {
    if (messageTextArea.childNodes.length == 0) {
      sendMessageBtn.classList.add("invisible");
    } else {
      sendMessageBtn.classList.remove("invisible");
    }
  });
}

async function getMessageLists(userID) {
  const server = "http://127.0.0.1:5000/api/message/list";
  const query = `?userID=${encodeURIComponent(userID)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  return result;
}

async function getDirectMessage(currentUserID, selectedUserID) {
  const server = "http://127.0.0.1:5000/api/message/direct";
  const query = `?senderID=${encodeURIComponent(
    currentUserID
  )}&receiverID=${encodeURIComponent(selectedUserID)}&page=${encodeURIComponent(
    1
  )}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(currentUserID);
      console.log(selectedUserID);
      result = data;
    });
  return result;
}
