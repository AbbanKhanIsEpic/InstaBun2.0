let userID = null;

document.addEventListener("DOMContentLoaded", checkUserSession());

async function createUserSession(userIdentifier, expirationDays) {
  try {
    const name = "userID";
    const response = await fetch(
      `http://127.0.0.1:5000/api/user/userID?userIdentifier=${encodeURIComponent(
        userIdentifier
      )}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const userID = (await response.json()).userID;
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);

    const expires = "expires=" + date.toUTCString();
    const domain = "domain=127.0.0.1";
    const path = "path=/"; // Cookie accessible from all paths

    document.cookie =
      name + "=" + userID + ";" + expires + ";" + domain + ";" + path;
  } catch (error) {
    console.log(error);
  }
}

async function checkUserSession() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === "userID") {
      userID = cookieValue;
      return;
    }
  }
}
