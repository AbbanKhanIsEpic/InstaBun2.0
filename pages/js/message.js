//Imports
import {
  createGroup,
  getOwnerID,
  getMembers,
  addMember,
  removeMember,
  changeOwner,
  updateTitle,
  changeGroupIcon,
} from "./API/group.js";
import { getUserList } from "./API/user.js";
import {
  sendGroupMessage,
  sendDirectMessage,
  getDirectMessages,
  getMessageLists,
  getGroupMessages,
  deleteDirectMessage,
  deleteGroupMessage,
  getHiddenMessageList,
  clearDirectMessage,
  clearGroupMessage,
} from "./API/message.js";
import { userID } from "./userSession.js";
import { getProfileIcon, getUsername, getDisplayName } from "./API/user.js";
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

let isGroup;
let deleteMessageID;
let communicatingToID;
let selectedFile;
let hasSelectedGroupIcon = false;
let confirmAction = null;

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
  selectedArray.length = 0;
  showCaseMemberNewGroup.innerHTML = "";
  createGroupModal.style.display = "none";
  document.querySelector(".modal-backdrop").classList.add("d-none");
});

createGroupBtn.addEventListener("click", function () {
  const groupName = groupNameInput.value;
  if (!hasSelectedGroupIcon) {
    alert("You must have a group icon");
    return;
  }
  if (groupName.length == 0) {
    alert("You must enter a name for the group");
    return;
  } else if (groupName.length > 100) {
    alert("The group name is too long");
    return;
  } else {
    const formData = new FormData();

    const mime = selectedFile.type;

    const name = selectedFile.name;

    const newFile = new File([selectedFile], name, { type: mime });

    formData.append("file", newFile);

    const selectedUserID = selectedArray.map((user) => user.id);

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

viewHiddenMessages.addEventListener("shown.bs.modal", async function () {
  document.getElementById("hiddenMessageColumn").innerHTML = "";
  document.getElementById("conversationContainer").innerHTML = "";
  document.getElementById(
    "hiddenConversationContainer"
  ).innerHTML = `<div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                class="bi bi-chat-text-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
              </svg>
              <h3 class="mt-2">View hidden messages</h3>
            </div>`;
  const template = Handlebars.templates["message-selection"];

  const data = { messageList: await getHiddenMessageList(userID) };

  console.log(data);

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  document.getElementById("hiddenMessageColumn").innerHTML += htmlOutput;

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
      setMessageContainer(userID, isDirect, id, name, icon, true);
      messageSelection.classList.add("selected");
      selectedMessage = messageSelection;
    });
  });
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
    hasSelectedGroupIcon = true;
  }
});

cancelDeleteMessage.addEventListener("click", function () {
  deleteMessageConfirmation.style.display = "none";
});

confirmDeleteMessage.addEventListener("click", async function () {
  console.log("Hello");
  const resultStatus = (
    isGroup
      ? await deleteGroupMessage(deleteMessageID)
      : await deleteDirectMessage(deleteMessageID)
  )["status"];
  console.log(resultStatus);
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
    console.log(selectedUser);
    const id = selectedUser.id;
    const profileIcon = selectedUser["profileIcon"];
    const displayName = selectedUser["displayName"];
    setMessageContainer(userID, true, id, displayName, profileIcon);
    newMessageModal.style.display = "none";
    document.querySelector(".modal-backdrop").classList.add("d-none");
    selectedArray.length = 0;
    userList.innerHTML = "";
    searchUsersInput.value = "";
    showcaseSelectedUsers.innerHTML = "";
  } else if (hasSelectedSelf) {
    alert("You can not select yourself as another member in a group");
  } else {
    newMessageModal.style.display = "none";
    createGroupModal.style.display = "block";
    displayMemberNewGroup();
  }
});

//Functions

async function displayUserList() {
  const template = Handlebars.templates["search-user-message"];
  const data = await getUserList(searchUsersInput.value, userID);

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
    const username = user
      .querySelector('[aria-label="username"]')
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
      } else {
        user.classList.add("selected");
        selectedArray.push({
          id: id,
          displayName: displayName,
          profileIcon: profileIcon,
          username: username,
        });
      }
      displaySelectedUsers(selectedArray);
      checkmark.classList.toggle("d-none");
    });
  });
}

async function displayMemberNewGroup() {
  const template = Handlebars.templates["member"];
  const owner = {
    id: userID,
    profileIcon: await getProfileIcon(userID),
    displayName: await getDisplayName(userID),
    username: await getUsername(userID),
  };
  selectedArray.push(owner);

  const output = template({ users: selectedArray });
  showCaseMemberNewGroup.innerHTML = output;
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
      }

      displaySelectedUsers(selectedArray);
    });
  });
}

async function displayMessageLists(userID) {
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
  toProfileIcon,
  hidden = false
) {
  isGroup = !isDirect;
  communicatingToID = toID;

  const template = hidden
    ? Handlebars.templates["hidden-container"]
    : Handlebars.templates["message-container"];

  const data = { name: toName, profileIcon: toProfileIcon };

  // Render the template with data
  const htmlOutput = template(data);

  const conversationContainer = hidden
    ? document.getElementById("hiddenConversationContainer")
    : document.getElementById("conversationContainer");

  conversationContainer.innerHTML = htmlOutput;

  const messageTextArea = document.querySelector("#messageTextArea");

  const sendMessageBtn = document.querySelector("#sendMessageBtn");

  const moreInfo = document.querySelector("#moreInfo");

  moreInfo.addEventListener("click", async function () {
    const modalTemplate = Handlebars.templates["conversation-info"];

    const selectedGroupOwner = (await getOwnerID(communicatingToID))["ownerID"];

    const groupMembers = await getMembers(communicatingToID);

    Handlebars.registerHelper("isGroupOwner", function (memberID, ownerID) {
      return memberID == ownerID;
    });

    const data = {
      isDirect: isDirect,
      name: toName.trim(),
      profileIcon: toProfileIcon,
      ownerID: selectedGroupOwner,
      members: groupMembers,
      isGroupOwner: selectedGroupOwner == userID,
    };

    const modalOutput = modalTemplate(data);
    const conversationInfoModal = document.querySelector(
      "#conversationInfoModal"
    );

    conversationInfoModal.innerHTML = modalOutput;

    new bootstrap.Modal(conversationInfoModal).show();

    const clearMessage = conversationInfoModal.querySelector("#clearMessage");

    const transferOwnershipButtons =
      document.querySelectorAll(".transferOwnership");

    const removeMemberButtons = document.querySelectorAll(".removeMember");

    const addNewMemberButton = conversationInfoModal.querySelector(
      "#addNewMemberButton"
    );

    const leaveGroupButton =
      conversationInfoModal.querySelector("#leaveGroupButton");

    const changeGroupNameInput = conversationInfoModal.querySelector(
      "#changeGroupNameInput"
    );

    const updateGroupButton =
      conversationInfoModal.querySelector("#updateGroupButton");

    let selectedFile = null;
    let hasSelectedFile = false;

    document
      .querySelector("#changeGroupProfileIcon")
      .addEventListener("change", function (event) {
        selectedFile = event.target.files[0];
        if (selectedFile.type.match("image.*")) {
          const reader = new FileReader();
          reader.addEventListener("load", async (event) => {
            const imageSource = event.target.result;
            document.querySelector("#showNewIcon").src = imageSource;
          });
          reader.readAsDataURL(selectedFile);
          hasSelectedFile = true;
        } else {
          alert("Only images allowed, sorry");
        }
      });

    if (updateGroupButton) {
      updateGroupButton.addEventListener("click", async function () {
        const inputValue = changeGroupNameInput.value;
        if (hasSelectedFile) {
          const formData = new FormData();

          const mime = selectedFile.type;

          const name = selectedFile.name;

          console.log(selectedFile);

          const newFile = new File([selectedFile], name, { type: mime });

          formData.append("file", newFile);

          formData.append(
            "jsonData",
            JSON.stringify({
              groupID: communicatingToID,
            })
          );
          updateGroupButton.classList.add("disabled");
          const status = await changeGroupIcon(formData);
          if (status == "200") {
            updateGroupButton.classList.remove("disabled");
            alert("Icon has been updated");
          } else {
            alert("Something went wrong, try again");
          }
        }
        if (inputValue.trim() != toName.trim()) {
          await updateTitle(communicatingToID, inputValue.trim());
          alert("Title has been updated");
        }
      });
      location.reload();
    }

    if (leaveGroupButton) {
      leaveGroupButton.addEventListener("click", function () {
        if (confirmAction == null) {
          alert("Click the button again to confirm your departure");
          confirmAction = { type: "leaveGroup", groupID: communicatingToID };
          return;
        }
        if (
          confirmAction.type == "leaveGroup" &&
          confirmAction.groupID == communicatingToID
        ) {
          alert("Confirmed");
          removeMember(communicatingToID, userID);
          location.reload();
          return;
        } else {
          alert("Click the button again to confirm your departure");
          confirmAction = {
            type: "leaveGroup",
            groupID: communicatingToID,
          };
          return;
        }
      });
    }

    Array.from(transferOwnershipButtons).forEach((transferOwnership) => {
      transferOwnership.addEventListener("click", async function () {
        if (confirmAction == null) {
          alert("Click the button again to confirm your transfer of ownership");
          confirmAction = {
            type: "leaveGroup",
            groupID: communicatingToID,
            id: transferOwnership.id,
          };
          return;
        }
        if (
          confirmAction.type == "leaveGroup" &&
          confirmAction.groupID == communicatingToID &&
          confirmAction.id == transferOwnership.id
        ) {
          await changeOwner(communicatingToID, transferOwnership.id);
          alert("Transfer is done");
          location.reload();
          return;
        } else {
          alert("Click the button again to confirm your transfer of ownership");
          confirmAction = {
            type: "leaveGroup",
            groupID: communicatingToID,
            id: transferOwnership.id,
          };
          return;
        }
      });
    });

    Array.from(removeMemberButtons).forEach((removeMemberButton) => {
      removeMemberButton.addEventListener("click", async function () {
        if (confirmAction == null) {
          alert("Click the button again to confirm removing the member");
          confirmAction = {
            type: "removeMember",
            groupID: communicatingToID,
            id: removeMemberButton.id,
          };
          return;
        }
        if (
          confirmAction.type == "removeMember" &&
          confirmAction.groupID == communicatingToID &&
          confirmAction.id == removeMemberButton.id
        ) {
          await removeMember(communicatingToID, removeMemberButton.id);
          alert("Removing the member is done");
          location.reload();
          return;
        } else {
          alert("Click the button again to confirm removing the member");
          confirmAction = {
            type: "removeMember",
            groupID: communicatingToID,
            id: removeMemberButton.id,
          };
          return;
        }
      });
    });

    clearMessage.addEventListener("click", async function () {
      if (isDirect) {
        if (confirmAction == null) {
          alert("Click the button again to confirm clearing messages");
          confirmAction = {
            type: "clearDirect",
            groupID: null,
            id: communicatingToID,
          };
          return;
        }
        if (
          confirmAction.type == "clearDirect" &&
          confirmAction.groupID == null &&
          confirmAction.id == communicatingToID
        ) {
          await clearDirectMessage(userID, communicatingToID);
          alert("Clearing messages is done");
          location.reload();
          return;
        } else {
          alert("Click the button again to confirm clearing messages");
          confirmAction = {
            type: "clearDirect",
            groupID: null,
            id: communicatingToID,
          };
          return;
        }
      } else {
        if (confirmAction == null) {
          alert("Click the button again to confirm clearing messages");
          confirmAction = {
            type: "clearGroup",
            groupID: communicatingToID,
            id: null,
          };
          return;
        }
        if (
          confirmAction.type == "clearGroup" &&
          confirmAction.groupID == communicatingToID &&
          confirmAction.id == null
        ) {
          await clearGroupMessage(userID, communicatingToID);
          alert("Clearing messages is done");
          location.reload();
          return;
        } else {
          alert("Click the button again to confirm clearing messages");
          confirmAction = {
            type: "clearGroup",
            groupID: communicatingToID,
            id: null,
          };
          return;
        }
      }
    });

    if (addNewMemberButton) {
      addNewMemberButton.addEventListener("click", async function () {
        const addMemberModal = document.querySelector("#addMemberModal");

        new bootstrap.Modal(addMemberModal).show();

        const newMemberArray = [];

        const newMemberList = addMemberModal.querySelector("#newMemberList");
        const showcaseSelectedMembers = addMemberModal.querySelector(
          "#showcaseSelectedMembers"
        );
        const searchNewMemberInput = addMemberModal.querySelector(
          "#searchNewMemberInput"
        );

        const addMemberButton = document.querySelector("#addMember");

        addMemberButton.addEventListener("click", async function () {
          const existingGroupMemberIDs = groupMembers.map(
            (groupMember) => groupMember?.["userID"]
          );
          const selectedUserIDs = newMemberArray.map((member) =>
            Number(member?.["id"])
          );
          const isContainingExsitingMembers = selectedUserIDs.filter(
            (memberID) => existingGroupMemberIDs.includes(memberID)
          );
          if (isContainingExsitingMembers.includes(userID)) {
            alert("You can not add yourself");
            return;
          }
          if (isContainingExsitingMembers.length > 0) {
            alert("You can not add an existing member");
            return;
          }
          const newMembers = selectedUserIDs.filter(
            (memberID) => !existingGroupMemberIDs.includes(memberID)
          );
          addMemberButton.classList.add("disabled");
          for (const memberID of newMembers) {
            await addMember(communicatingToID, memberID);
          }
          alert("Member/s are added");
          location.reload();
        });

        searchNewMemberInput.addEventListener("input", function () {
          const keywords = searchNewMemberInput.value.trim();
          //Only display the list after 500ms -> user stop typing
          setTimeout(function () {
            if (
              keywords !== searchNewMemberInput.value ||
              keywords.length == 0
            ) {
              userList.innerHTML = "";
            } else if (keywords == searchNewMemberInput.value) {
              displayUserList();
            }
          }, 500);
        });

        async function displayUserList() {
          const template = Handlebars.templates["search-user-message"];
          const data = await getUserList(searchNewMemberInput.value, userID);

          // Render the template with data
          const htmlOutput = template(data);

          // Insert the HTML into the DOM
          newMemberList.innerHTML = htmlOutput;

          const users = addMemberModal.getElementsByClassName("user");

          Array.from(users).forEach((user) => {
            console.log(user);
            const id = user.id.split("-")[1];
            const displayName = user
              .querySelector('[aria-label="display name"]')
              .textContent.trim();
            const username = user
              .querySelector('[aria-label="username"]')
              .textContent.trim();
            const profileIcon = user.querySelector("img").src;
            const checkbox = user.querySelector("input[type=checkbox]");
            const checkmark = user.querySelector(".checkmark > svg");

            const isAlreadySelected =
              newMemberArray.findIndex(function (selected) {
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
                const index = newMemberArray.findIndex(function (selected) {
                  return selected.id == id;
                });
                newMemberArray.splice(index, 1);
              } else {
                user.classList.add("selected");
                newMemberArray.push({
                  id: id,
                  displayName: displayName,
                  profileIcon: profileIcon,
                  username: username,
                });
              }
              displaySelectedUsers(newMemberArray);
              checkmark.classList.toggle("d-none");
            });
          });
        }

        function displaySelectedUsers(newMemberArray) {
          const template = Handlebars.templates["selected-user"];
          const data = { users: newMemberArray };

          console.log(data);

          // Render the template with data
          const htmlOutput = template(data);

          // Insert the HTML into the DOM
          showcaseSelectedMembers.innerHTML = htmlOutput;

          const selectedUsers =
            showcaseSelectedMembers.getElementsByClassName("selectedUser");

          Array.from(selectedUsers).forEach((selectedUser) => {
            const closeButton = selectedUser.querySelector(".btn-close");
            const id = selectedUser.id.split("-")[1];

            closeButton.addEventListener("click", function () {
              const index = newMemberArray.findIndex(function (selected) {
                return selected.id == id;
              });
              newMemberArray.splice(index, 1);

              const deSelectedUser = document.querySelector(`#user-${id}`);
              if (deSelectedUser !== null) {
                const checkbox = deSelectedUser.querySelector(
                  "input[type=checkbox]"
                );
                const checkmark =
                  deSelectedUser.querySelector(".checkmark > svg");
                deSelectedUser.classList.remove("selected");
                checkmark.classList.toggle("d-none");
                checkbox.value = "off";
              }

              displaySelectedUsers(newMemberArray);
            });
          });
        }
      });
    }
  });

  displayMessages(userID, toID, isDirect, hidden);

  if (!hidden) {
    messageTextArea.addEventListener("input", function () {
      if (messageTextArea.childNodes.length == 0) {
        sendMessageBtn.classList.add("invisible");
      } else {
        sendMessageBtn.classList.remove("invisible");
      }
    });

    sendMessageBtn.addEventListener("click", async function () {
      console.log("Hello");
      const message = document.querySelector("#messageTextArea").textContent;
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
    });
  }
}

async function displayMessages(userID, toID, isDirect, hidden = false) {
  const messageData = isDirect
    ? await getDirectMessages(userID, toID)
    : await getGroupMessages(userID, toID);

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

  console.log(messageData);

  const messageTemplate = Handlebars.templates["message"];

  const data = { messages: messageData };

  console.log(data);

  // Render the template with data
  const messageHtmlOutput = messageTemplate(data);

  // Insert the HTML into the DOM

  console.log(viewHiddenMessages);
  const messageOutput = hidden
    ? viewHiddenMessages.querySelector("#hiddenMessageOutput")
    : document.getElementById("messageOutput");
  messageOutput.innerHTML = messageHtmlOutput;

  const sentMessages = document.querySelectorAll(".sendMessage");

  Array.from(sentMessages).forEach((sentMessage) => {
    const deleteMessage = sentMessage.querySelector(".deleteMessage");
    deleteMessage.addEventListener("click", function () {
      deleteMessageID = sentMessage.id;
      deleteMessageConfirmation.style.display = "block";
    });
  });
}
