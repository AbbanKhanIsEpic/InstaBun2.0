let toggleSideBar = document.querySelector("#toggleSideBar");
let sideBar = document.querySelector("#sideBar");
let contentPage = document.querySelector("#contentPage");
toggleSideBar.onclick = function () {
  sideBar.classList.toggle("active");
  contentPage.classList.toggle("active");
};
