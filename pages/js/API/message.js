//Send messages
async function sendGroupMessage(groupID, senderID, message) {
  const server = "http://127.0.0.1:5000/api/message/group";
  const data = { groupID, senderID, message };

  try {
    const response = await fetch(server, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    return { status: 200, response: responseData };
  } catch (error) {
    return {
      status: 500,
      internalMessage: "Failed to send group message",
      error: error.message,
    };
  }
}

async function sendDirectMessage(senderID, receiverID, message) {
  const server = "http://127.0.0.1:5000/api/message/direct";
  const data = { senderID, receiverID, message };

  try {
    const response = await fetch(server, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    return { status: 200, response: responseData };
  } catch (error) {
    return {
      status: 500,
      internalMessage: "Failed to send direct message",
      error: error.message,
    };
  }
}

//Get messages
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

//Delete messages
async function deleteDirectMessage(messageID) {
  const server = "http://127.0.0.1:5000/api/message/direct/delete";
  const data = { messageID };

  try {
    const response = await fetch(server, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    return { status: 200, response: responseData };
  } catch (error) {
    return {
      status: 500,
      internalMessage: "Failed to send group message",
      error: error.message,
    };
  }
}

async function deleteGroupMessage(messageID) {
  const server = "http://127.0.0.1:5000/api/message/group/delete";
  const data = { messageID };

  try {
    const response = await fetch(server, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    return { status: 200, response: responseData };
  } catch (error) {
    return {
      status: 500,
      internalMessage: "Failed to send group message",
      error: error.message,
    };
  }
}
