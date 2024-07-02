const loginButton = document.querySelector("#loginButton");
const loginError = document.querySelector("#loginError");
const passwordError = document.querySelector("#passwordError");
const usernameError = document.querySelector("#usernameError");
const twoStepModal = document.querySelector("#TwoStepModal");

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
function login(userIdentifier, password) {
  const server = "http://127.0.0.1:5000/api/user/login"; // Replace with your server URL
  const data = { userIdentifier, password };

  fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status == 401) {
        loginError.textContent = "Email address or password incorrect";
        userIdentifierInput.style.borderColor = "red";
        passwordInput.style.borderColor = "red";
      } else if (response.status == 497) {
        twoStepModal.style.display = "block";
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
