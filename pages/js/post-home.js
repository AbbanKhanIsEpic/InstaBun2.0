import { getFollowingPost } from "./API/post.js";
import { userID } from "./userSession.js";

document.addEventListener("DOMContentLoaded", async function () {
  //Helper
  Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("postAge", function (uploadDate) {
    return postAge(uploadDate);
  });

  // Compile the template
  const template = Handlebars.templates["post-home"];

  // Define the data
  const data = await getFollowingPost(userID);
  // Render the template with data
  const htmlOutput = template({ post: data });

  // Insert the HTML into the DOM
  document.getElementById("posts").innerHTML = htmlOutput;

  const posts = document.getElementsByClassName("post");

  Array.from(posts).forEach((post) => {
    //Declaring all interactables
    const likeButton = post.querySelector(".like-button");
    const uploader = post.querySelector(".uploader");
    const bookmarkButton = post.querySelector(".bookmarkButton");
    const commentArea = post.querySelector(".commentTextArea");
    const sendQuickComment = post.querySelector(".sendQuickComment");
    const likeCounter = post.querySelector(".likeCounter");
    const postID = post.getAttribute("data-post-id");

    //Event listeners

    //Like and unlike post
    likeButton.addEventListener("click", function (event) {
      const didLike =
        event.currentTarget.children[0].classList.contains("like");
      if (didLike) {
        likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"
                        class="bi bi-heart postInteraction" viewBox="0 0 16 16">
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>`;
        likeCounter.innerHTML = Number(likeCounter.innerHTML) - 1;
      } else {
        likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-heart-fill like" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                      </svg>`;
        likeCounter.innerHTML = Number(likeCounter.textContent) + 1;
      }
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

    //Send user to the profile of the sender
    uploader.addEventListener("click", function () {});

    //Show the list of people who liked the post
    likeCounter.addEventListener("click", function () {
      console.log(postID);
    });
  });
});

//Better this
function postAge(timestamp) {
  const timeDiffInSec = (new Date() - new Date(timestamp)) / 1000;

  const minute = Math.floor(timeDiffInSec / 60);
  const hour = Math.floor(timeDiffInSec / (60 * 60));
  const days = Math.floor(timeDiffInSec / (60 * 60 * 24));
  const months = Math.floor(timeDiffInSec / (60 * 60 * 24 * 30));

  console.log(days);

  if (hour == 0) {
    return minute + " mins";
  } else if (days == 0) {
    return hour + " hr";
  } else if (months == 0) {
    return days + " days";
  } else {
    return months + " months";
  }
}
