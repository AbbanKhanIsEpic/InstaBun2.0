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
      res.status(200).send({ DisplayName: displayName });
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
app.delete("/api/user/unblock", (req, res) => {
  const requestingUserID = req.body.userID;
  const targetUserID = req.body.profileUserID;

  try {
    const user = new UserManager();
    user.unblock(requestingUserID, targetUserID);
    res.status(200).json({ message: "User unblocked successfully" });
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
      res.status(200).send({ Username: username });
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
    const blockManager = new BlockManager();
    const directMessageManager = new DirectMessageManager();
    const collectionManager = new CollectionManager();
    const postManager = new PostManager();

    const profileData = await userManager.getProfile(targetUserID);

    const additionalData = await Promise.all([
      requestingUserID !== targetUserID
        ? followManager.isFollowing(requestingUserID, targetUserID)
        : null,
      requestingUserID !== targetUserID
        ? blockManager.isUserBlocked(targetUserID, requestingUserID)
        : null,
      requestingUserID !== targetUserID
        ? directMessageManager.canUserMessage(requestingUserID, targetUserID)
        : null,
      collectionManager.getCollections(requestingUserID, targetUserID),
      postManager.getProfilePost(requestingUserID, targetUserID),
      followManager.getTotalFollowing(targetUserID),
      followManager.getTotalFollowers(targetUserID),
    ]);

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
      isFollowing,
      hasBlockedUser,
      canMessage,
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
    .getUserProfileIconLink(userID)
    .then((profileIconLink) => {
      res.status(200).send({ ProfileIconLink: profileIconLink });
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
app.post("/api/user/profile", (req, res) => {
  const userID = req.body.userID;
  const newDisplayName = req.body.newDisplayName;
  const newBio = req.body.newBio;
  const newProfileIconLink = req.body.newProfileIconLink;
  const newVisibility = req.body.newVisibility;
  const newDMLimit = req.body.newDMLimit;

  const user = new UserManager();
  user.updateProfile(
    userID,
    newDisplayName,
    newBio,
    newProfileIconLink,
    newVisibility,
    newDMLimit
  );
  res.json({ message: "Data received and processed successfully" });
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
  const { toEmail, code, location } = req.body;

  console.log(toEmail, code, location);

  try {
    const emailManager = new EmailManager();
    await emailManager.createAccount(toEmail, code, location);
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
  const { toEmail, code, location } = req.body;

  try {
    const emailManager = new EmailManager();
    await emailManager.passwordChange(toEmail, code, location);
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
app.get("/api/follow/listOfFollowers", (req, res) => {
  const { targetUserID } = req.query;

  const follow = new FollowManager();

  follow
    .getFollowers(targetUserID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Returns the list of following of the target user
app.get("/api/follow/listOfFollowings", (req, res) => {
  const { targetUserID } = req.query;

  const follow = new FollowManager();

  follow
    .getFollowings(targetUserID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//
app.post("/api/follow", (req, res) => {
  const { requestingUserID, targetUserID } = req.body;

  try {
    const follow = new FollowManager();
    follow.follow(requestingUserID, targetUserID);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error occurred",
    });
  }
});

app.delete("/api/follow/:requestingUserID/:targetUserID", (req, res) => {
  const { requestingUserID, targetUserID } = req.params;

  const follow = new FollowManager();
  try {
    follow.unfollow(requestingUserID, targetUserID);
  } catch (error) {
    res.status(500).send({
      error: error.message || error,
      message: "Error occurred",
    });
  }

  res.json({ message: "Data received and processed successfully" });
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

app.get("/api/post/recommend", (req, res) => {
  const { userID } = req.query;

  const post = new PostManager();

  post
    .getPostBasedLike(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
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

app.post("/api/post/share", (req, res) => {
  const userID = req.body.userID;
  const postID = req.body.postID;

  const post = new PostManager();
  post.share(userID, postID);
  res.json({ message: "Data received and processed successfully" });
});

//Story

app.post("/api/story", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

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

app.get("/api/story", (req, res) => {
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

//Message

app.get("/api/message/list", async (req, res) => {
  const { userID } = req.query;

  const directMessageManager = new DirectMessageManager();
  const groupMessageManager = new GroupMessageManager();

  try {
    const directList = await directMessageManager.getDirectList(userID);

    const directPromises = directList.map(async (element) => {
      element["isGroup"] = false;
    });

    const groupList = await groupMessageManager.getGroupList(userID);

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

  try {
    directMessageManager.deleteMessage(messageID);
    res
      .status(200)
      .json({ message: "Data received and processed successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred while deleting a direct message",
    });
  }
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

app.delete("/api/message/group/:messageID", (req, res) => {
  const { messageID } = req.params;

  const groupMessageManager = new GroupMessageManager();

  try {
    groupMessageManager.deleteGroupMessages(messageID);
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

//Group
app.get("/api/group/groupMembers", async (req, res) => {
  const { groupID } = req.query;

  const groupManager = new GroupManager();

  try {
    const jsonifiedResult = await groupManager.getGroupMembers(groupID);
    res.status(200).send(jsonifiedResult);
  } catch (error) {
    console.error("Error retrieving group members:", error);
    res.status(500).json({
      error: error.message || "Internal server error",
      message: "Error occurred while retrieving group members",
    });
  }
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

app.delete("/api/group/member", async (req, res) => {
  const { groupID, userID } = req.query;

  const groupManager = new GroupManager();

  try {
    await groupManager.removeMemeber(groupID, userID);
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
  const { groupID, groupMembers } = req.query;

  const groupManager = new GroupManager();

  try {
    await groupManager.deleteGroup(groupID, groupMembers);
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

//Create server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
