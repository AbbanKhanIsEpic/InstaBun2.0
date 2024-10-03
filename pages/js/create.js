//Import
import { createStory } from "./API/story.js";
import { createPost } from "./API/post.js";
import { userID } from "./userSession.js";

const createModal = document.querySelector("#createModal");
const uploadPostInput = document.querySelector("#uploadPostInput");
const createGroupModalClose = createModal.querySelector(`[aria-label="Close"]`);
const displayUploaderContainer = createModal.querySelector(
  "#displayUploaderContainer"
);

const title = createModal.querySelector(".modal-title");

const storyCheckbox = createModal.querySelector("#uploadStoryType");
const tagInput = createModal.querySelector("#tagInput");
const postCheckbox = createModal.querySelector("#uploadPostType");
const postOnly = createModal.querySelector("#postOnly");
const addTagButton = createModal.querySelector("#addTagButton");
const postDescription = createModal.querySelector("#postDescription");
const tagList = createModal.querySelector("#tagList");
const uploadButton = createModal.querySelector("#uploadButton");

const visibilityCheckBoxes = createModal.querySelectorAll(
  ".visibilityCheckBox"
);

let visibility = 0;
let selectedFile;
let tags = [];
let isPost = true;

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

storyCheckbox.addEventListener("change", function (event) {
  const isChecked = event.target.checked;
  if (isChecked) {
    postCheckbox.checked = false;
    postOnly.classList.add("d-none");
    title.innerHTML = "Create a story";
    isPost = false;
  } else {
    storyCheckbox.checked = true;
  }
});

postCheckbox.addEventListener("change", function (event) {
  const isChecked = event.target.checked;
  if (isChecked) {
    storyCheckbox.checked = false;
    postOnly.classList.remove("d-none");
    title.innerHTML = "Create a post";
    isPost = true;
  } else {
    postCheckbox.checked = true;
  }
});

uploadPostInput.addEventListener("change", function (event) {
  selectedFile = event.target.files[0];
  if (selectedFile.type.match("image.*")) {
    createModal.style.display = "block";
    displayImage(selectedFile);
  } else if (selectedFile.type.match("video.*")) {
    createModal.style.display = "block";
    displayVideo(selectedFile);
  } else {
    alert("Only video or images allowed, sorry");
  }
});

uploadButton.addEventListener("click", async function () {
  const description = postDescription.value;

  if (isPost) {
    if (description.length == 0) {
      alert("Your post must have a description");
    } else if (description.length > 700) {
      alert("Your post's description is over the limit");
    } else if (tags.length == 0) {
      alert("Your post must have atleast 1 tag");
    } else {
      const formData = new FormData();

      const mime = selectedFile.type;

      const name = selectedFile.name;

      console.log(selectedFile);

      const newFile = new File([selectedFile], name, { type: mime });

      formData.append("file", newFile);

      formData.append(
        "jsonData",
        JSON.stringify({
          userID: userID,
          tags: tags,
          visibility: visibility,
          description: description,
        })
      );

      uploadButton.classList.add("disabled");
      const response = await createPost(formData);
      if (response.status == "200") {
        alert("The post has been uploaded");
        window.open("http://127.0.0.1:5500/pages/create.html", "_self");
      } else {
        alert("Error has occured, try again");
        window.open("http://127.0.0.1:5500/pages/create.html", "_self");
      }
    }
  } else {
    const formData = new FormData();

    const mime = selectedFile.type;

    const name = selectedFile.name;

    console.log(selectedFile);

    const newFile = new File([selectedFile], name, { type: mime });

    formData.append("file", newFile);

    formData.append(
      "jsonData",
      JSON.stringify({
        userID: userID,
        visibility: visibility,
      })
    );

    uploadButton.classList.add("disabled");
    const response = await createStory(formData);
    if (response.status == "200") {
      alert("The story has been uploaded");
      window.open("http://127.0.0.1:5500/pages/create.html", "_self");
    } else {
      alert("Error has occured, try again");
      window.open("http://127.0.0.1:5500/pages/create.html", "_self");
    }
  }
});

createGroupModalClose.addEventListener("click", function () {
  //Reset
  displayUploaderContainer.innerHTML = "";
  isPost = true;
  postCheckbox.checked = true;
  storyCheckbox.checked = false;
  postOnly.classList.remove("d-none");
  title.innerHTML = "Create a post";
  visibilityCheckBoxes.forEach((checkbox) => {
    if (checkbox.value == 0) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
  postDescription.value = "";
  tagInput.value = "";
  tagList.innerHTML = "";
  tags = [];
  //Close the modal
  createModal.style.display = "none";
});

function displayImage(image) {
  const reader = new FileReader();
  reader.addEventListener("load", async (event) => {
    const imageSource = event.target.result;
    displayUploaderContainer.innerHTML = `<img src="${imageSource}"
                        alt="">`;
  });
  reader.readAsDataURL(image);
}

function displayVideo(video) {
  const videoSource = URL.createObjectURL(video);
  displayUploaderContainer.innerHTML = `<video controls> <source src="${videoSource}"></video>`;
}

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
      const tagName = tag.querySelector(`[aria-label="tag name"]`).innerHTML;
      const index = tags.findIndex(function (tag) {
        return tag == tagName;
      });
      tags.splice(index, 1);
      tag.remove();
    });
  });
}
