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

    const template = Handlebars.templates["profile"];

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const profileUsername = params.username;
    const profileUserID = profileUsername
      ? await getUserID(profileUsername)
      : userID;

    // Fetching the posts for the user
    console.log(profileUserID);
    const data = await getProfile(userID, profileUserID);

    // Logging fetched data for debugging purposes
    console.log(data);

    // Compiling the template with the fetched data
    const htmlOutput = template(data);

    // Injecting the rendered HTML into the DOM
    document.getElementById("contentPage").innerHTML = htmlOutput;
  } catch (error) {
    console.error("Error fetching posts or rendering template:", error);
  }
});
