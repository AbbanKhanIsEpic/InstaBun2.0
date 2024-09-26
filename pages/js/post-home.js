//Imports
import {
  getFollowingPost,
  likePost,
  unlikePost,
  getLikeList,
} from "./API/post.js";
import { userID } from "./userSession.js";
import { follow, unfollow } from "./API/follow.js";
import { comment, getComments } from "./API/comment.js";

const commentModal = document.querySelector("#comments");
const commentBtn = document.querySelector("#commentBtn");

let postID = null;

document.addEventListener("DOMContentLoaded", async function () {
  //Show the following post
  //Helper
  Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("postAge", function (uploadDate) {
    return age(uploadDate);
  });

  const templatePost = Handlebars.templates["post-home"];

  const data = await getFollowingPost(userID);

  const htmlOutput = templatePost({ post: data });

  document.getElementById("posts").innerHTML = htmlOutput;

  const posts = document.getElementsByClassName("post");

  Array.from(posts).forEach((post) => {
    //Declaring all interactables
    const likeButton = post.querySelector(".likeButton");
    const uploader = post.querySelector(".uploader");
    const bookmarkButton = post.querySelector(".bookmarkButton");
    const commentArea = post.querySelector(".commentTextArea");
    const sendQuickComment = post.querySelector(".sendQuickComment");
    const likeCounter = post.querySelector(".likeCounter");
    const viewCommentCount = post.querySelector("#viewCommentCount");
    const viewComment = post.querySelector("#viewComment");
    postID = post.id;

    //Event listeners

    //Like and unlike post
    likeButton.addEventListener("click", async function (event) {
      const didLike =
        event.currentTarget.children[0].classList.contains("like");
      if (didLike) {
        const response = await unlikePost(postID, userID);
        if (response.status == "200") {
          likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"
          class="bi bi-heart postInteraction" viewBox="0 0 16 16">
          <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
      </svg>`;
          likeCounter.innerHTML = Number(likeCounter.innerHTML) - 1;
        } else {
          alert("Error has occured, try again");
        }
      } else {
        const response = await likePost(postID, userID);
        if (response.status == "200") {
          likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-heart-fill like" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>`;
          likeCounter.innerHTML = Number(likeCounter.textContent) + 1;
        } else {
          alert("Error has occured, try again");
        }
      }
    });

    viewComment.addEventListener("click", function () {
      postID = post.id;
      populateCommentModal(postID, userID);
    });
    viewCommentCount.addEventListener("click", function () {
      postID = post.id;
      populateCommentModal(postID, userID);
    });

    //Showing a list of people who liked the post
    likeCounter.parentElement.addEventListener("click", async function () {
      Handlebars.registerHelper("ifNotCurrentUser", function (arg1, options) {
        return arg1 != userID ? options.fn(this) : options.inverse(this);
      });

      const list = await getLikeList(post.id, userID);

      const templateList = Handlebars.templates["like-list"];
      const likedList = document.querySelector("#likedList");
      const htmlOutput = templateList(list);
      likedList.innerHTML = htmlOutput;
      attachEventHandlersToButtons(likedList);
    });

    //Bookmark and unbookmark
    bookmarkButton.addEventListener("click", function (event) {});

    //Typing a quick comment -> changing the span display value
    commentArea.addEventListener("input", function () {
      const comment = commentArea.innerHTML;
      if (comment == 0) {
        sendQuickComment.classList.add("invisible");
      } else {
        sendQuickComment.classList.remove("invisible");
      }
    });

    sendQuickComment.addEventListener("click", async function () {
      const quickComment = commentArea.textContent;
      if (quickComment.length >= 300) {
        alert("You are over the limit");
        return;
      }
      const status = await comment(postID, userID, quickComment);
      if (status == "200") {
        if (viewCommentCount.textContent == "There is no comment D:") {
          viewCommentCount.textContent = "View the only comment";
        } else if (viewCommentCount.textContent == "View the only comment") {
          const count = document.createElement("SPAN");
          count.innerHTML = 2;
          viewCommentCount.innerHTML = "View all ";
          viewCommentCount.appendChild(count);
          viewCommentCount.innerHTML += " comments";
        } else {
          const count = viewCommentCount.querySelector("span");
          count.textContent = Number(count.textContent) + 1;
        }
      } else {
        alert("Unable to comment, try again");
      }
    });

    //Send user to the profile of the sender
    uploader.addEventListener("click", function () {});
  });
});

commentBtn.addEventListener("click", async function () {
  const commentText = document.querySelector("#commentInput").value;

  console.log(commentText);

  if (commentText.length == 0) {
    alert("You have to write something to comment");
    return;
  } else if (commentText.length >= 300) {
    alert("You are over the limit");
    return;
  }
  const status = await comment(postID, userID, commentText);
  const viewCommentCount = document
    .querySelector(`#\\3${postID}`)
    .querySelector("#viewCommentCount");
  if (status == "200") {
    if (viewCommentCount.textContent == "There is no comment D:") {
      viewCommentCount.textContent = "View the only comment";
    } else if (viewCommentCount.textContent == "View the only comment") {
      const count = document.createElement("SPAN");
      count.innerHTML = 2;
      viewCommentCount.innerHTML = "View all ";
      viewCommentCount.appendChild(count);
      viewCommentCount.innerHTML += " comments";
    } else {
      const count = viewCommentCount.querySelector("span");
      count.textContent = Number(count.textContent) + 1;
    }
    populateCommentModal(postID, userID);
  } else {
    alert("Unable to comment, try again");
  }
});

async function populateCommentModal(postID, userID) {
  Handlebars.registerHelper("commentAge", function (uploadDate) {
    return age(uploadDate);
  });

  const templatePost = Handlebars.templates["comment"];

  const comments = await getComments(postID, userID);

  const htmlOutput = templatePost({ comments: comments });

  commentModal.innerHTML = htmlOutput;
}

//Better this
function age(timestamp) {
  const timeDiffInSec = (new Date() - new Date(timestamp)) / 1000;

  const minute = Math.floor(timeDiffInSec / 60);
  const hour = Math.floor(timeDiffInSec / (60 * 60));
  const days = Math.floor(timeDiffInSec / (60 * 60 * 24));
  const months = Math.floor(timeDiffInSec / (60 * 60 * 24 * 30));

  if (minute == 0) {
    return timeDiffInSec + " secs";
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
