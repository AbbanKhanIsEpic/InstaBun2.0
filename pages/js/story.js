const leftArrow = document.querySelector("#leftArrow");
const rightArrow = document.querySelector("#rightArrow");

document.addEventListener("DOMContentLoaded", function () {
  // Get the template source
  const templateSource = document.getElementById("story-template").innerHTML;

  Handlebars.registerHelper("width", function (length) {
    return 100 / length + "%";
  });

  Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  // Compile the template
  const template = Handlebars.compile(templateSource);

  // Define the data
  const data = {
    users: [
      {
        username: "MR BA",
        profileLink:
          "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=876&h=493&crop=1",
        stories: [
          {
            id: 15,
            isVideo: true,
            url: "https://firebasestorage.googleapis.com/v0/b/cogent-osprey-390319.appspot.com/o/video%2FP1%3A6?alt=media&token=c6fc3d02-cb0a-48a6-a5dc-439bf66cccae",
          },
          {
            id: 14,
            isVideo: false,
            url: "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
          },
          {
            id: 11,
            isVideo: false,
            url: "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
          },
        ],
      },
      {
        id: 2,
        username: "TikTok",
        profileLink: "https://github.com/mdo.png",
        stories: [
          {
            id: 110,
            isVideo: false,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
        ],
      },
      {
        id: 99,
        profileLink: "https://github.com/mdo.png",
        stories: [
          {
            id: 10,
            isVideo: false,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
            id: 9,
            isVideo: false,
            url: "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
          },
        ],
      },
      {
        id: 100,
        profileLink: "https://github.com/mdo.png",
        stories: [
          {
            id: 3,
            isVideo: false,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
            id: 4,
            isVideo: false,
            url: "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
          },
        ],
      },
      {
        id: 5,
        profileLink:
          "https://us-tuna-sounds-images.voicemod.net/d679d362-02ae-4036-a039-ba2174ab0231-1670513117620.jpg",
        closeFriend: true,
        stories: [
          {
            id: 1,
            isVideo: false,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
            id: 2,
            isVideo: false,
            url: "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
          },
        ],
      },
    ],
  };

  const doesStoriesOverflow = data.users.length > 10;

  if (!doesStoriesOverflow) {
    rightArrow.classList.add("d-none");
  }

  // Render the template with data
  const htmlOutput = template(data);

  const storyContainer = document.getElementById("stories");
  storyContainer.innerHTML = htmlOutput;

  const storiesModal = document.getElementsByClassName("modal");
  const stories = document.getElementsByClassName("story-icon");

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
