import { getUserID } from "./API/user.js";

export const userID = await checkUserSession();

export async function createUserSession(userIdentifier, expirationDays) {
  try {
    const response = await getUserID(userIdentifier);

    if (response.status != "200") {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userID = response.data.userID;

    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);

    const expires = "expires=" + date.toUTCString();
    const domain = "domain=127.0.0.1";
    const path = "path=/"; // Cookie accessible from all paths

    //Delete cookie
    document.cookie =
      "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
      domain +
      ";";

    //Create cookie
    document.cookie =
      "userID" + "=" + userID + ";" + expires + ";" + path + ";" + domain;
    window.open("http://127.0.0.1:5500/pages/home.html", "_self");
  } catch (error) {
    console.log(error);
  }
}

async function checkUserSession() {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === "userID") {
      return cookieValue;
    }
  }
  if (
    !(
      window.location.pathname == "/pages/login.html" ||
      window.location.pathname == "/pages/signUp.html"
    )
  ) {
    window.open("http://127.0.0.1:5500/pages/signUp.html", "_self");
  }
}
