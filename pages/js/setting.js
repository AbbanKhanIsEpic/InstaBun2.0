import { getUserInfo } from "./API/user.js";
import { getUserStories } from "./API/story.js";
import { getUserPosts } from "./API/post.js";
import { getUserCollection } from "./API/collection.js";
import { userID } from "./userSession.js";

const storyModal = document.querySelector("#storyModal");

const postModal = document.querySelector("#postModal");

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
  showPostData();
});

document
  .querySelector("#collectionSelection")
  .addEventListener("click", function () {
    document.querySelector("#contentPage").innerHTML = "";
    document.querySelector("li.active").classList.remove("active");
    document.querySelector("#collectionSelection").classList.add("active");
    showCollectionData();
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
  Handlebars.registerHelper("isSameVisibility", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

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

      let visibility = data[index]["storyVisibility"];

      console.log(visibility);

      const visibilityCheckBoxes = document
        .querySelector("#storyInformationContainer")
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

async function showPostData() {
  Handlebars.registerHelper("isSameVisibility", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  const template = Handlebars.templates["setting-post"];

  const data = await getUserPosts(userID);

  const output = template({ posts: data });

  document.querySelector("#contentPage").innerHTML = output;

  const posts = document.querySelectorAll(".post");

  Array.from(posts).forEach((post, index) => {
    post.addEventListener("click", function () {
      const modalTemplate = Handlebars.templates["setting-post-modal-dialog"];

      const modalOutput = modalTemplate(data[index]);

      postModal.innerHTML = modalOutput;

      new bootstrap.Modal(postModal).show();

      const descriptionInput = postModal.querySelector("#descriptionInput");

      let visibility = data[index]["postVisibility"];

      const tags = [];

      const tagList = postModal.querySelector("#tagList");

      data[index]["tags"].map((tag) => {
        tags.push(tag);
        displayAddedTag(tag);
      });

      descriptionInput.value = data[index]["description"];

      const visibilityCheckBoxes = document
        .querySelector("#postInformationContainer")
        .querySelectorAll(".visibilityCheckBox");

      const addTagButton = postModal.querySelector("#addTagButton");

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

      addTagButton.addEventListener("click", function () {
        const tag = tagInput.value;
        if (tag.length == 0) {
          alert("You must enter something");
        } else if (tag.length > 100) {
          alert("The tag is too long");
        } else if (tag.length != tag.replaceAll(/\s/g, "").length) {
          alert("The tag can not have spaces");
        } else if (tags.includes(tag)) {
          alert("You can not two of the same tag");
        } else {
          tags.push(tag);
          displayAddedTag(tag);
        }
      });

      function displayAddedTag(tag) {
        const template = Handlebars.templates["selected-tag"];
        const data = { tag: tag };

        // Render the template with data
        const htmlOutput = template(data);

        // Insert the HTML into the DOM
        tagList.innerHTML += htmlOutput;

        const displayTags = tagList.querySelectorAll(":scope > div");
        console.log(displayTags);
        displayTags.forEach((tag) => {
          const removeTag = tag.querySelector(".btn-close");
          console.log(removeTag);
          removeTag.addEventListener("click", function () {
            const tagName = tag.querySelector(
              `[aria-label="tag name"]`
            ).innerHTML;
            const index = tags.findIndex(function (tag) {
              return tag == tagName;
            });
            tags.splice(index, 1);
            tag.remove();
          });
        });
      }
    });
  });
}

async function showCollectionData() {
  const template = Handlebars.templates["setting-collection"];

  const data = await getUserCollection(userID);

  const output = template({ collections: data });

  document.querySelector("#contentPage").innerHTML = output;

  const collections = document.querySelectorAll(".collection");

  Array.from(collections).forEach((collection) => {
    collection.addEventListener("click", function () {});
  });
}
