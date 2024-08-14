const leftArrow = document.querySelector("#leftArrow");
const rightArrow = document.querySelector("#rightArrow");

document.addEventListener("DOMContentLoaded", async function () {
  // Get the template source
  const templateSource = document.getElementById("story-template").innerHTML;

  Handlebars.registerHelper("width", function (length) {
    return 100 / length + "%";
  });

  Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    console.log(arg1);
    console.log(arg2);
    console.log(options);
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  // Compile the template
  const template = Handlebars.compile(templateSource);

  const stories = await getStories(userID);

  // Define the data
  const data = { users: stories };

  console.log(data);

  const doesStoriesOverflow = data.users.length > 10;

  if (!doesStoriesOverflow) {
    rightArrow.classList.add("d-none");
  }

  // Render the template with data
  const htmlOutput = template(data);

  const storyContainer = document.getElementById("stories");
  storyContainer.innerHTML = htmlOutput;

  const storiesModal = document.getElementsByClassName("modal");

  function toggleArrows() {
    rightArrow.classList.toggle("pointer");
    leftArrow.classList.toggle("pointer");
  }

  function scrollStoryContainer(direction) {
    const maxScrollLeft =
      storyContainer.scrollWidth - storyContainer.offsetWidth;
    const scrollDistance = 460;
    const targetScrollLeft =
      direction === "right"
        ? Math.min(storyContainer.scrollLeft + scrollDistance, maxScrollLeft)
        : Math.max(storyContainer.scrollLeft - scrollDistance, 0);

    const scrollAnimation = () => {
      if (
        (direction === "right" &&
          storyContainer.scrollLeft < targetScrollLeft) ||
        (direction === "left" && storyContainer.scrollLeft > targetScrollLeft)
      ) {
        storyContainer.scrollLeft += direction === "right" ? 5 : -5;
        requestAnimationFrame(scrollAnimation);
      } else {
        toggleArrows();
      }
      if (storyContainer.scrollLeft == 0) {
        leftArrow.classList.add("d-none");
      } else if (storyContainer.scrollLeft == maxScrollLeft) {
        rightArrow.classList.add("d-none");
      } else {
        leftArrow.classList.remove("d-none");
        rightArrow.classList.remove("d-none");
      }
    };

    scrollAnimation();
  }

  rightArrow.addEventListener("click", function () {
    if (rightArrow.classList.contains("pointer")) {
      toggleArrows();
      scrollStoryContainer("right");
    }
  });

  leftArrow.addEventListener("click", function () {
    if (leftArrow.classList.contains("pointer")) {
      toggleArrows();
      scrollStoryContainer("left");
    }
  });

  Array.from(storiesModal).forEach((modal) => {
    const carouselInner = modal.querySelector(".carousel-inner");
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
          if (currentStory.classList.contains("active")) {
            carouselInner.children[index + 1].classList.add("active");
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
            break;
          }
        }
      });
    }

    if (leftStory != null) {
      leftStory.addEventListener("click", function () {
        for (let index = 1; index <= lastIndex; index++) {
          const currentStory = carouselInner.children[index];
          if (currentStory.classList.contains("active")) {
            carouselInner.children[index - 1].classList.toggle("active");
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
});

async function getStories(userID) {
  const server = `http://127.0.0.1:5000/api/story`;
  const query = `?userID=${encodeURIComponent(userID)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  return result;
}
