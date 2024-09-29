import { likePost, unlikePost, getLikeList } from "./API/post.js";
import { userID } from "./userSession.js";
import { getUserID, getProfile } from "./API/user.js";
import { follow, unfollow } from "./API/follow.js";
import {
  comment,
  getComments,
  like,
  removeLike,
  dislike,
  removeDislike,
  removeComment,
} from "./API/comment.js";

const notActiveLikeComment = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up pointer" viewBox="0 0 16 16"
      >
        <path
          d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
        />
      </svg>`;

const activeLikeComment = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-hand-thumbs-up-fill pointer"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
        />
      </svg>`;

const activeDislikeComment = ` <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-hand-thumbs-down-fill pointer"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"
        />
      </svg>`;

const notActiveDislikeComment = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-hand-thumbs-down pointer"
        viewBox="0 0 16 16"
      >
        <path
          d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"
        />
      </svg>`;

const notActiveLikePost = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"
            class="bi bi-heart postInteraction" viewBox="0 0 16 16">
            <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
        </svg>`;

const activeLikePost = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-heart-fill like" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
          </svg>`;

const postModal = document.getElementById("post");

//For deleting comment
let deleteCommentID = null;

document.addEventListener("DOMContentLoaded", async function () {
  try {
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

    const profileTemplate = Handlebars.templates["profile"];

    const collectionTemplate = Handlebars.templates["collection"];

    const postsTemplate = Handlebars.templates["post-profile"];

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const profileUsername = params.username;
    const profileUserID = profileUsername
      ? await getUserID(profileUsername)
      : userID;

    const data = await getProfile(userID, profileUserID);

    const collections = { collections: data["collections"] };

    collections["username"] = data["username"];

    collections["profileIcon"] = data["profileIcon"];

    const postsData = { posts: data["posts"] };

    const [profileOutput, collectionOutput, postOutput] = await Promise.all([
      profileTemplate(data),
      collectionTemplate(collections),
      postsTemplate(postsData),
    ]);

    document.getElementById("contentPage").innerHTML = profileOutput;

    document.getElementById("collections").innerHTML = collectionOutput;

    document.getElementById("posts").innerHTML = postOutput;

    const storiesModal = document.getElementsByClassName("modal");

    const posts = document.querySelectorAll(".post");

    const followButton = document.querySelector("#followButton");

    const blockButton = document.querySelector("#blockButton");

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
                collections[currentStoriesID]["stories"][nextStoryID][
                  "uploadDate"
                ];
              storyAgeElement.innerHTML = storyAge(nextStoryUploadDate);
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
                collections[currentStoriesID]["stories"][prevStoryID][
                  "uploadDate"
                ];
              storyAgeElement.innerHTML = storyAge(prevStoryUploadDate);
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

    Array.from(posts).forEach((post, index) => {
      post.addEventListener("click", async function () {
        Handlebars.registerHelper("isCurrentUserComment", function (senderID) {
          return senderID == userID;
        });

        Handlebars.registerHelper("commentAge", function (uploadDate) {
          return age(uploadDate);
        });

        const modalTemplate = Handlebars.templates["profile-post-modal-dialog"];

        const postData = postsData["posts"][index];

        postData["username"] = data["username"];

        postData["profileIcon"] = data["profileIcon"];

        const modalOutput = modalTemplate(postData);

        postModal.innerHTML = modalOutput;

        new bootstrap.Modal(postModal).show(); // To show the modal manually

        const likeButton = postModal.querySelector("#likeButton");

        const commentButton = postModal.querySelector("#commentButton");

        populateComments(post.id, userID);

        likeButton.addEventListener("click", async function (event) {
          const didLike =
            event.currentTarget.children[0].classList.contains("like");
          if (didLike) {
            const response = await unlikePost(post.id, userID);
            if (response.status == "200") {
              likeButton.innerHTML = `${notActiveLikePost}`;
            } else {
              alert("Error has occured, try again");
            }
          } else {
            const response = await likePost(post.id, userID);
            if (response.status == "200") {
              likeButton.innerHTML = `${activeLikePost}`;
            } else {
              alert("Error has occured, try again");
            }
          }
        });

        commentButton.addEventListener("click", async function () {
          const commentText = document.querySelector("#commentInput").value;

          if (commentText.length == 0) {
            alert("You have to write something to comment");
            return;
          } else if (commentText.length >= 300) {
            alert("You are over the limit");
            return;
          }
          const status = await comment(post.id, userID, commentText);
          if (status == "200") {
            populateComments(post.id, userID);
          } else {
            alert("Unable to comment, try again");
          }
        });
      });
    });

    followButton.addEventListener("click", async function () {
      const isFollowing = followButton.innerHTML == "Unfollow";
      if (isFollowing) {
        const status = await unfollow(userID, profileUserID);
        if (status == "200") {
          followButton.classList.add("btn-primary");
          followButton.classList.remove("btn-secondary");
          followButton.innerHTML = "Follow";
        } else {
          alert("Unable to unfollow, try again");
        }
      } else {
        const status = await follow(userID, profileUserID);
        if (status == "200") {
          followButton.classList.remove("btn-primary");
          followButton.classList.add("btn-secondary");
          followButton.innerHTML = "Unfollow";
        } else {
          alert("Unable to unfollow, try again");
        }
      }
    });

    // blockButton.addEventListener("click", async function () {
    //   const hasBlocked = blockButton.innerHTML == "Unblock";
    //   if (hasBlocked) {
    //     const status = await unfollow(userID, profileUserID);
    //     if (status == "200") {
    //       followButton.classList.add("btn-primary");
    //       followButton.classList.remove("btn-secondary");
    //       followButton.innerHTML = "Follow";
    //     } else {
    //       alert("Unable to unfollow, try again");
    //     }
    //   } else {
    //     const status = await follow(userID, profileUserID);
    //     if (status == "200") {
    //       followButton.classList.remove("btn-primary");
    //       followButton.classList.add("btn-secondary");
    //       followButton.innerHTML = "Unfollow";
    //     } else {
    //       alert("Unable to unfollow, try again");
    //     }
    //   }
    // });
  } catch (error) {
    console.error("Error fetching posts or rendering template:", error);
  }
});

async function populateComments(postID, userID) {
  const commentTemplate = Handlebars.templates["comment"];

  const commentData = await getComments(postID, userID);

  const commentOutput = commentTemplate({ comments: commentData });

  const comments = postModal.querySelector("#comments");

  comments.innerHTML = commentOutput;

  attachEventHandlersToCommenters(postID);
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

function attachEventHandlersToCommenters(postID) {
  const commentList = postModal.querySelectorAll(".commenter");
  Array.from(commentList).forEach((comment) => {
    const commentID = comment.id;
    console.log(comment);

    const likeElement = comment.querySelector(".commentLike");
    const totalCommentLike = comment.querySelector(".totalCommentLike");

    const dislikeElement = comment.querySelector(".commentDislike");
    const totalCommentDislike = comment.querySelector(".totalCommentDislike");

    const deleteComment = comment.querySelector(".deleteComment");

    likeElement.addEventListener("click", async function () {
      const hasLiked = likeElement.classList.contains("active");
      if (hasLiked) {
        const status = await removeLike(userID, commentID);
        if (status == "200") {
          likeElement.innerHTML = `${notActiveLikeComment}`;
          likeElement.classList.remove("active");
          totalCommentLike.innerHTML = Number(totalCommentLike.innerHTML) - 1;
        } else {
          alert("Unable to remove like, try again");
        }
      } else {
        const status = await like(userID, commentID);
        if (status == "200") {
          likeElement.innerHTML = `${activeLikeComment}`;
          likeElement.classList.add("active");
          totalCommentLike.innerHTML = Number(totalCommentLike.innerHTML) + 1;
          const hasDisliked = dislikeElement.classList.contains("active");
          if (hasDisliked) {
            dislikeElement.innerHTML = `${notActiveDislikeComment}`;
            dislikeElement.classList.remove("active");
            totalCommentDislike.innerHTML =
              Number(totalCommentDislike.innerHTML) - 1;
          }
        } else {
          alert("Unable to like comment, try again");
        }
      }
    });

    dislikeElement.addEventListener("click", async function () {
      const hasDisliked = dislikeElement.classList.contains("active");
      if (hasDisliked) {
        const status = await removeDislike(userID, commentID);
        if (status == "200") {
          dislikeElement.innerHTML = `${notActiveDislikeComment}`;
          dislikeElement.classList.remove("active");
          totalCommentDislike.innerHTML =
            Number(totalCommentDislike.innerHTML) - 1;
        } else {
          alert("Unable to remove dislike, try again");
        }
      } else {
        const status = await dislike(userID, commentID);
        if (status == "200") {
          dislikeElement.innerHTML = `${activeDislikeComment}`;
          dislikeElement.classList.add("active");
          totalCommentDislike.innerHTML =
            Number(totalCommentDislike.innerHTML) + 1;
          const hasLiked = likeElement.classList.contains("active");
          if (hasLiked) {
            likeElement.innerHTML = `${notActiveLikeComment}`;
            likeElement.classList.remove("active");
            totalCommentLike.innerHTML = Number(totalCommentLike.innerHTML) - 1;
          }
        } else {
          alert("Unable to dislike comment, try again");
        }
      }
    });

    if (deleteComment) {
      deleteComment.addEventListener("click", async function () {
        if (deleteCommentID == null || deleteCommentID != commentID) {
          alert("Are you sure? If so, click the bin again");
          deleteCommentID = commentID;
        } else {
          const status = await removeComment(commentID);
          if (status == "200") {
            deleteCommentID = null;
            populateComments(postID, userID);
          } else {
            alert("Unable to delete the comment, try again");
          }
        }
      });
    }
  });
}
