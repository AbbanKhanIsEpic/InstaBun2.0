//Declarations
const searchUsersInput = document.querySelector("#searchUsersInput");

//Event listeners
searchUsersInput.addEventListener("input", function () {
  const keywords = searchUsersInput.value;
  //Only display the list after 500ms -> user stop typing
  setTimeout(function () {
    if (keywords.length > searchUsersInput.value) {
      console.log("delete");
    } else if (keywords == searchUsersInput.value) {
      displayUserList();
    }
  }, 500);
});
//Functions

async function displayUserList() {
  // Get the template source
  const templateSource = document.getElementById(
    "search-user-template"
  ).innerHTML;

  // Compile the template
  const template = Handlebars.compile(templateSource);

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
  const userList = document.getElementById("userList");
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
