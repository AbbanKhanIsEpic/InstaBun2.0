//Imports
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
//Status code
const STATUS_TWO_STEP_REQUIRED = 497;

const { createConnection } = require("./DB");

const UserManager = require("./UserManager");
const FollowManager = require("./FollowManager");
const PostManager = require("./PostManager");
const StoryManager = require("./StoryManager");
const DirectMessage = require("./DirectMessage");
const GroupManager = require("./GroupManager");
const GroupMessage = require("./GroupMessage");
const CommentManager = require("./CommentManager");
const EmailManager = require("./EmailManager");
const MessageManager = require("./MessageManager");

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.set("trust proxy", true); //Allow server to get the IP address of user

//Connect to MySQL server
async function connectToDatabase() {
  try {
    await createConnection();
    console.log("Connection established");
  } catch (error) {
    // Handle the error appropriately
    console.error("Error connecting to the database:", error);
  }
}

// Call the connectToDatabase function
connectToDatabase();

//All the api end-points

//User
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

app.get("/api/user/isBlock", (req, res) => {
  const { userID, profileUserID } = req.query;

  const user = new UserManager();

  user
    .isUserBlocked(userID, profileUserID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/user/createAccount", (req, res) => {
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

app.post("/api/user/changePassword", (req, res) => {
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

app.post("/api/user/unblock", (req, res) => {
  const userID = req.body.userID;
  const profileUserID = req.body.profileUserID;

  const user = new UserManager();
  user.unblock(userID, profileUserID);
  res.json({ message: "Data received and processed successfully" });
});

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

app.get("/api/user/userID", (req, res) => {
  const { userIdentifier } = req.query;

  const user = new UserManager();

  user
    .getUserID(userIdentifier)
    .then((jsonifiedResult) => {
      console.log(jsonifiedResult);
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/user/search", (req, res) => {
  const { searchQuery, userPerPage, page } = req.query;

  const user = new UserManager();

  try {
    user
      .getListOfUsers(searchQuery, userPerPage, page)
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

app.get("/api/user/profile", (req, res) => {
  const { userID } = req.query;

  const user = new UserManager();

  user
    .getUserProfile(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

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

app.get("/api/user/getEmailAddress", (req, res) => {
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

//Email

app.post("/api/user/sendAuthEmail", async (req, res) => {
  const { toEmail, code, location } = req.body;

  console.log(toEmail, code, location);

  try {
    const emailManager = new EmailManager();
    await emailManager.auth(toEmail, code, location);
    res.status(200).json({ message: "Complete" });
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error occurred",
    });
  }
});

app.post("/api/user/sendCreationCodeEmail", async (req, res) => {
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

app.post("/api/user/sendChangePasswordEmail", async (req, res) => {
  const { toEmail, code, location } = req.body;

  console.log(toEmail, code, location);

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

app.get("/api/follow/following", (req, res) => {
  const { currentID, profileID } = req.query;

  const follow = new FollowManager();

  follow
    .isFollowing(currentID, profileID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/follow/listOfFollowers", (req, res) => {
  const { profileID } = req.query;

  const follow = new FollowManager();

  follow
    .getFollowers(profileID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/follow/listOfFollowings", (req, res) => {
  const { profileID } = req.query;

  const follow = new FollowManager();

  follow
    .getFollowings(profileID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/follow/becomeFollower", (req, res) => {
  const followerID = req.body.currentID;
  const followingID = req.body.profileID;

  const follow = new FollowManager();
  follow.follow(followerID, followingID);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/follow/unfollow", (req, res) => {
  const followerID = req.body.currentID;
  const followingID = req.body.profileID;

  const follow = new FollowManager();
  follow.unfollow(followerID, followingID);

  res.json({ message: "Data received and processed successfully" });
});

//Post

app.get("/api/post/total", (req, res) => {
  const { userID } = req.query;

  const post = new PostManager();

  post
    .total(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(String(jsonifiedResult));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/post/followings", (req, res) => {
  const { userID, page } = req.query;

  const post = new PostManager();

  post
    .getFollowingPost(userID, page)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/post/profile", (req, res) => {
  const { userID, profileUserID, page } = req.query;

  const post = new PostManager();

  post
    .getProfilePost(userID, profileUserID, page)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/post/createPost", (req, res) => {
  const userID = req.body.userID;
  const postLink = req.body.postLink;
  const title = req.body.title;
  const tags = req.body.tags;
  const isVideo = req.body.isVideo;

  const post = new PostManager();
  post.upload(userID, postLink, title, tags, isVideo);
  res.json({ message: "Data received and processed successfully" });
});

app.get("/api/post/search", (req, res) => {
  const { userID, tags, page } = req.query;

  const tagsArray = tags.split(",");

  const post = new PostManager();

  post
    .getPostViaTags(userID, tagsArray, page)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/post/comment", (req, res) => {
  const { postID, userID } = req.query;

  const post = new CommentManager();

  post
    .getComments(postID, userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/post/placeholder", (req, res) => {
  const { userID, page } = req.query;

  const post = new PostManager();

  post
    .getPostBasedLike(userID, page)
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

app.post("/api/post/comment", (req, res) => {
  const postID = req.body.postID;
  const userID = req.body.userID;
  const comment = req.body.comment;

  const post = new CommentManager();
  post.comment(postID, userID, comment);

  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/post/like", (req, res) => {
  const postID = req.body.postID;
  const userID = req.body.userID;

  const post = new PostManager();
  post.like(postID, userID);

  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/post/unlike", (req, res) => {
  const postID = req.body.postID;
  const userID = req.body.userID;

  const post = new PostManager();
  post.unlike(postID, userID);

  res.json({ message: "Data received and processed successfully" });
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

app.get("/api/story/total", (req, res) => {
  const { userID } = req.query;

  const story = new StoryManager();

  story
    .total(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(String(jsonifiedResult));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/story/following", (req, res) => {
  const { userID } = req.query;

  const story = new StoryManager();

  story
    .getStories(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/story/createStory", (req, res) => {
  const userID = req.body.userID;
  const storyLink = req.body.storyLink;
  const title = req.body.title;
  const isVideo = req.body.isVideo;

  const story = new StoryManager();
  story.upload(userID, storyLink, title, isVideo);
  res.json({ message: "Data received and processed successfully" });
});

//Message

app.get("/api/message/list", (req, res) => {
  const { userID } = req.query;

  console.log("Hi");

  const messageManager = new MessageManager();

  messageManager
    .getMessageList(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/direct/permission", (req, res) => {
  const { senderID, receiverID } = req.query;

  const directMessage = new DirectMessage();

  directMessage
    .hasAbilityToSend(senderID, receiverID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/direct/message", (req, res) => {
  const senderID = req.body.senderID;
  const receiverID = req.body.receiverID;
  const message = req.body.message;

  const directMessage = new DirectMessage();
  directMessage.sendMessage(senderID, receiverID, message);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/direct/deleteMessage", (req, res) => {
  const messageID = req.body.messageID;

  const directMessage = new DirectMessage();
  directMessage.deleteMessage(messageID);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/direct/clearMessage", (req, res) => {
  const senderID = req.body.senderID;
  const receiverID = req.body.receiverID;

  const directMessage = new DirectMessage();
  directMessage.clearMessage(senderID, receiverID);
  res.json({ message: "Data received and processed successfully" });
});

app.get("/api/direct/list", (req, res) => {
  const { userID } = req.query;

  const directMessage = new DirectMessage();

  directMessage
    .getDirectList(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/direct/message", (req, res) => {
  const { senderID, receiverID, messageID } = req.query;

  const directMessage = new DirectMessage();

  directMessage
    .getMessage(senderID, receiverID, messageID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

//Group

app.get("/api/group/groupList", (req, res) => {
  const { userID } = req.query;

  const groupManager = new GroupManager();
  groupManager
    .getGroupList(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/group/groupMembers", (req, res) => {
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

app.post("/api/group/message", (req, res) => {
  const senderID = req.body.senderID;
  const groupID = req.body.groupID;
  const message = req.body.message;

  const groupMessage = new GroupMessage();
  groupMessage.sendMessage(senderID, groupID, message);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/group/deleteMessage", (req, res) => {
  const messageID = req.body.messageID;

  const groupMessage = new GroupMessage();
  groupMessage.deleteMessage(messageID);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/group/clearMessage", (req, res) => {
  const userID = req.body.userID;
  const groupID = req.body.groupID;

  const groupMessage = new GroupMessage();
  groupMessage.clearMessage(userID, groupID);
  res.json({ message: "Data received and processed successfully" });
});

app.get("/api/group/message", (req, res) => {
  const { userID, groupID, messageID } = req.query;

  const groupMessage = new GroupMessage();

  groupMessage
    .getMessage(userID, groupID, messageID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.post("/api/group/transferOwnership", (req, res) => {
  const groupID = req.body.groupID;
  const newOwnerID = req.body.newOwnerID;

  const groupManager = new GroupManager();
  groupManager.transferOwnership(groupID, newOwnerID);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/group/addMember", (req, res) => {
  const groupID = req.body.groupID;
  const userID = req.body.userID;

  const groupManager = new GroupManager();
  groupManager.addMember(groupID, userID);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/group/removeMember", (req, res) => {
  const groupID = req.body.groupID;
  const userID = req.body.userID;

  const groupManager = new GroupManager();
  groupManager.removeMemeber(groupID, userID);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/group/groupProfileIcon", (req, res) => {
  const groupID = req.body.groupID;
  const groupIcon = req.body.groupIcon;

  console.log(groupIcon);

  const groupManager = new GroupManager();
  groupManager.updateGroupIcon(groupID, groupIcon);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/group/groupName", (req, res) => {
  const groupID = req.body.groupID;
  const groupName = req.body.groupName;

  const groupManager = new GroupManager();
  groupManager.updateGroupName(groupID, groupName);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/group/delete", (req, res) => {
  const groupID = req.body.groupID;
  const groupMembers = req.body.groupMembers;

  const groupManager = new GroupManager();
  groupManager.deleteGroup(groupID, groupMembers);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/group/create", (req, res) => {
  const userID = req.body.userID;
  const groupName = req.body.groupName;
  const groupMembers = req.body.groupMembers;

  const groupManager = new GroupManager();
  groupManager.createGroup(userID, groupName, groupMembers);
  res.json({ message: "Data received and processed successfully" });
});

//Comment

app.post("/api/comment/like", (req, res) => {
  const userID = req.body.userID;
  const commentID = req.body.commentID;

  const commentManager = new CommentManager();
  commentManager.like(commentID, userID);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/comment/unlike", (req, res) => {
  const userID = req.body.userID;
  const commentID = req.body.commentID;

  const commentManager = new CommentManager();
  commentManager.unLike(commentID, userID);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/comment/dislike", (req, res) => {
  const userID = req.body.userID;
  const commentID = req.body.commentID;

  const commentManager = new CommentManager();
  commentManager.dislike(commentID, userID);
  res.json({ message: "Data received and processed successfully" });
});

app.post("/api/comment/unDislike", (req, res) => {
  const userID = req.body.userID;
  const commentID = req.body.commentID;

  const commentManager = new CommentManager();
  commentManager.unDisLike(commentID, userID);
  res.json({ message: "Data received and processed successfully" });
});

//Create server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
