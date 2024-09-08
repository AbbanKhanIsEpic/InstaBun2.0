async function login(userIdentifier, password) {
  const server = "http://127.0.0.1:5000/api/user/login";
  const data = { userIdentifier, password };

  fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      console.log(response);
      if (response.status == 401) {
        if (userIdentifier.includes("@")) {
          loginError.textContent = "Email address or password incorrect";
          userIdentifierInput.style.borderColor = "red";
          passwordInput.style.borderColor = "red";
        } else {
          loginError.textContent = "Username or password incorrect";
          userIdentifierInput.style.borderColor = "red";
          passwordInput.style.borderColor = "red";
        }
      } else if (response.status == 497) {
        let toEmail;
        if (!userIdentifier.includes("@")) {
          toEmail = await getEmailAddress(userIdentifier);
          console.log(toEmail);
        } else {
          toEmail = userIdentifier;
        }
        twoStepModal.style.display = "block";
        let code = Math.floor(100000 + Math.random() * 900000);
        const location = await getLocation();
        sendAuth(toEmail, code, location);
        startTimer();
        document
          .querySelector("#sendEmailAgainAuth")
          .addEventListener("click", function () {
            if (!timeOver) {
              alert("You can only request when the code expires");
            } else {
              code = Math.floor(100000 + Math.random() * 900000);
              sendAuth(toEmail, code, location);
              resetTimer();
            }
          });
        document
          .querySelector("#verifyAuthBtn")
          .addEventListener("click", async function () {
            if (authCodeInput.value == code) {
              await createUserSession(userIdentifier, 30);
              window.open("http://127.0.0.1:5500/pages/home.html", "_self");
            } else {
              verifyError.textContent = "Make sure to enter the code correctly";
              authCodeInput.style.borderColor = "red";
            }
          });
      } else if (response.status == 200) {
        await createUserSession(userIdentifier, 30);
        window.open("http://127.0.0.1:5500/pages/home.html", "_self");
      }
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
      // Handle login error (e.g., display error message to user)
    });
}

function startTimer() {
  timer = window.setTimeout(function () {
    console.log("Time is up");
    timeOver = true;
  }, duration);
}

function resetTimer() {
  timeOver = false;
  clearTimeout(timer);
  startTimer(duration);
}

async function getEmailAddress(username) {
  const server = "http://127.0.0.1:5000/api/user/getEmailAddress";
  const query = `?username=${encodeURIComponent(username)}`;

  let email;

  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      email = data["email"];
    });
  return email;
}

function sendChangePasswordEmail(toEmail, code, location) {
  const server = "http://127.0.0.1:5000/api/user/sendChangePasswordEmail";
  const data = { toEmail, code, location };

  fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
    });
}

function sendAuth(toEmail, code, location) {
  const server = "http://127.0.0.1:5000/api/user/sendAuthEmail";
  const data = { toEmail, code, location };

  fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
    });
}

async function isEmailTaken(emailAddress) {
  const server = "http://127.0.0.1:5000/api/user/IsEmailTaken";
  const query = `?email=${encodeURIComponent(emailAddress)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  return result;
}

async function changePassword(emailAddress, password) {
  const server = "http://127.0.0.1:5000/api/user/changePassword";
  const data = { emailAddress, password };

  fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
    });
}

function sendCode(toEmail, code, location) {
  const server = "http://127.0.0.1:5000/api/user/sendCreationCodeEmail";
  const data = { toEmail, code, location };

  fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
    });
}

function createAccount(username, emailAddress, password) {
  const server = "http://127.0.0.1:5000/api/user/createAccount";
  const data = { username, emailAddress, password };

  fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
    });
}

async function isUsernameTaken(username) {
  const server = "http://127.0.0.1:5000/api/user/IsUsernameTaken";
  const query = `?username=${encodeURIComponent(username)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  return result;
}

async function getRecommendardUsers(userID) {
  const server = "http://127.0.0.1:5000/api/user/recommendard";
  const query = `?userID=${encodeURIComponent(userID)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  return result;
}

async function getSearchedUser(searchQuery, userID) {
  const server = "http://127.0.0.1:5000/api/user/search";
  const query = `?searchQuery=${encodeURIComponent(
    searchQuery
  )}&userID=${encodeURIComponent(userID)}`;

  let result;
  await fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  return result;
}
