document.addEventListener("DOMContentLoaded", function () {
  // Get the template source
  const templateSource = document.getElementById("story-template").innerHTML;

  // Compile the template
  const template = Handlebars.compile(templateSource);

  // Define the data
  let data = {
    story: [
      {
        id: 1,
        profileLink:
          "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=876&h=493&crop=1",
      },
      {
        id: 2,
        profileLink: "https://github.com/mdo.png",
      },
      {
        id: 5,
        profileLink: "https://github.com/mdo.png",
      },
      {
        id: 10,
        profileLink: "https://github.com/mdo.png",
      },
      {
        id: 12,
        profileLink: "https://github.com/mdo.png",
      },
      {
        id: 20,
        profileLink: "https://github.com/mdo.png",
        closeFriend: true,
      },
    ],
  };

  const totalStories = data.story.length > 8;

  data.storiesOverflow = totalStories;
  console.log(data);

  // Render the template with data
  const htmlOutput = template(data);

  // Insert the HTML into the DOM
  document.getElementById("stories").innerHTML = htmlOutput;
});
