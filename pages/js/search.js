import { getUserList, getRecommendedUsers } from "./API/user.js";
import { follow, unfollow } from "./API/follow.js";
import { userID } from "./userSession.js";

document.addEventListener("DOMContentLoaded", async function () {
  Handlebars.registerHelper("isCurrentUser", function (senderID) {
    return senderID == userID;
  });

  const template = Handlebars.templates["search-user"];
  const userList = document.querySelector("#userList");

  const data = await getRecommendedUsers("mutual", userID);
  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  userList.innerHTML = htmlOutput;

  attachEventHandlersToButtons(userList);

  document
    .querySelector("#userSearchButton")
    .addEventListener("click", async function () {
      const input = document.querySelector("#userSearchInput").value.trim();
      userList.innerHTML = "";
      if (input.length == 0) {
        const data = await getRecommendedUsers("mutual", userID);
        const defaultHTMLOutput = template(data);
        userList.innerHTML = defaultHTMLOutput;
        attachEventHandlersToButtons(userList);
      } else {
        const searchedUser = await getUserList(input, userID);
        const searchedUserHTMLOutput = template(searchedUser);
        userList.innerHTML = searchedUserHTMLOutput;
        attachEventHandlersToButtons(userList);
      }
    });
});

function attachEventHandlersToButtons(element) {
  const buttons = element.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", async function () {
      const id = button.id;
      if (button.textContent == "Unfollow") {
        const status = await unfollow(userID, id);
        console.log(status);
        if (status == "200") {
          button.textContent = "Follow";
          button.classList.add("bg-primary");
          button.classList.remove("bg-dark-subtle");
        } else {
          alert("Error occured, unable to unfollow. Try again");
        }
      } else {
        const status = await follow(userID, id);
        if (status == "200") {
          button.textContent = "Unfollow";
          button.classList.remove("bg-primary");
          button.classList.add("bg-dark-subtle");
        } else {
          alert("Error occured, unable to follow. Try again");
        }
      }
    });
  });
}
