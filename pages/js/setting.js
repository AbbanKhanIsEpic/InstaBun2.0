import { getUserInfo } from "./API/user.js";
import { getUserStories, updateStory } from "./API/story.js";
import { getUserPosts, updatePost } from "./API/post.js";
import { getUserCollection } from "./API/collection.js";
import {
  getUserBookmark,
  createBookmark,
  getBookmarkedPost,
} from "./API/bookmark.js";
import { userID } from "./userSession.js";

const standardModal = document.querySelector("#standardModal");

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
    showBookmarkData();
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
      standardModal.innerHTML = modalOutput;
      new bootstrap.Modal(standardModal).show();

      let visibility = data[index]["storyVisibility"];

      const saveStoryButton = document.querySelector("#saveStoryButton");

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

      saveStoryButton.addEventListener("click", async function () {
        const storyID = data[index]["storyID"];
        console.log(visibility);
        const status = await updateStory(storyID, visibility);
        if (status == "200") {
          alert("Story's visibilty successfully updated");
          showStoryData();
        } else {
          alert("Something went wrong, try again");
        }
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

      standardModal.innerHTML = modalOutput;

      new bootstrap.Modal(standardModal).show();

      const descriptionInput = standardModal.querySelector("#descriptionInput");

      const updatePostButton = document.querySelector("#savePostButton");

      let visibility = data[index]["postVisibility"];

      const tags = [];

      const tagList = standardModal.querySelector("#tagList");

      data[index]["tags"].map((tag) => {
        tags.push(tag);
        displayAddedTag(tag);
      });

      descriptionInput.value = data[index]["description"];

      const visibilityCheckBoxes = document
        .querySelector("#postInformationContainer")
        .querySelectorAll(".visibilityCheckBox");

      const addTagButton = standardModal.querySelector("#addTagButton");

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

      updatePostButton.addEventListener("click", async function () {
        updatePostButton.classList.add("disabled");
        const postID = data[index]["postID"];
        const status = await updatePost(
          postID,
          tags,
          descriptionInput.value,
          visibility
        );
        if (status == 200) {
          updatePostButton.classList.remove("disabled");
          alert("Updated post");
          showPostData();
        } else {
          updatePostButton.classList.remove("disabled");
          alert("Something went wrong, try again");
        }
      });
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

async function showBookmarkData() {
  const template = Handlebars.templates["setting-bookmark"];

  const data = await getUserBookmark(userID);

  const output = template({ bookmarks: data });

  document.querySelector("#contentPage").innerHTML = output;

  const bookmarks = document.querySelectorAll(".bookmark");

  Array.from(bookmarks).forEach((bookmark, index) => {
    bookmark.addEventListener("click", async function () {
      const bookmarkID = data[index]["bookmarkID"];
      const bookmarkTitle = data[index]["bookmarkTitle"];

      const modalTemplate = Handlebars.templates["bookmark-post"];

      const posts = await getBookmarkedPost(bookmarkID);

      const combinedData = { posts: posts, Title: bookmarkTitle };

      const modalOutput = modalTemplate(combinedData);

      standardModal.innerHTML = modalOutput;

      new bootstrap.Modal(standardModal).show();
    });
  });

  document
    .querySelector("#createBookmarkButton")
    .addEventListener("click", function () {
      const template = Handlebars.templates["create-bookmark"];

      const modalOutput = template();

      standardModal.innerHTML = modalOutput;

      new bootstrap.Modal(standardModal).show();

      let hasSelectedFile = false;

      let selectedFile = null;

      const newBookmarkCoverImage = document.querySelector("#newBookmarkCover");

      const newBookmarkTitleInput = document.querySelector(
        "#newBookmarkTitleInput"
      );

      const bookmarkCreateButton = document.querySelector(
        "#bookmarkCreateButton"
      );

      document
        .querySelector("#newBookmarkCoverInput")
        .addEventListener("change", function (event) {
          selectedFile = event.target.files[0];
          if (selectedFile.type.match("image.*")) {
            const reader = new FileReader();
            reader.addEventListener("load", async (event) => {
              const imageSource = event.target.result;
              newBookmarkCoverImage.src = imageSource;
            });
            reader.readAsDataURL(selectedFile);
            hasSelectedFile = true;
          } else {
            alert("Only images allowed, sorry");
          }
        });

      bookmarkCreateButton.addEventListener("click", async function () {
        const bookmarkTitle = newBookmarkTitleInput.value;
        if (!hasSelectedFile) {
          alert("You need to set a cover");
          return;
        }
        if (bookmarkTitle.trim().length == 0) {
          alert("You need to set a bookmark title");
          return;
        }
        if (bookmarkTitle.trim().length != bookmarkTitle.length) {
          alert("The bookmark title can not have spaces at the start or end");
          return;
        }
        if (bookmarkTitle.length > 100) {
          alert("The bookmark title is too long, 100 characters max");
          return;
        }
        const formData = new FormData();

        const mime = selectedFile.type;

        const name = selectedFile.name;

        console.log(selectedFile);

        const newFile = new File([selectedFile], name, { type: mime });

        formData.append("file", newFile);

        formData.append(
          "jsonData",
          JSON.stringify({
            bookmarkTitle: bookmarkTitle,
            userID: userID,
          })
        );

        bookmarkCreateButton.classList.add("disabled");
        const response = await createBookmark(formData);
        if (response.status == "200") {
          alert("The bookmark has been created");
        } else {
          alert("Error has occured, try again");
        }
        window.open("http://127.0.0.1:5500/pages/setting.html", "_self");
      });
    });
}
