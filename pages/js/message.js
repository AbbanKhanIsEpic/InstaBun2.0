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
  console.log(await getUserList(searchUsersInput.value));

  // Define the data
  const data = {
    users: [
      {
        username: "King",
        displayName: "Balls",
        profileIcon:
          "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=876&h=493&crop=1",
      },
      {
        username: "King",
        displayName: "Balls",
        profileIcon:
          "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=876&h=493&crop=1",
      },
      {
        username: "King",
        displayName: "Balls",
        profileIcon:
          "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=876&h=493&crop=1",
      },
    ],
  };

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  userList.innerHTML = htmlOutput;

  const users = userList.getElementsByClassName("user");

  Array.from(users).forEach((user) => {
    //const
    const checkmark = user.getElementsByTagName("svg")[0];
    const checkbox = user.getElementsByTagName("input")[0];
    //Event listerns
    checkbox.addEventListener("click", function () {
      checkmark.classList.toggle("d-none");
    });
  });
}

async function getUserList(searchQuery) {
  const server = "http://127.0.0.1:5000/api/user/search";
  const query = `?searchQuery=${encodeURIComponent(
    searchQuery
  )}&userPerPage=${encodeURIComponent(4)}&page=${encodeURIComponent(1)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  return result;
}
