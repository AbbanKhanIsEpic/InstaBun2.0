import { getUserList } from "./API/user.js";

document.addEventListener("DOMContentLoaded", async function () {
  const template = Handlebars.templates["search-user"];
  const userList = document.querySelector("#userList");

  // const data = await getRecommendardUsers(userID);
  // console.log(data);
  // // Render the template with data
  // const htmlOutput = template(data);

  // // Insert the HTML into the DOM
  // userList.innerHTML = htmlOutput;

  document
    .querySelector("#userSearchButton")
    .addEventListener("click", async function () {
      const input = document.querySelector("#userSearchInput").value;
      const searchedUser = await getUserList(input, userID);
      userList.innerHTML = "";
      const searchedUserHTMLOutput = template(searchedUser);
      userList.innerHTML = searchedUserHTMLOutput;
    });
});
