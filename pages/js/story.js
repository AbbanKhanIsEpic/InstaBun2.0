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
  let data = {
    users: [
      {
        id: 1,
        username: "MR BA",
        profileLink:
          "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=876&h=493&crop=1",
        stories: [
          {
            isVideo: true,
            url: "https://firebasestorage.googleapis.com/v0/b/cogent-osprey-390319.appspot.com/o/video%2FP1%3A6?alt=media&token=c6fc3d02-cb0a-48a6-a5dc-439bf66cccae",
          },
          {
            isVideo: false,
            url: "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
          },
          {
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
            isVideo: false,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
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
            isVideo: false,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
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
            isVideo: false,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
            isVideo: false,
            url: "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
          },
        ],
      },
    ],
  };

  const totalStories = data.users.length > 8;

  data.storiesOverflow = totalStories;

  // Render the template with data
  const htmlOutput = template(data);

  const storyContainer = document.getElementById("stories");
  storyContainer.innerHTML = htmlOutput;

  const storiesModal = document.getElementsByClassName("modal");
  const stories = document.getElementsByClassName("story-icon");

  let slideInterval = null;

  rightArrow.addEventListener("click", function () {
    console.log(
      storyContainer.scrollLeft !=
        storyContainer.scrollWidth - storyContainer.offsetWidth
    );
    if (
      leftArrow.classList.contains("pointer") &&
      rightArrow.classList.contains("pointer") &&
      storyContainer.scrollLeft !=
        storyContainer.scrollWidth - storyContainer.offsetWidth
    ) {
      clearInterval(slideInterval);
      rightArrow.classList.toggle("pointer");
      leftArrow.classList.toggle("pointer");
      const startingPosition = storyContainer.scrollLeft;
      slideInterval = setInterval(function () {
        if (storyContainer.scrollLeft - startingPosition >= 460) {
          rightArrow.classList.toggle("pointer");
          leftArrow.classList.toggle("pointer");
          clearInterval(slideInterval);
        } else {
          storyContainer.scrollLeft += 1;
        }
      }, 0);
    }
  });

  //Need to revamp it
  //Poor use of logic here
  leftArrow.addEventListener("click", function () {
    if (
      leftArrow.classList.contains("pointer") &&
      rightArrow.classList.contains("pointer") &&
      storyContainer.scrollLeft != 0
    ) {
      clearInterval(slideInterval);
      rightArrow.classList.toggle("pointer");
      leftArrow.classList.toggle("pointer");
      const startingPosition = storyContainer.scrollLeft;
      slideInterval = setInterval(function () {
        if (startingPosition - storyContainer.scrollLeft >= 460) {
          rightArrow.classList.toggle("pointer");
          leftArrow.classList.toggle("pointer");
          clearInterval(slideInterval);
        } else {
          storyContainer.scrollLeft -= 1;
        }
      }, 0);
    }
  });

  Array.from(storiesModal).forEach((modal) => {
    const carouselInner = modal.querySelector(".carousel-inner");
    const rightStory = modal.querySelector(".rightStory");
    const leftStory = modal.querySelector(".leftStory");
    const lastIndex = carouselInner.childElementCount - 1;
    const customCarouselIndicator = modal.getElementsByClassName(
      "custom-carousel-indicator"
    );

    rightStory.addEventListener("click", function () {
      for (let index = 0; index < lastIndex; index++) {
        const currentStory = carouselInner.children[index];
        if (currentStory.classList.contains("active")) {
          carouselInner.children[index + 1].classList.toggle("active");
          customCarouselIndicator[index + 1].classList.add("active");
          currentStory.classList.toggle("active");
          if (index == 0) {
            leftStory.classList.toggle("visually-hidden");
          }
          if (index + 1 == lastIndex) {
            rightStory.classList.toggle("visually-hidden");
          }
          break;
        }
      }
    });

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
          break;
        }
      }
    });

    modal.addEventListener("hidden.bs.modal", function (event) {
      const videos = modal.querySelectorAll("video");
      for (const video of videos) {
        video.currentTime = 0;
        video.pause();
      }
    });
  });
});
