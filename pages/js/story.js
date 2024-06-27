document.addEventListener("DOMContentLoaded", function () {
  // Get the template source
  const templateSource = document.getElementById("story-template").innerHTML;

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
            isVideo: 1,
            url: "https://firebasestorage.googleapis.com/v0/b/cogent-osprey-390319.appspot.com/o/video%2FP1%3A6?alt=media&token=c6fc3d02-cb0a-48a6-a5dc-439bf66cccae",
          },
          {
            isVideo: 0,
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
            isVideo: 0,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
            isVideo: 0,
            url: "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
          },
        ],
      },
      {
        profileLink: "https://github.com/mdo.png",
        stories: [
          {
            isVideo: 0,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
            isVideo: 0,
            url: "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
          },
        ],
      },
      {
        id: 99,
        profileLink: "https://github.com/mdo.png",
        stories: [
          {
            isVideo: 0,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
            isVideo: 0,
            url: "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
          },
        ],
      },
      {
        id: 100,
        profileLink: "https://github.com/mdo.png",
        stories: [
          {
            isVideo: 0,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
            isVideo: 0,
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
            isVideo: 0,
            url: "https://cdn.theatlantic.com/thumbor/fWHNkP-IHxWP4gyI87XDAaiKPFU=/0x62:2000x1187/976x549/media/img/mt/2018/03/AP_325360162607/original.jpg",
          },
          {
            isVideo: 0,
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

  // Insert the HTML into the DOM
  document.getElementById("stories").innerHTML = htmlOutput;

  const storiesModal = document.getElementsByClassName("modal");

  Array.from(storiesModal).forEach((modal) => {
    modal.addEventListener("hidden.bs.modal", function (event) {
      const videos = modal.querySelectorAll("video");
      for (const video of videos) {
        video.currentTime = 0;
        video.pause();
      }
    });
  });
});
