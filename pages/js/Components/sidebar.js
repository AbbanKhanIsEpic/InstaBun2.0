document.addEventListener("DOMContentLoaded", function () {
  const template = Handlebars.templates["sidebar"];

  const htmlOutput = template();

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
