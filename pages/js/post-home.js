let messageTextArea;

document.addEventListener("DOMContentLoaded", function () {
  //Helper
  Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  // Compile the template
  const template = Handlebars.templates["post-home"];

  // Define the data
  const data = {
    post: [
      {
        id: 1,
        name: "Hi",
        profileLink:
          "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=876&h=493&crop=1",
        postAge: "17h",
        isVideo: 0,
        mediaSrc:
          "https://people.com/thmb/wJx2vVl2-Yrf71f_flBx91f77GE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123):format(webp)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg",
        likeCount: 100000,
        description: "Look at my beutifical cat :D",
        commentCount: 9999,
        like: 1,
        bookmark: 0,
      },
      {
        id: 4,
        name: "Hello World",
        profileLink: "https://github.com/mdo.png",
        postAge: "20h",
        isVideo: 1,
        mediaSrc:
          "https://firebasestorage.googleapis.com/v0/b/cogent-osprey-390319.appspot.com/o/video%2FP1%3A6?alt=media&token=c6fc3d02-cb0a-48a6-a5dc-439bf66cccae",
        likeCount: 100,
        description: "Stolen Video >:D",
        commentCount: 1,
        like: 0,
        bookmark: 1,
      },
    ],
  };

  // Render the template with data
  const htmlOutput = template(data);

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
    const likeCounter = post.querySelector("div:has(> .likeCounter)");
    const emojiBtn = post.querySelector(".emojiBtn");
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
        likeCounter.innerHTML = Number(likeCounter.innerHTML) + 1;
      }
    });

    //Bookmark and unbookmark
    bookmarkButton.addEventListener("click", function (event) {});

    emojiBtn.addEventListener("click", function () {
      messageTextArea = commentArea;
    });

    //Typing a quick comment -> changing the span display value
    commentArea.addEventListener("input", function () {
      const comment = commentArea.innerHTML;
      if (comment == 0) {
        sendQuickComment.classList.add("d-none");
      } else {
        sendQuickComment.classList.remove("d-none");
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
