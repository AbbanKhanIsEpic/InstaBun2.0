const loginButton = document.querySelector("#loginButton");
const loginError = document.querySelector("#loginError");
const passwordError = document.querySelector("#passwordError");
const usernameError = document.querySelector("#usernameError");
const twoStepModal = document.querySelector("#TwoStepModal");
const codeInput = document.querySelector("#codeInput");
const verifyError = document.querySelector("#verifyError");

let timer = null;
const duration = 900000; //15 mins
let timeOver = null;

const userIdentifierInput = document.querySelector("#userIdentifierInput"); // Input element
const passwordInput = document.querySelector("#passwordInput");

loginButton.addEventListener("click", function () {
  const userIdentifier = userIdentifierInput.value;
  const password = passwordInput.value;

  let isValid = true;
  const isEmail = validator.isEmail(userIdentifier);

  // Reset error messages and input borders
  usernameError.textContent = "";
  passwordError.textContent = "";
  userIdentifierInput.style.borderColor = "";
  passwordInput.style.borderColor = "";

  // User must enter username
  if (userIdentifier.length === 0) {
    usernameError.textContent = "Username or email address is required";
    userIdentifierInput.style.borderColor = "red";
    isValid = false;
  }
  if (!isEmail && userIdentifier.includes("@")) {
    usernameError.textContent = "Email address is incorrect";
    userIdentifierInput.style.borderColor = "red";
    isValid = false;
  }

  // User must enter password
  if (password.length === 0) {
    passwordError.textContent = "Password is required";
    passwordInput.style.borderColor = "red";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  login(userIdentifier, password);
});

document.querySelector("#redirect").addEventListener("click", function () {
  window.open("http://127.0.0.1:5500/pages/signUp.html", "_self");
});

//function
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
        const geoInfo = await getLocation();
        const location = `${geoInfo["city"]["name"]}, ${geoInfo["country"]["name"]}`;
        sendAuth(toEmail, code, location);
        startTimer();
        document
          .querySelector("#sendEmailAgain")
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
          .querySelector("#verifyBtn")
          .addEventListener("click", function () {
            if (codeInput.value == code) {
              window.open("http://127.0.0.1:5500/pages/home.html", "_self");
            } else {
              verifyError.textContent = "Make sure to enter the code correctly";
              codeInput.style.borderColor = "red";
            }
          });
      }
      return response.json();
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

function sendAuth(toEmail, code, location) {
  const server = "http://127.0.0.1:5000/api/user/sendAuth"; // Replace with your server URL
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
