import { getUsername, getProfileIcon } from "../API/user.js";
import { userID } from "../userSession.js";

document.addEventListener("DOMContentLoaded", async function () {
  const template = Handlebars.templates["sidebar"];

  const username = await getUsername(userID);
  const profileIcon = await getProfileIcon(userID);

  const htmlOutput = template({
    username: username,
    profileIcon: profileIcon,
  });

  document
    .querySelector("#contentPage")
    .insertAdjacentHTML("beforebegin", htmlOutput);

  let toggleSideBar = document.querySelector("#toggleSideBar");
  let sideBar = document.querySelector("#sideBar");
  let contentPage = document.querySelector("#contentPage");

  toggleSideBar.onclick = function () {
    sideBar.classList.toggle("active");
    contentPage.classList.toggle("active");
  };
});
function toHome() {
  window.open("http://127.0.0.1:5500/pages/home.html", "_self");
}
function toDiscover() {
  window.open("http://127.0.0.1:5500/pages/discover.html", "_self");
}
function toCreate() {
  window.open("http://127.0.0.1:5500/pages/create.html", "_self");
}
function toSearch() {
  window.open("http://127.0.0.1:5500/pages/search.html", "_self");
}
function toMessage() {
  window.open("http://127.0.0.1:5500/pages/message.html", "_self");
}
function toSetting() {
  window.open("http://127.0.0.1:5500/pages/setting.html", "_self");
}
function toProfile() {
  window.open("http://127.0.0.1:5500/pages/profile.html", "_self");
}
