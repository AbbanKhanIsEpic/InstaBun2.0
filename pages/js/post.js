document.addEventListener("DOMContentLoaded", function () {
  // Get the template source
  const templateSource = document.getElementById("post-template").innerHTML;

  // Compile the template
  const template = Handlebars.compile(templateSource);

  // Define the data
  const data = {
    post: [
      {
        name: "Hi",
        profileLink:
          "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=876&h=493&crop=1",
        postAge: "17h",
        isVideo: 0,
        mediaSrc:
          "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
        numOfLikes: 100000,
        description: "Look at my beutifical cat :D",
      },
      {
        name: "Hello World",
        profileLink: "https://github.com/mdo.png",
        postAge: "20h",
        isVideo: 1,
        mediaSrc:
          "https://firebasestorage.googleapis.com/v0/b/cogent-osprey-390319.appspot.com/o/video%2FP1%3A6?alt=media&token=c6fc3d02-cb0a-48a6-a5dc-439bf66cccae",
        numOfLikes: 100,
        description: "Stolen Video >:D",
      },
    ],
  };

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  document.getElementById("posts").innerHTML = htmlOutput;
});
