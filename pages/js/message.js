//Declarations
const searchUsersInput = document.querySelector("#searchUsersInput");
const userList = document.getElementById("userList");
const showcaseSelectedUsers = document.getElementById("showcaseSelectedUsers");

const newMessageModal = document.querySelector("#newMessageModal");

const startConversationButton = document.querySelector(
  "#startConversationButton"
);

const createGroupModal = document.querySelector("#createGroup");
const groupIconInput = document.querySelector("#groupIconInput");
const createGroupModalClose =
  createGroupModal.querySelector(`[aria-label="Close"]`);

const deleteMessageConfirmation = document.querySelector(
  "#deleteMessageConfirmation"
);
const cancelDeleteMessage = document.querySelector("#cancelDeleteMessage");
const confirmDeleteMessage = document.querySelector("#confirmDeleteMessage");
const showCaseMemberNewGroup = document.querySelector(
  "#showCaseMemberNewGroup"
);
const createGroupBtn = document.querySelector("#createGroupBtn");

let isGroup;
let deleteMessageID;
let communicatingToID;

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

createGroupModalClose.addEventListener("click", function () {
  //createGroupModal.style.display = "none"; -> no work D:
  window.open("http://127.0.0.1:5500/pages/message.html", "_self");
});

createGroupBtn.addEventListener("click", function () {
  window.open("http://127.0.0.1:5500/pages/message.html", "_self");
});

groupIconInput.addEventListener("change", function (event) {
  selectedFile = event.target.files[0];
  if (selectedFile.type.match("image.*")) {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const showUpload = document.querySelector("#showUpload");
      showUpload.src = event.target.result;
      console.log(event.target.result);
      const sizeInMB = selectedFile.size / 1024 / 1024;
      if (sizeInMB > 15) {
        alert("Image size is too large. 5MB max");
      }
    });
    reader.readAsDataURL(selectedFile);
  } else {
    alert("You can only upload an img for the group icon");
  }
});

cancelDeleteMessage.addEventListener("click", function () {
  deleteMessageConfirmation.style.display = "none";
});

confirmDeleteMessage.addEventListener("click", async function () {
  if (isGroup) {
  } else {
    await deleteDirectMessage(deleteMessageID);
    displayDirectMessage(userID, communicatingToID);
  }
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
      selectedUserID.push(selectedUser["id"]);
    });
    selectedUserID.push(userID);
    newMessageModal.style.display = "none";
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
        const copy = user.childNodes[1].cloneNode(true);
        for (i = 0; i < showCaseMemberNewGroup.childNodes.length; i++) {
          const childNode = showCaseMemberNewGroup.childNodes[i];
          if (childNode.isEqualNode(copy)) {
            showCaseMemberNewGroup.removeChild(childNode);
            break;
          }
        }
      } else {
        user.classList.add("selected");
        const copy = user.childNodes[1].cloneNode(true);
        showCaseMemberNewGroup.appendChild(copy);
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
        const copy = deSelectedUser.childNodes[1].cloneNode(true);
        for (i = 0; i < showCaseMemberNewGroup.childNodes.length; i++) {
          const childNode = showCaseMemberNewGroup.childNodes[i];
          if (childNode.isEqualNode(copy)) {
            showCaseMemberNewGroup.removeChild(childNode);
            break;
          }
        }
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
  isGroup = !isDirect;
  communicatingToID = toID;
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
    displayDirectMessage(userID, toID);
  } else {
    displayGroupMessage(userID, toID);
  }

  messageTextArea.addEventListener("input", function () {
    if (messageTextArea.childNodes.length == 0) {
      sendMessageBtn.classList.add("invisible");
    } else {
      sendMessageBtn.classList.remove("invisible");
    }
  });
}

async function displayGroupMessage(userID, toID) {
  Handlebars.registerHelper("isSendMessage", function (senderID) {
    return senderID == userID;
  });

  Handlebars.registerHelper("isNewDay", function (index) {
    if (index == 0) {
      return true;
    } else {
      let currentMessageTime = new Date(
        groupMessageData[index].time
      ).toDateString();
      let previousMessageTime = new Date(
        groupMessageData[index - 1].time
      ).toDateString();
      if (currentMessageTime === previousMessageTime) {
        return false;
      } else {
        return true;
      }
    }
  });

  Handlebars.registerHelper("convertToDate", function (timestamp) {
    return new Date(timestamp).toDateString();
  });

  Handlebars.registerHelper("convertTo12HourTime", function (timestamp) {
    let time = timestamp.substring(11, 16);
    switch (time.charAt(0)) {
      case "1":
        time = Number(time.substring(0, 2)) - 12 + time.substring(2, 5) + "pm";
        break;
      case "0":
        time += "am";
        break;
    }

    return time;
  });

  const groupMessageData = await getGroupMessages(userID, toID);

  // Get the template source
  const messageTemplateSource =
    document.getElementById("message-template").innerHTML;

  // Compile the template
  const messageTemplate = Handlebars.compile(messageTemplateSource);

  const data = { messages: groupMessageData };

  // Render the template with data
  const messageHtmlOutput = messageTemplate(data);

  // Insert the HTML into the DOM
  document.getElementById("messageOutput").innerHTML = messageHtmlOutput;

  const sentMessages = document.querySelectorAll(".sendMessage");

  Array.from(sentMessages).forEach((sentMessage) => {
    const deleteMessage = sentMessage.querySelector(".deleteMessage");
    deleteMessage.addEventListener("click", function () {
      deleteMessageID = sentMessage.id;
      deleteMessageConfirmation.style.display = "block";
    });
  });
}

async function displayDirectMessage(userID, toID) {
  Handlebars.registerHelper("isSendMessage", function (senderID) {
    return senderID == userID;
  });

  Handlebars.registerHelper("isNewDay", function (index) {
    if (index == 0) {
      return true;
    } else {
      let currentMessageTime = new Date(
        directMessageData[index].time
      ).toDateString();
      let previousMessageTime = new Date(
        directMessageData[index - 1].time
      ).toDateString();
      if (currentMessageTime === previousMessageTime) {
        return false;
      } else {
        return true;
      }
    }
  });

  Handlebars.registerHelper("convertToDate", function (timestamp) {
    return new Date(timestamp).toDateString();
  });

  Handlebars.registerHelper("convertTo12HourTime", function (timestamp) {
    let time = timestamp.substring(11, 16);
    switch (time.charAt(0)) {
      case "1":
        time = Number(time.substring(0, 2)) - 12 + time.substring(2, 5) + "pm";
        break;
      case "0":
        time += "am";
        break;
    }

    return time;
  });

  const directMessageData = await getDirectMessages(userID, toID);

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

  const sentMessages = document.querySelectorAll(".sendMessage");

  Array.from(sentMessages).forEach((sentMessage) => {
    const deleteMessage = sentMessage.querySelector(".deleteMessage");
    deleteMessage.addEventListener("click", function () {
      deleteMessageID = sentMessage.id;
      deleteMessageConfirmation.style.display = "block";
    });
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

async function getDirectMessages(currentUserID, selectedUserID) {
  const server = "http://127.0.0.1:5000/api/message/direct";
  const query = `?senderID=${encodeURIComponent(
    currentUserID
  )}&receiverID=${encodeURIComponent(selectedUserID)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  return result;
}

async function deleteDirectMessage(messageID) {
  const server = "http://127.0.0.1:5000/api/message/direct/delete";
  const data = { messageID };

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
      console.error("Message deletion failed:", error.message);
    });
}

async function getGroupMessages(userID, groupID) {
  const server = "http://127.0.0.1:5000/api/message/group";
  const query = `?userID=${encodeURIComponent(
    userID
  )}&groupID=${encodeURIComponent(groupID)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  return result;
}
