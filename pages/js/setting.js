import {
  getUserInfo,
  updateProfile,
  getUsername,
  getProfileIcon,
} from "./API/user.js";
import { getUserStories, updateStory } from "./API/story.js";
import { getUserPosts, updatePost } from "./API/post.js";
import {
  getUserCollection,
  createCollection,
  getCollectionList,
  addStory,
  removeStory,
} from "./API/collection.js";
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
  Handlebars.registerHelper("isSameVisibility", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  const template = Handlebars.templates["setting-user"];
  const data = await getUserInfo(userID);
  const output = template(data);
  document.querySelector("#contentPage").innerHTML = output;

  let selectedFile = null;

  let hasSelectedFile = false;

  const usernameInput = document.querySelector("#usernameInput");
  const displayNameInput = document.querySelector("#displayNameInput");
  const bioInput = document.querySelector("#bioInput");
  const auth2SVEButton = document.querySelector("#auth2SVEButton");

  const updateProfileButton = document.querySelector("#updateProfileButton");

  usernameInput.value = data["username"];
  displayNameInput.value = data["displayName"];
  bioInput.value = data["bio"];
  let visibility = data["dmLimit"];

  document
    .getElementById("changeProfileIconInput")
    .addEventListener("change", function (event) {
      selectedFile = event.target.files[0];
      if (selectedFile.type.match("image.*")) {
        hasSelectedFile = true;
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("userProfileIcon").src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
      } else {
        alert("Only images allowed, sorry");
      }
    });

  const visibilityCheckBoxes = document.querySelectorAll(".visibilityCheckBox");

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

  updateProfileButton.addEventListener("click", async function () {
    const formData = new FormData();

    if (hasSelectedFile) {
      const mime = selectedFile.type;

      const name = selectedFile.name;

      console.log(selectedFile);

      const newFile = new File([selectedFile], name, { type: mime });

      formData.append("file", newFile);
    } else {
      formData.append("file", null);
    }

    formData.append(
      "jsonData",
      JSON.stringify({
        userID: userID,
        displayName: displayNameInput.value,
        bio: bioInput.value,
        dmLimit: visibility,
        auth: auth2SVEButton.checked,
      })
    );
    updateProfileButton.classList.add("disabled");
    const response = await updateProfile(formData);
    console.log(response);
    if (response.status == "200") {
      alert("Your profile is updated");
      window.open("http://127.0.0.1:5500/pages/profile.html", "_self");
    } else {
      alert("Error has occured, try again");
      window.open("http://127.0.0.1:5500/pages/profile.html", "_self");
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
      const viewCollectionList = document.querySelector("#viewCollectionList");
      new bootstrap.Modal(standardModal).show();

      let visibility = data[index]["storyVisibility"];

      const saveStoryButton = document.querySelector("#saveStoryButton");

      const storyCollectionButton = document.querySelector(
        "#storyCollectionButton"
      );

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

      storyCollectionButton.addEventListener("click", async function () {
        const storyID = data[index]["storyID"];
        new bootstrap.Modal(viewCollectionList).show();
        const collections = await getCollectionList(userID, storyID);
        console.log(collections);
        const collectionTemplate = Handlebars.templates["collection-list"];
        const collectionOutput = collectionTemplate({
          collections: collections,
        });
        const collectionList =
          viewCollectionList.querySelector("#collectionList");
        collectionList.innerHTML = collectionOutput;
        const collectionButtons =
          collectionList.querySelectorAll(".collection");

        Array.from(collectionButtons).forEach((collectionButton) => {
          collectionButton.addEventListener("click", async function () {
            const isInCollection = collectionButton.innerHTML == "Remove";
            if (!isInCollection) {
              const status = await addStory(collectionButton.id, storyID);
              console.log(status);
              if (status == "200") {
                collectionButton.innerHTML = "Remove";
                collectionButton.classList.remove("bg-primary");
                collectionButton.classList.add("bg-dark-subtle");
              }
            } else {
              const status = await removeStory(collectionButton.id, storyID);
              if (status == "200") {
                collectionButton.innerHTML = "Add";
                collectionButton.classList.add("bg-primary");
                collectionButton.classList.remove("bg-dark-subtle");
              }
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
  Handlebars.registerHelper("isSameVisibility", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("isCurrentUser", function (senderID) {
    return senderID == userID;
  });

  Handlebars.registerHelper("width", function (length) {
    return 100 / length + "%";
  });

  Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    console.log(arg1);
    console.log(arg2);
    console.log(options);
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("storyAge", function (uploadDate) {
    return age(uploadDate);
  });

  const template = Handlebars.templates["setting-collection"];

  const data = await getUserCollection(userID);

  console.log(data);

  const collections = { collections: data };

  collections["username"] = await getUsername(userID);

  collections["profileIcon"] = await getProfileIcon(userID);

  console.log(collections);

  const output = template(collections);

  document.querySelector("#contentPage").innerHTML = output;

  const storiesModal = document.getElementsByClassName("modal");

  document
    .querySelector("#createCollectionButton")
    .addEventListener("click", function () {
      const template = Handlebars.templates["create-collection"];

      const modalOutput = template();

      standardModal.innerHTML = modalOutput;

      new bootstrap.Modal(standardModal).show();

      let hasSelectedFile = false;

      let selectedFile = null;

      const newCollectionCover = document.querySelector("#newCollectionCover");

      const newCollectionTitleInput = document.querySelector(
        "#newCollectionTitleInput"
      );

      const collectionVisibilityAll = document.querySelector(
        "#collectionVisibilityAll"
      );

      const collectionCreateButton = document.querySelector(
        "#collectionCreateButton"
      );

      document
        .querySelector("#newCollectionCoverInput")
        .addEventListener("change", function (event) {
          selectedFile = event.target.files[0];
          if (selectedFile.type.match("image.*")) {
            const reader = new FileReader();
            reader.addEventListener("load", async (event) => {
              const imageSource = event.target.result;
              newCollectionCover.src = imageSource;
            });
            reader.readAsDataURL(selectedFile);
            hasSelectedFile = true;
          } else {
            alert("Only images allowed, sorry");
          }
        });

      collectionCreateButton.addEventListener("click", async function () {
        const collectionTitle = newCollectionTitleInput.value;
        if (!hasSelectedFile) {
          alert("You need to set a cover");
          return;
        }
        if (collectionTitle.trim().length == 0) {
          alert("You need to set a collection title");
          return;
        }
        if (collectionTitle.trim().length != collectionTitle.length) {
          alert("The collection title can not have spaces at the start or end");
          return;
        }
        if (collectionTitle.length > 100) {
          alert("The collection title is too long, 100 characters max");
          return;
        }
        const formData = new FormData();

        const mime = selectedFile.type;

        const name = selectedFile.name;

        const newFile = new File([selectedFile], name, { type: mime });

        formData.append("file", newFile);

        formData.append(
          "jsonData",
          JSON.stringify({
            collectionTitle: collectionTitle,
            userID: userID,
            isPublic: collectionVisibilityAll.checked,
          })
        );

        collectionCreateButton.classList.add("disabled");
        const response = await createCollection(formData);
        if (response.status == "200") {
          alert("The collection has been created");
        } else {
          alert("Error has occured, try again");
        }
        window.open("http://127.0.0.1:5500/pages/setting.html", "_self");
      });
    });

  Array.from(storiesModal).forEach((modal) => {
    const carouselInner = modal.querySelector(".carousel-inner");
    const storyAgeElement = modal.querySelector(".storyAge");
    const rightStory = modal.querySelector(".rightStory");
    const leftStory = modal.querySelector(".leftStory");
    const lastIndex =
      carouselInner != null ? carouselInner.childElementCount - 1 : 0;
    const customCarouselIndicator = modal.getElementsByClassName(
      "custom-carousel-indicator"
    );

    if (rightStory != null) {
      rightStory.addEventListener("click", function () {
        for (let index = 0; index < lastIndex; index++) {
          const currentStory = carouselInner.children[index];
          const nextStory = carouselInner.children[index + 1];
          if (currentStory.classList.contains("active")) {
            nextStory.classList.add("active");
            customCarouselIndicator[index + 1].classList.add("active");
            currentStory.classList.remove("active");
            if (index == 0) {
              leftStory.classList.toggle("visually-hidden");
            }
            if (index + 1 == lastIndex) {
              rightStory.classList.toggle("visually-hidden");
            }
            const currentVideo = currentStory.querySelector("video");
            if (currentVideo != null) {
              currentVideo.currentTime = 0;
              currentVideo.pause();
            }
            const currentStoriesID = modal.id.substring(
              modal.id.indexOf("-") + 1
            );
            const nextStoryID = nextStory.querySelector("img,video").id;
            const nextStoryUploadDate =
              data[currentStoriesID]["stories"][nextStoryID]["uploadDate"];
            storyAgeElement.innerHTML = age(nextStoryUploadDate);
            break;
          }
        }
      });
    }

    if (leftStory != null) {
      leftStory.addEventListener("click", function () {
        for (let index = 1; index <= lastIndex; index++) {
          const currentStory = carouselInner.children[index];
          const prevStory = carouselInner.children[index - 1];
          if (currentStory.classList.contains("active")) {
            prevStory.classList.toggle("active");
            customCarouselIndicator[index].classList.remove("active");
            currentStory.classList.toggle("active");
            if (index == 1) {
              leftStory.classList.toggle("visually-hidden");
            }
            if (index == lastIndex) {
              rightStory.classList.toggle("visually-hidden");
            }
            const currentVideo = currentStory.querySelector("video");
            if (currentVideo != null) {
              currentVideo.currentTime = 0;
              currentVideo.pause();
            }
            const currentStoriesID = modal.id.substring(
              modal.id.indexOf("-") + 1
            );
            const prevStoryID = prevStory.querySelector("img,video").id;
            const prevStoryUploadDate =
              data[currentStoriesID]["stories"][prevStoryID]["uploadDate"];
            storyAgeElement.innerHTML = age(prevStoryUploadDate);
            break;
          }
        }
      });
    }

    //I have to chaneg the way I look for the next story and ya
    modal.addEventListener("hidden.bs.modal", function () {
      const videos = modal.querySelectorAll("video");
      for (const video of videos) {
        video.currentTime = 0;
        video.pause();
      }
    });
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
function age(timestamp) {
  const timeDiffInSec = (new Date() - new Date(timestamp)) / 1000;

  const minute = Math.floor(timeDiffInSec / 60);
  const hour = Math.floor(timeDiffInSec / 3600);
  const days = Math.floor(timeDiffInSec / (60 * 60 * 24));
  const months = Math.floor(timeDiffInSec / (60 * 60 * 24 * 30));

  if (minute == 0) {
    return Math.floor(timeDiffInSec) + " secs";
  } else if (hour == 0) {
    return minute + " mins";
  } else if (days == 0) {
    return hour + " hr";
  } else if (months == 0) {
    return days + " days";
  } else {
    return months + " months";
  }
}
