//Imports
const express = require("express");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
//Status code
const STATUS_TWO_STEP_REQUIRED = 497;

const { createConnection } = require("./DB.js");

const UserManager = require("./UserManager.js");
const FollowManager = require("./FollowManager.js");
const PostManager = require("./PostManager.js");
const StoryManager = require("./StoryManager.js");
const GroupManager = require("./GroupManager.js");
const CommentManager = require("./CommentManager.js");
const BlockManager = require("./BlockManager.js");
const BookmarkManager = require("./BookmarkManager.js");
const CollectionManager = require("./CollectionManager.js");
const DirectMessageManager = require("./DirectMessageManager.js");
const GroupMessageManager = require("./GroupMessageManager.js");
const EmailManager = require("./EmailManager.js");

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.set("trust proxy", true); //Allow server to get the IP address of user

//Connect to MySQL server
async function connectToDatabase() {
  try {
    await createConnection();
    console.log("Connection to mySQL established");
  } catch (error) {
    // Handle the error appropriately
    console.error("Error connecting to the database:", error);
  }
}

// Call the connectToDatabase function
connectToDatabase();

//All the api end-points
//I have changed it a bit to be closer to what the API is actually doing

//User

//The reasons why I use post instead get
//1) When using the get REST API, the creditional will be in the url part which is bad D:
//2) Industry standard (Ofc what I have here is not really but it is closer to it wih put)

//Checks if user has all creditional is correct and send email if 2STEP is enabled
app.post("/api/user/login", async (req, res) => {
  const { userIdentifier, password } = req.body;
  try {
    const user = new UserManager();
    const loginResult = await user.userLogin(userIdentifier, password);
    if (!loginResult) {
      res.status(401).json({
        error: "Unauthorised",
        message: "Invalid username/email address or password",
      });
    } else {
      const isAuth = await user.checkTwoStepVerificationEnabled(userIdentifier);
      if (isAuth) {
        //Auth is required
        res.status(STATUS_TWO_STEP_REQUIRED).json({
          error: "Login incomplete",
          message: "2-step auth required",
        });
      } else {
        // Login successful
        res.status(200).json({
          message: "Login successful",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error occurred",
    });
  }
});

//Returns the user's display name
app.get("/api/user/displayName", (req, res) => {
  const { userID } = req.query;

  const user = new UserManager();

  user
    .getDisplayName(userID)
    .then((displayName) => {
      res.status(200).send({ displayName: displayName });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Returns if user has been blocked by the other user
app.get("/api/user/isBlocked", (req, res) => {
  const { requestingUserID, targetUserID } = req.query;

  const user = new UserManager();

  user
    .isUserBlocked(requestingUserID, targetUserID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Create an account
app.post("/api/user", (req, res) => {
  const { username, emailAddress, password } = req.body;

  try {
    const user = new UserManager();
    user.createAccount(username, emailAddress, password);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Changes the user's password
app.patch("/api/user/changePassword", (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const user = new UserManager();
    user.changePassword(emailAddress, password);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Error occurred",
    });
  }
});

//Remove the block
app.delete("/api/user/block/:requestingUserID/:targetUserID", (req, res) => {
  const { requestingUserID, targetUserID } = req.params;

  try {
    const blockManager = new BlockManager();
    blockManager.unblock(requestingUserID, targetUserID);
    res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while unblocking the user",
    });
  }
});

app.post("/api/user/block", (req, res) => {
  const { requestingUserID, targetUserID } = req.body;

  try {
    const blockManager = new BlockManager();
    blockManager.block(requestingUserID, targetUserID);
    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while unblocking the user",
    });
  }
});

//Returns if email has been taken
app.get("/api/user/IsEmailTaken", (req, res) => {
  const { email } = req.query;

  const user = new UserManager();

  user
    .isEmailTaken(email)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Returns if username has been taken
app.get("/api/user/isUsernameTaken", (req, res) => {
  const { username } = req.query;

  const user = new UserManager();

  user
    .isUsernameTaken(username)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Returns the user's username
app.get("/api/user/username", (req, res) => {
  const { userID } = req.query;

  const user = new UserManager();

  user
    .getUsername(userID)
    .then((username) => {
      res.status(200).send({ username: username });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Returns the user's userID
app.get("/api/user/userID", (req, res) => {
  const { userIdentifier } = req.query;

  const user = new UserManager();

  user
    .getUserID(userIdentifier)
    .then((userID) => {
      res.status(200).send(userID);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/user/userInfo", async (req, res) => {
  const { userID } = req.query;

  const userManager = new UserManager();

  try {
    const profile = await userManager.getProfile(userID);
    const is2StepEnabled = await userManager.checkTwoStepVerificationEnabled(
      profile["username"]
    );
    const dmLimit = await userManager.getDMLimit(userID);

    console.log(is2StepEnabled);

    profile["is2StepEnabled"] = is2StepEnabled;
    profile["dmLimit"] = dmLimit;

    res.status(200).send(profile);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while retrieving user information" });
  }
});

//Returns a list of user filtered by page number, skip and key word (what username or display name  contain)
app.get("/api/user/search", (req, res) => {
  const { searchQuery, userID } = req.query;

  const user = new UserManager();

  try {
    user
      .getListOfUsers(searchQuery, userID)
      .then((jsonifiedResult) => {
        res.status(200).send({ users: jsonifiedResult });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error occurred");
      });
  } catch (error) {
    console.error("Synchronous error:", error);
    res.status(500).send("Unexpected error occurred");
  }
});

//Returns a list of users recommended to the user
app.get("/api/user/recommended", async (req, res) => {
  const { type, userID } = req.query;

  const user = new UserManager();

  try {
    if (type == "mutual") {
      const mutuals = await user.getMutualAcquaintance(userID);
      if (mutuals && mutuals.length > 0) {
        return res.status(200).json({
          type: "mutual",
          users: mutuals,
        });
      } else {
        const popular = await user.getPopularUsers(userID);
        return res.status(200).json({
          type: "popular",
          users: popular,
        });
      }
    } else if (type == "popular") {
      const popular = await user.getPopularUsers(userID);
      return res.status(200).json({
        type: "popular",
        users: popular,
      });
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }
  } catch (error) {
    console.error("Synchronous error:", error);
    res.status(500).send("Unexpected error occurred");
  }
});

app.get("/api/user/profile", async (req, res) => {
  const { requestingUserID, targetUserID } = req.query;

  // Validate user IDs
  if (!requestingUserID || !targetUserID) {
    return res.status(400).json({ message: "Invalid user IDs provided" });
  }

  try {
    const userManager = new UserManager();
    const followManager = new FollowManager();
    const storyManager = new StoryManager();
    const blockManager = new BlockManager();
    const directMessageManager = new DirectMessageManager();
    const collectionManager = new CollectionManager();
    const postManager = new PostManager();

    const profileData = await userManager.getProfile(targetUserID);

    const isSelfRequest = requestingUserID === targetUserID;

    const additionalData = await Promise.all([
      isSelfRequest
        ? null
        : followManager.isFollowing(requestingUserID, targetUserID),
      isSelfRequest
        ? null
        : blockManager.isUserBlocked(targetUserID, requestingUserID),
      isSelfRequest
        ? null
        : directMessageManager.canUserMessage(requestingUserID, targetUserID),
      isSelfRequest
        ? addDetails(collectionManager.getUserCollections(targetUserID))
        : addDetails(collectionManager.getPublicCollections(targetUserID)),
      postManager.getProfilePost(requestingUserID, targetUserID),
      followManager.getTotalFollowing(targetUserID),
      followManager.getTotalFollowers(targetUserID),
    ]);

    async function addDetails(dataPromise) {
      const data = await dataPromise;
      if (!data || data.length === 0) {
        return [];
      }

      const promises = data.map(async (collection) => {
        const storyIDs = await collectionManager.getStoryIDs(
          collection?.["collectionID"]
        );

        if (!storyIDs || storyIDs.length === 0) {
          return { ...collection, stories: [] };
        }

        const storiesWithDetails = await storyManager.getStories(
          targetUserID,
          storyIDs
        );
        return { ...collection, stories: storiesWithDetails[0]?.stories || [] };
      });

      return Promise.all(promises);
    }

    const [
      isFollowing,
      hasBlockedUser,
      canMessage,
      collections,
      posts,
      totalFollowings,
      totalFollowers,
    ] = additionalData;

    const responseData = {
      ...profileData,
      isFollowing: isSelfRequest ? null : isFollowing,
      hasBlockedUser: isSelfRequest ? null : hasBlockedUser,
      canMessage: isSelfRequest ? null : canMessage,
      collections,
      posts,
      totalFollowings,
      totalFollowers,
    };

    return res.json(responseData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      error: error.message || "Internal Server Error",
      message: "Error occurred while getting the user's profile",
    });
  }
});

//Returns user's profile icon
app.get("/api/user/profileIcon", (req, res) => {
  const { userID } = req.query;

  const user = new UserManager();

  user
    .getProfileIcon(userID)
    .then((profileIconLink) => {
      res.status(200).send({ profileIcon: profileIconLink });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Returns user's dm limit
app.get("/api/user/dmlimit", (req, res) => {
  const { userID } = req.query;

  const user = new UserManager();

  user
    .getDMLimit(userID)
    .then((dmLimit) => {
      res.status(200).send({ DMLimit: dmLimit });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Update user's profile
app.patch("/api/user/profile", upload.single("file"), async (req, res) => {
  try {
    const jsonData = req.body.jsonData ? JSON.parse(req.body.jsonData) : {};

    if (!jsonData || Object.keys(jsonData).length === 0) {
      return res.status(400).json({
        message: "Error occurred, did not receive jsonData",
      });
    }

    const { userID, displayName, bio, dmLimit, auth } = jsonData;

    const file = req.file ? req.file : null;

    const user = new UserManager();

    // Await the asynchronous update operation
    if (file != null) {
      await user.updateProfileIcon(userID, file);
    }

    await user.updateProfile(userID, displayName, bio, dmLimit, auth);

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    // Handle errors and send appropriate response
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

//Returns user's email address
app.get("/api/user/email", (req, res) => {
  const { username } = req.query;

  const user = new UserManager();

  user
    .getEmail(username)
    .then((jsonifiedResult) => {
      res.status(200).send({
        email: jsonifiedResult,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Sending email
//Send email because of 2Step
app.post("/api/email/auth", async (req, res) => {
  const { email, code, location } = req.body;

  try {
    const emailManager = new EmailManager();
    await emailManager.auth(email, code, location);
    res.status(200).json({ message: "Complete" });
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error occurred",
    });
  }
});

//Send email to finalise account creation
app.post("/api/email/creation", async (req, res) => {
  const { email, code, location } = req.body;

  console.log(email, code, location);

  try {
    const emailManager = new EmailManager();
    await emailManager.createAccount(email, code, location);
    res.status(200).json({ message: "Complete" });
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error occurred",
    });
  }
});

//Send email to change user's password
app.post("/api/email/changePassword", async (req, res) => {
  const { email, code, location } = req.body;

  try {
    const emailManager = new EmailManager();
    await emailManager.passwordChange(email, code, location);
    res.status(200).json({ message: "Complete" });
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error occurred",
    });
  }
});

//Follow
//Returns true or false if the reqesting user is following the target user
app.get("/api/follow/isFollowing", (req, res) => {
  const { requestingUserID, targetUserID } = req.query;

  const follow = new FollowManager();

  follow
    .isFollowing(requestingUserID, targetUserID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Return the list of followers of the target user
app.get("/api/follow/followerList", async (req, res) => {
  const { requestingUserID, targetUserID } = req.query;

  const followManager = new FollowManager();
  const userManager = new UserManager();

  try {
    const followingIDs = await followManager.getFollowers(targetUserID);
    const promises = followingIDs.map(async (userID) => {
      const [username, displayName, profileIcon, isFollowing] =
        await Promise.all([
          userManager.getUsername(userID),
          userManager.getDisplayName(userID),
          userManager.getProfileIcon(userID),
          followManager.isFollowing(requestingUserID, userID),
        ]);
      return {
        userID: userID,
        username: username,
        displayName: displayName,
        profileIcon: profileIcon,
        isFollowing: isFollowing,
      };
    });

    const data = await Promise.all(promises);
    console.log(data);
    res.status(200).send(data); // Ensure data is returned to the client
  } catch (error) {
    res.status(500).send({
      error: error.message || error,
      message: "Error occurred",
    });
  }
});

//Returns the list of following of the target user
app.get("/api/follow/followingList", async (req, res) => {
  const { requestingUserID, targetUserID } = req.query;

  const followManager = new FollowManager();
  const userManager = new UserManager();

  try {
    const followingIDs = await followManager.getFollowings(targetUserID);
    const promises = followingIDs.map(async (userID) => {
      const [username, displayName, profileIcon, isFollowing] =
        await Promise.all([
          userManager.getUsername(userID),
          userManager.getDisplayName(userID),
          userManager.getProfileIcon(userID),
          followManager.isFollowing(requestingUserID, userID),
        ]);
      return {
        userID: userID,
        username: username,
        displayName: displayName,
        profileIcon: profileIcon,
        isFollowing: isFollowing,
      };
    });

    const data = await Promise.all(promises);
    console.log(data);
    res.status(200).send(data); // Ensure data is returned to the client
  } catch (error) {
    res.status(500).send({
      error: error.message || error,
      message: "Error occurred",
    });
  }
});

//
app.post("/api/follow", async (req, res) => {
  const { requestingUserID, targetUserID } = req.body;

  try {
    const follow = new FollowManager();
    const result = await follow.follow(requestingUserID, targetUserID);
    console.log(result);
    res.status(result.status).send(result.message);
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error occurred",
    });
  }
});

app.delete("/api/follow/:requestingUserID/:targetUserID", async (req, res) => {
  const { requestingUserID, targetUserID } = req.params;

  const follow = new FollowManager();
  try {
    await follow.unfollow(requestingUserID, targetUserID);
    res.status(200).send({ message: "Unfollow completed" });
  } catch (error) {
    res.status(500).send({
      error: error.message || error,
      message: "Error occurred",
    }); // Send error response in case of failure
  }
});

//Post
app.get("/api/post/followings", (req, res) => {
  const { userID } = req.query;

  const post = new PostManager();

  post
    .getFollowingPost(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/post", upload.single("file"), async (req, res) => {
  const file = req.file;
  console.log(file);
  const jsonData = req.body.jsonData ? JSON.parse(req.body.jsonData) : {};

  if (jsonData.length == 0) {
    res.status(500).send({
      error: error,
      message: "Error occurred, did not recieve jsonData",
    });
  }
  const userID = jsonData.userID;
  const description = jsonData.description;
  const visibility = jsonData.visibility;
  const tags = jsonData.tags;

  try {
    const post = new PostManager();
    await post.upload(userID, file, tags, description, visibility);
    res.status(200).json({ message: "Complete post upload" });
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error occurred",
    });
  }
});

app.patch("/api/post", async (req, res) => {
  const { postID, tags, description, visibility } = req.body;

  const postManager = new PostManager();

  try {
    await postManager.updatePost(postID, tags, description, visibility);

    res.status(200).json({ message: "Complete post upload" });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).send("An error occurred while updating the post.");
  }
});

app.get("/api/post/search", (req, res) => {
  const { userID, tags } = req.query;

  console.log(tags);

  const post = new PostManager();

  post
    .getPostViaTags(userID, tags)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/post/recommend", async (req, res) => {
  const { userID } = req.query;

  const post = new PostManager();

  try {
    const result = await post.getUserRecommendation(userID);

    console.log(!result || !result.length);

    if (!result || !result.length) {
      const mostPopular = await post.getGeneralReccomendation(userID);
      console.log(mostPopular);
      return res.status(200).send(mostPopular);
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send("Error occurred");
  }
});

app.get("/api/post/select", (req, res) => {
  const { userID, postID } = req.query;

  const post = new PostManager();

  post
    .getSingularPost(userID, postID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/post/user", (req, res) => {
  const { userID } = req.query;

  const post = new PostManager();

  post
    .getUserPosts(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/post/like", (req, res) => {
  const postID = req.body.postID;
  const userID = req.body.userID;

  const post = new PostManager();
  post.like(postID, userID);

  res.json({ message: "Data received and processed successfully" });
});

app.get("/api/post/like", (req, res) => {
  const { userID, postID } = req.query;

  const post = new PostManager();

  post
    .getLikedList(postID, userID)
    .then((jsonifiedResult) => {
      res.status(200).send({ users: jsonifiedResult });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.delete("/api/post/like/:postID/:userID", (req, res) => {
  const { postID, userID } = req.params;
  const post = new PostManager();

  try {
    post.unlike(postID, userID);

    res.json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while removing the dislike",
    });
  }
});

app.get("/api/post/share", (req, res) => {
  const { userID, postID } = req.query;

  const post = new PostManager();

  post
    .hasShared(userID, postID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/post/share", async (req, res) => {
  const { userID, postID } = req.body;

  try {
    const post = new PostManager();
    const result = await post.share(userID, postID);
    res.status(result.status).send(result.message);
  } catch (error) {
    return error;
  }
});

//Story
app.post("/api/story", upload.single("file"), async (req, res) => {
  try {
    const jsonData = req.body.jsonData ? JSON.parse(req.body.jsonData) : {};

    if (!jsonData || Object.keys(jsonData).length === 0) {
      return res.status(400).json({
        message: "Error occurred, did not receive jsonData",
      });
    }

    const { userID, visibility } = jsonData;
    const story = new StoryManager();

    await story.upload(userID, req.file, visibility);
    res.status(200).json({ message: "Complete story upload" });
  } catch (error) {
    console.error("Error uploading story:", error);
    res.status(500).send({
      error: error.message || error,
      message: "Error occurred while uploading story",
    });
  }
});

app.get("/api/story/following", (req, res) => {
  const { userID } = req.query;

  const storyManager = new StoryManager();

  storyManager
    .getFollowingStory(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/story/user", (req, res) => {
  const { userID } = req.query;

  const storyManager = new StoryManager();

  storyManager
    .getUserStories(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.patch("/api/story/visibility", async (req, res) => {
  const { storyID, visibility } = req.body;

  const storyManager = new StoryManager();

  try {
    await storyManager.setVisibility(storyID, visibility);
    res
      .status(200)
      .json({ message: "Story's visibility successfully updated" });
  } catch (error) {
    console.error("Error transferring ownership:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
});

//Message
app.get("/api/message/list", async (req, res) => {
  const { userID } = req.query;

  const directMessageManager = new DirectMessageManager();
  const groupManager = new GroupManager();

  try {
    const directList = await directMessageManager.getDirectList(userID);

    console.log(directList);

    const directPromises = directList.map(async (element) => {
      element["isGroup"] = false;
    });

    const groupList = await groupManager.getGroupList(userID);

    const groupPromises = groupList.map(async (element) => {
      element["isGroup"] = true;
    });

    await Promise.all([directPromises, groupPromises]);

    const combinedList = directList.concat(groupList);

    combinedList.sort((a, b) => new Date(b["time"]) - new Date(a["time"]));

    res.status(200).send(combinedList);
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while getting list",
    });
  }
});

app.get("/api/message/hiddenList", async (req, res) => {
  const { userID } = req.query;

  const directMessageManager = new DirectMessageManager();

  try {
    const directList = await directMessageManager.getHiddenList(userID);

    const directPromises = directList.map(async (element) => {
      element["isGroup"] = false;
    });

    await Promise.all([directPromises]);

    directList.sort((a, b) => new Date(b["time"]) - new Date(a["time"]));

    res.status(200).send(directList);
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while getting list",
    });
  }
});

app.get("/api/message/direct", (req, res) => {
  const { requestingUserID, targetUserID } = req.query;

  const directMessageManager = new DirectMessageManager();

  directMessageManager
    .getMessage(requestingUserID, targetUserID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/message/group", (req, res) => {
  const { userID, groupID } = req.query;

  const groupMessageManager = new GroupMessageManager();

  groupMessageManager
    .getMessage(userID, groupID)
    .then((jsonifiedResult) => {
      console.log(jsonifiedResult);
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Delete direct message
app.delete("/api/message/direct/:messageID", (req, res) => {
  const { messageID } = req.params;

  const directMessageManager = new DirectMessageManager();

  directMessageManager
    .deleteMessage(messageID)
    .then((jsonifiedResult) => {
      console.log(jsonifiedResult);
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/message/direct", (req, res) => {
  const { senderID, receiverID, message } = req.body;

  const directMessageManager = new DirectMessageManager();

  try {
    directMessageManager.sendMessage(senderID, receiverID, message);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while sending a direct message",
    });
  }
});

app.post("/api/message/group", (req, res) => {
  const { groupID, senderID, message } = req.body;

  const groupMessageManager = new GroupMessageManager();

  try {
    groupMessageManager.sendMessage(senderID, groupID, message);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while sending a group message",
    });
  }
});

app.post("/api/message/group/clear", (req, res) => {
  const { userID, groupID } = req.body;

  const groupMessageManager = new GroupMessageManager();

  try {
    groupMessageManager.clearMessage(userID, groupID);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while sending a group message",
    });
  }
});

app.post("/api/message/direct/clear", (req, res) => {
  const { senderID, receiverID } = req.body;

  const directMessageManager = new DirectMessageManager();

  try {
    directMessageManager.clearMessage(senderID, receiverID);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while sending a group message",
    });
  }
});

app.delete("/api/message/group/:messageID", (req, res) => {
  const { messageID } = req.params;

  const groupMessageManager = new GroupMessageManager();

  groupMessageManager
    .deleteMessage(messageID)
    .then((jsonifiedResult) => {
      console.log(jsonifiedResult);
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Group
app.get("/api/group/groupMembers", async (req, res) => {
  const { groupID } = req.query;

  const groupManager = new GroupManager();

  groupManager
    .getGroupMembers(groupID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/group/owner", async (req, res) => {
  const { groupID } = req.query;

  const groupManager = new GroupManager();

  groupManager
    .getOwnerID(groupID)
    .then((jsonifiedResult) => {
      res.status(200).send({ ownerID: jsonifiedResult });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.patch("/api/group/transferOwnership", async (req, res) => {
  const { groupID, newOwnerID } = req.body;

  const groupManager = new GroupManager();

  try {
    await groupManager.transferOwnership(groupID, newOwnerID);
    res.status(200).json({ message: "Ownership transferred successfully" });
  } catch (error) {
    console.error("Error transferring ownership:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
});

app.patch("/api/group/groupTitle", async (req, res) => {
  const { groupID, groupName } = req.body;

  const groupManager = new GroupManager();

  try {
    await groupManager.updateGroupName(groupName, groupID);
    res.status(200).json({ message: "Group title successfully updated" });
  } catch (error) {
    console.error("Error updating group title:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
});

app.patch("/api/group/icon", upload.single("file"), async (req, res) => {
  const jsonData = req.body.jsonData ? JSON.parse(req.body.jsonData) : {};

  if (!jsonData || Object.keys(jsonData).length === 0) {
    return res.status(400).json({
      message: "Error occurred, did not receive jsonData",
    });
  }

  const { groupID } = jsonData;

  const groupManager = new GroupManager();

  try {
    await groupManager.updateGroupIcon(req.file, groupID);
    res.status(200).json({ message: "Group icon successfully updated" });
  } catch (error) {
    console.error("Error transferring ownership:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
});

app.post("/api/group/member", async (req, res) => {
  const { groupID, userID } = req.body;

  const groupManager = new GroupManager();

  try {
    await groupManager.addMember(groupID, userID);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while adding member to group",
    });
  }
});

app.delete("/api/group/member/:groupID/:userID", async (req, res) => {
  const { groupID, userID } = req.params;

  const groupManager = new GroupManager();

  try {
    await groupManager.removeMember(groupID, userID);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while removing the member from group",
    });
  }
});

app.delete("/api/group", async (req, res) => {
  const { groupID } = req.query;

  const groupManager = new GroupManager();

  try {
    await groupManager.deleteGroup(groupID);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while deleting the group",
    });
  }
});

app.post("/api/group", upload.single("file"), async (req, res) => {
  const file = req.file;
  const jsonData = req.body.jsonData ? JSON.parse(req.body.jsonData) : {};

  const groupMemebers = jsonData.groupMembers;
  const groupName = jsonData.groupName;
  const ownerID = jsonData.ownerID;

  const groupManager = new GroupManager();

  try {
    await groupManager.createGroup(ownerID, groupName, file, groupMemebers);

    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while creating the group",
    });
  }
});

//Comment
//Save record that user liked the comment
app.post("/api/comment/like", async (req, res) => {
  const { userID, commentID } = req.body;

  const commentManager = new CommentManager();

  try {
    await commentManager.like(commentID, userID);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while removing the dislike",
    });
  }
});

//Remove record that user liked the comment
app.delete("/api/comment/like/:userID/:commentID", async (req, res) => {
  const { userID, commentID } = req.params;

  const commentManager = new CommentManager();

  try {
    await commentManager.removeLike(commentID, userID);
    res.json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while removing the dislike",
    });
  }
});

//Save record that user dislike the comment
app.post("/api/comment/dislike", async (req, res) => {
  const { userID, commentID } = req.body;

  const commentManager = new CommentManager();

  try {
    await commentManager.dislike(commentID, userID);
    res.status(200).json({ message: "Comment disliked successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while removing the dislike",
    });
  }
});

//Remove the record that user dislike the comment
app.delete("/api/comment/dislike/:userID/:commentID", async (req, res) => {
  const { userID, commentID } = req.params;

  const commentManager = new CommentManager();

  try {
    await commentManager.removeDislike(commentID, userID);
    res.status(200).json({ message: "Remove comment dislike successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while removing the dislike",
    });
  }
});

app.post("/api/comment", (req, res) => {
  try {
    const postID = req.body.postID;
    const userID = req.body.userID;
    const comment = req.body.comment;

    console.log("Hello");

    const commentManager = new CommentManager();
    commentManager.addComment(postID, userID, comment);

    res.json({ message: "Data received and processed successfully" });
  } catch (error) {
    return error;
  }
});

app.delete("/api/comment/:commentID", (req, res) => {
  const { commentID } = req.params;
  try {
    const commentManager = new CommentManager();
    commentManager.removeComment(commentID);

    res.json({ message: "Data received and processed successfully" });
  } catch (error) {
    return error;
  }
});

app.get("/api/comment", (req, res) => {
  const { postID, userID } = req.query;

  const commentManager = new CommentManager();

  commentManager
    .getComments(postID, userID)
    .then((jsonifiedResult) => {
      res.status(200).json(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/collection/user", async (req, res) => {
  const { userID } = req.query;

  const collectionManager = new CollectionManager();
  const storyManager = new StoryManager(); // Ensure storyManager is instantiated

  try {
    // Await addDetails as it returns a promise
    const collections = await addDetails(
      collectionManager.getUserCollections(userID)
    );

    // Function to add story details to each collection
    async function addDetails(dataPromise) {
      const data = await dataPromise; // Await the promise here
      if (!data || data.length === 0) {
        return [];
      }

      const promises = data.map(async (collection) => {
        const storyIDs = await collectionManager.getStoryIDs(
          collection?.["collectionID"]
        );

        if (!storyIDs || storyIDs.length === 0) {
          return { ...collection, stories: [] };
        }

        // Use userID instead of undefined targetUserID
        const storiesWithDetails = await storyManager.getStories(
          userID,
          storyIDs
        );
        return { ...collection, stories: storiesWithDetails[0]?.stories || [] };
      });

      return Promise.all(promises);
    }

    // Send the updated collection list
    res.status(200).send(collections);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred");
  }
});

app.post("/api/collection", upload.single("file"), async (req, res) => {
  try {
    const jsonData = req.body.jsonData ? JSON.parse(req.body.jsonData) : {};

    if (!jsonData || Object.keys(jsonData).length === 0) {
      return res.status(400).json({
        message: "Error occurred, did not receive jsonData",
      });
    }

    const { collectionTitle, userID, isPublic } = jsonData;
    const collectionManager = new CollectionManager();

    await collectionManager.create(collectionTitle, userID, req.file, isPublic);
    res.status(200).json({ message: "Complete collection created" });
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).send({
      error: error.message || error,
      message: "Error occurred while creating collection",
    });
  }
});

app.get("/api/collection/list", async (req, res) => {
  const { userID, storyID } = req.query;

  const collectionManager = new CollectionManager();

  try {
    const collections = await collectionManager.getUserCollections(userID);

    const promises = collections.map(async (collection) => {
      const collectionID = collection?.["collectionID"];
      collection["doesContainStory"] =
        await collectionManager.isStoryInCollection(collectionID, storyID);
      return collection;
    });

    const updatedCollections = await Promise.all(promises);

    res.status(200).send(updatedCollections);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred");
  }
});

app.post("/api/collection/story", async (req, res) => {
  try {
    const { collectionID, storyID } = req.body;

    const collectionManager = new CollectionManager();

    await collectionManager.addStory(collectionID, storyID);
    res.status(200).json({ message: "Add story to collection completed" });
  } catch (error) {
    console.error("Error add story to collection:", error);
    res.status(500).send({
      error: error.message || error,
      message: "Error occurred while add story to collection",
    });
  }
});

app.delete("/api/collection/story/:collectionID/:postID", async (req, res) => {
  try {
    const { collectionID, postID } = req.params;

    const collectionManager = new CollectionManager();

    await collectionManager.removeStory(collectionID, postID);
    res.status(200).json({ message: "Remove story from collection completed" });
  } catch (error) {
    console.error("Error removing stories from collection:", error);
    res.status(500).send({
      error: error.message || error,
      message: "Error removing stories from collection",
    });
  }
});

app.get("/api/bookmark/user", (req, res) => {
  const { userID } = req.query;

  const bookmarkManager = new BookmarkManager();

  bookmarkManager
    .getUserBookmarks(userID)
    .then((jsonifiedResult) => {
      res.status(200).json(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/bookmark/post", (req, res) => {
  const { bookmarkID } = req.query;

  const bookmarkManager = new BookmarkManager();

  bookmarkManager
    .getBookmarkedPost(bookmarkID)
    .then((jsonifiedResult) => {
      res.status(200).json(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/bookmark", upload.single("file"), async (req, res) => {
  try {
    const jsonData = req.body.jsonData ? JSON.parse(req.body.jsonData) : {};

    if (!jsonData || Object.keys(jsonData).length === 0) {
      return res.status(400).json({
        message: "Error occurred, did not receive jsonData",
      });
    }

    const { bookmarkTitle, userID } = jsonData;
    const bookmarkManager = new BookmarkManager();

    await bookmarkManager.create(bookmarkTitle, userID, req.file);
    res.status(200).json({ message: "Complete bookmark created" });
  } catch (error) {
    console.error("Error creating bookmark:", error);
    res.status(500).send({
      error: error.message || error,
      message: "Error occurred while creating bookmark",
    });
  }
});

app.post("/api/bookmark/post", async (req, res) => {
  try {
    const { bookmarkID, postID } = req.body;

    const bookmarkManager = new BookmarkManager();

    await bookmarkManager.addPost(bookmarkID, postID);
    res.status(200).json({ message: "Add post to bookmark completed" });
  } catch (error) {
    console.error("Error add posting to bookmark:", error);
    res.status(500).send({
      error: error.message || error,
      message: "Error occurred while add posting to bookmark",
    });
  }
});

app.delete("/api/bookmark/post/:bookmarkID/:postID", async (req, res) => {
  try {
    const { bookmarkID, postID } = req.params;

    const bookmarkManager = new BookmarkManager();

    await bookmarkManager.removePost(bookmarkID, postID);
    res.status(200).json({ message: "Remove post to bookmark completed" });
  } catch (error) {
    console.error("Error removing posting to bookmark:", error);
    res.status(500).send({
      error: error.message || error,
      message: "Error occurred while add removing to bookmark",
    });
  }
});

//Create server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
