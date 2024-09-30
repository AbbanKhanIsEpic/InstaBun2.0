import { getUserInfo } from "./API/user.js";
import { getUserStories } from "./API/story.js";
import { userID } from "./userSession.js";

const storyModal = document.querySelector("#storyModal");
let visibility = 0;

document.addEventListener("DOMContentLoaded", async function () {
  showUserData();
});

document
  .querySelector("#accountSection")
  .addEventListener("click", function () {
    document.querySelector("#contentPage").innerHTML = "";
    document.querySelector("li.active").classList.remove("active");
    document.querySelector("#accountSection").classList.add("active");
    showUserData();
  });

document.querySelector("#storySection").addEventListener("click", function () {
  document.querySelector("#contentPage").innerHTML = "";
  document.querySelector("li.active").classList.remove("active");
  document.querySelector("#storySection").classList.add("active");
  showStoryData();
});

document.querySelector("#postSection").addEventListener("click", function () {
  document.querySelector("#contentPage").innerHTML = "";
  document.querySelector("li.active").classList.remove("active");
  document.querySelector("#postSection").classList.add("active");
});

document
  .querySelector("#collectionSelection")
  .addEventListener("click", function () {
    document.querySelector("#contentPage").innerHTML = "";
    document.querySelector("li.active").classList.remove("active");
    document.querySelector("#collectionSelection").classList.add("active");
  });

document
  .querySelector("#bookmarkSection")
  .addEventListener("click", function () {
    document.querySelector("#contentPage").innerHTML = "";
    document.querySelector("li.active").classList.remove("active");
    document.querySelector("#bookmarkSection").classList.add("active");
  });

async function showUserData() {
  const template = Handlebars.templates["setting-user"];
  const data = await getUserInfo(userID);
  const output = template(data);
  document.querySelector("#contentPage").innerHTML = output;

  const usernameInput = document.querySelector("#usernameInput");
  const displayNameInput = document.querySelector("#displayNameInput");
  const emailAddressInput = document.querySelector("#emailAddressInput");
  const bioInput = document.querySelector("#bioInput");

  usernameInput.value = data["username"];
  displayNameInput.value = data["displayName"];
  emailAddressInput.value = data["emailAddress"];
  bioInput.value = data["bio"];

  document
    .getElementById("changeProfileIconInput")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("userProfileIcon").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
}

async function showStoryData() {
  const template = Handlebars.templates["setting-story"];

  const data = await getUserStories(userID);

  const output = template({ stories: data });

  document.querySelector("#contentPage").innerHTML = output;

  const stories = document.querySelectorAll(".story");

  Array.from(stories).forEach((story, index) => {
    story.addEventListener("click", function () {
      const modalTemplate =
        Handlebars.templates["setting-stories-modal-dialog"];
      const modalOutput = modalTemplate(data[index]);
      storyModal.innerHTML = modalOutput;
      new bootstrap.Modal(storyModal).show();

      const visibilityCheckBoxes = document
        .querySelector("#postInformationContainer")
        .querySelectorAll(".visibilityCheckBox");

      visibilityCheckBoxes.forEach((visibilityCheckBox) => {
        visibilityCheckBox.addEventListener("change", function (event) {
          const isChecked = event.target.checked;
          visibility = event.target.value;
          if (!isChecked) {
            visibilityCheckBox.checked = true;
          }
          visibilityCheckBoxes.forEach((checkbox) => {
            if (checkbox != visibilityCheckBox) {
              checkbox.checked = false;
            }
          });
        });
      });
    });
  });
}
