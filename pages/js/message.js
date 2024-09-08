//Imports
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

const createGroupModalClose = createGroupModal.querySelector(".closeModal");
const showCaseMemberNewGroup = createGroupModal.querySelector(
  "#showCaseMemberNewGroup"
);
const createGroupBtn = createGroupModal.querySelector("#createGroupBtn");
const groupNameInput = createGroupModal.querySelector("#groupNameInput");

const deleteMessageConfirmation = document.querySelector(
  "#deleteMessageConfirmation"
);
const cancelDeleteMessage = document.querySelector("#cancelDeleteMessage");
const confirmDeleteMessage = document.querySelector("#confirmDeleteMessage");

const infoModal = document.querySelector("#infoModal");

const viewHiddenMessages = document.querySelector("#viewHiddenMessages");

const searchMessageModal = document.querySelector("#searchMessageModal");
const searchMessageInput = document.querySelector("#searchMessageInput");
const filteredMessageList = searchMessageModal.querySelector(
  "#filteredMessageList"
);

let isGroup;
let deleteMessageID;
let communicatingToID;
let selectedFile;

const selectedArray = [];

//Event listeners

document.addEventListener("DOMContentLoaded", displayMessageLists(userID));

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
  createGroupModal.style.display = "none";
  document.querySelector(".modal-backdrop").classList.add("d-none");
});

createGroupBtn.addEventListener("click", function () {
  const groupName = groupNameInput.value;
  if (groupName.length == 0) {
    alert("You must enter a name for the group");
  } else if (groupName.length > 100) {
    alert("The group name is too long");
  } else {
    const formData = new FormData();

    const mime = selectedFile.type;

    const name = selectedFile.name;

    const newFile = new File([selectedFile], name, { type: mime });

    formData.append("file", newFile);

    const selectedUserID = selectedArray.map((user) => user.id);
    selectedUserID.push(userID);

    formData.append(
      "jsonData",
      JSON.stringify({
        groupMembers: selectedUserID,
        groupName: groupName,
        ownerID: userID,
      })
    );

    createGroup(formData);
    //This ensures that by the time the screen rehreshes -> the group can be displayed
    setTimeout(() => {
      createGroupModal.style.display = "none";
      document.querySelector(".modal-backdrop").classList.add("d-none");
      displayMessageLists(userID);
    }, 3000);
  }
});

infoModal.addEventListener("click", async function () {
  const messageColumn = document.getElementById("messageColumn");
  messageColumn.innerHTML = "";

  Handlebars.registerHelper("currentUserSent", function (senderID) {
    return senderID == userID;
  });

  const template = Handlebars.templates["message-selection"];

  const data = { messageList: await getMessageLists(userID) };

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  document.getElementById("messageColumn").innerHTML += htmlOutput;
});

viewHiddenMessages.addEventListener("shown.bs.modal", function () {});

searchMessageModal.addEventListener("shown.bs.modal", defaultSearchMessage);

searchMessageInput.addEventListener("input", function () {
  const keywords = searchMessageInput.value.trim();
  //Only display the list after 500ms -> user stop typing
  setTimeout(function () {
    if (keywords !== searchMessageInput.value || keywords.length == 0) {
      filteredMessageList.innerHTML = "";
      defaultSearchMessage();
    } else if (keywords == searchMessageInput.value) {
      const regex = new RegExp(`${keywords}.*`);
      for (let i = 0; i < filteredMessageList.childElementCount; i++) {
        const messageListRow = filteredMessageList.childNodes[i];
        const messageListRowName = messageListRow
          .querySelector('[aria-label="name"]')
          .textContent.trim();
        if (!messageListRowName.match(regex)) {
          messageListRow.classList.add("d-none");
        } else {
          messageListRow.classList.remove("d-none");
        }
      }
    }
  }, 500);
});

searchMessageModal.addEventListener("hide.bs.modal", function () {
  filteredMessageList.innerHTML = "";
});

groupIconInput.addEventListener("change", async function (event) {
  selectedFile = event.target.files[0];
  const sizeInMB = selectedFile.size / 1024 / 1024;
  const mime = selectedFile.type;
  if (sizeInMB > 15) {
    alert("Image size is too large. 5MB max");
  } else if (!mime.match("image.*")) {
    alert("You can only upload an image for the group icon");
  } else {
    const reader = new FileReader();
    reader.addEventListener("load", async (event) => {
      const showNewGroupIcon = document.querySelector("#showNewGroupIcon");
      showNewGroupIcon.src = event.target.result;
    });
    reader.readAsDataURL(selectedFile);
  }
});

cancelDeleteMessage.addEventListener("click", function () {
  deleteMessageConfirmation.style.display = "none";
});

confirmDeleteMessage.addEventListener("click", async function () {
  const resultStatus = (
    isGroup
      ? await deleteGroupMessage(deleteMessageID)
      : await deleteDirectMessage(deleteMessageID)
  )["status"];
  if (resultStatus == 200) {
    await displayMessages(userID, communicatingToID, !isGroup);
    await displayMessageLists(userID);
  } else {
    alert("Unable to delete the message, try again");
  }
  deleteMessageConfirmation.style.display = "none";
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
    const selectedUser = selectedArray[0];
    const id = selectedUser.id;
    const profileIcon = selectedUser.profileIcon;
    const displayName = selectedUser.DisplayName;
    setMessageContainer(userID, true, id, displayName, profileIcon);
    newMessageModal.style.display = "none";
    document.querySelector(".modal-backdrop").classList.add("d-none");
  } else if (hasSelectedSelf) {
    alert("You can not select yourself as another member in a group");
  } else {
    newMessageModal.style.display = "none";
    createGroupModal.style.display = "block";
  }
});

//Functions

function defaultSearchMessage() {
  const messageRows = document.getElementById("messageColumn").children;

  for (let i = 0; i < messageRows.length; i++) {
    filteredMessageList.appendChild(messageRows[i].cloneNode(true));
    console.log(messageRows[i].cloneNode(true));
  }
}

async function displayUserList() {
  const template = Handlebars.templates["search-user-message"];
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
    const profileIcon = user.querySelector("img").src;
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
        selectedArray.push({
          id: id,
          DisplayName: displayName,
          profileIcon: profileIcon,
        });
      }
      displaySelectedUsers(selectedArray);
      checkmark.classList.toggle("d-none");
    });
  });
}

function displaySelectedUsers(selectedArray) {
  const template = Handlebars.templates["selected-user"];
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

async function displayMessageLists(userID) {
  const messageColumn = document.getElementById("messageColumn");
  messageColumn.innerHTML = "";

  Handlebars.registerHelper("currentUserSent", function (senderID) {
    return senderID == userID;
  });

  const template = Handlebars.templates["message-selection"];

  const data = { messageList: await getMessageLists(userID) };

  console.log(data);

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  document.getElementById("messageColumn").innerHTML += htmlOutput;

  const messageSelections = document.querySelectorAll(".message");

  let selectedMessage;

  Array.from(messageSelections).forEach((messageSelection) => {
    const id = messageSelection.id;
    const isDirect = messageSelection.classList.contains("direct");
    if (id == communicatingToID) {
      if (isDirect != isGroup) {
        messageSelection.classList.add("selected");
        selectedMessage = messageSelection;
      }
    }
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

  const template = Handlebars.templates["message-container"];

  const data = { name: toName, profileIcon: toProfileIcon };

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  document.getElementById("conversationContainer").innerHTML = htmlOutput;

  const messageTextArea = document.querySelector("#messageTextArea");

  const sendMessageBtn = document.querySelector("#sendMessageBtn");

  displayMessages(userID, toID, isDirect);

  messageTextArea.addEventListener("input", function () {
    if (messageTextArea.childNodes.length == 0) {
      sendMessageBtn.classList.add("invisible");
    } else {
      sendMessageBtn.classList.remove("invisible");
    }
  });
}

async function displayMessages(userID, toID, isDirect) {
  Handlebars.registerHelper("isSendMessage", function (senderID) {
    return senderID == userID;
  });

  Handlebars.registerHelper("isNewDay", function (index) {
    if (index == 0) {
      return true;
    } else {
      let currentMessageTime = new Date(messageData[index].time).toDateString();
      let previousMessageTime = new Date(
        messageData[index - 1].time
      ).toDateString();
      if (currentMessageTime === previousMessageTime) {
        return false;
      } else {
        return true;
      }
    }
  });

  Handlebars.registerHelper("convertToDate", function (timestamp) {
    const date = new Date(timestamp);

    const today = new Date();

    const yesterday = new Date(new Date().setDate(today.getDate() - 1));

    const isYesterday =
      yesterday.toLocaleDateString() == date.toLocaleDateString();

    const withinWeek = date > new Date().setDate(new Date().getDate() - 7);

    if (today.toLocaleDateString() == date.toLocaleDateString()) {
      return "Today";
    } else if (isYesterday) {
      return "Yesterday";
    } else if (withinWeek) {
      return date.toLocaleDateString("en-UK", { weekday: "long" });
    } else {
      return date.toLocaleDateString("en-UK");
    }
  });

  Handlebars.registerHelper("convertTo12HourTime", function (timestamp) {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const messageData = isDirect
    ? await getDirectMessages(userID, toID)
    : await getGroupMessages(userID, toID);

  const messageTemplate = Handlebars.templates["message"];

  const data = { messages: messageData };

  console.log(data);

  // Render the template with data
  const messageHtmlOutput = messageTemplate(data);

  // Insert the HTML into the DOM
  document.getElementById("messageOutput").innerHTML = messageHtmlOutput;

  const sentMessages = document.querySelectorAll(".sendMessage");

  const moreInfo = document.querySelector("#moreInfo");

  moreInfo.addEventListener("click", function () {
    if (isDirect) {
    } else {
      infoModal.style.display = "block";
    }
  });

  Array.from(sentMessages).forEach((sentMessage) => {
    const deleteMessage = sentMessage.querySelector(".deleteMessage");
    deleteMessage.addEventListener("click", function () {
      deleteMessageID = sentMessage.id;
      deleteMessageConfirmation.style.display = "block";
    });
  });
}

async function sendMessage() {
  const message = document.querySelector("#messageTextArea").innerHTML;
  const resultStatus = (
    isGroup
      ? await sendGroupMessage(communicatingToID, userID, message)
      : await sendDirectMessage(userID, communicatingToID, message)
  )["status"];
  if (resultStatus == 200) {
    displayMessages(userID, communicatingToID, !isGroup);
    displayMessageLists(userID);
  } else {
    alert("Unable to send message");
  }
}
