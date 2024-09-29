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
      return storyAge(uploadDate);
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

    const posts = { posts: data["posts"] };

    console.log(posts);

    const [profileOutput, collectionOutput, postOutput] = await Promise.all([
      profileTemplate(data),
      collectionTemplate(collections),
      postsTemplate(posts),
    ]);

    document.getElementById("contentPage").innerHTML = profileOutput;

    document.getElementById("collections").innerHTML = collectionOutput;

    document.getElementById("posts").innerHTML = postOutput;

    const storiesModal = document.getElementsByClassName("modal");

    const postModal = new bootstrap.Modal(document.getElementById("post"));
    postModal.show(); // To show the modal manually

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
  } catch (error) {
    console.error("Error fetching posts or rendering template:", error);
  }
});

function storyAge(timestamp) {
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
