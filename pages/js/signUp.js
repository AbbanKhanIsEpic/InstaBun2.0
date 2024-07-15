const registerButton = document.querySelector("#registerButton");
const registerError = document.querySelector("#registerError");
const passwordError = document.querySelector("#passwordError");
const usernameError = document.querySelector("#usernameError");
const confirmPasswordError = document.querySelector("#confirmPasswordError");
const emailAddressError = document.querySelector("#emailAddressError");

const usernameInput = document.querySelector("#usernameInput"); //Input element
const passwordInput = document.querySelector("#passwordInput"); //Input element
const confirmPasswordInput = document.querySelector("#confirmPasswordInput"); //Input element
const emailInput = document.querySelector("#emailInput"); //Input element

const finaliseCreation = document.querySelector("#finaliseCreation");

let timer = null;
const duration = 900000; //15 mins
let timeOver = null;

//Event listeners
registerButton.addEventListener("click", async function () {
  const username = usernameInput.value.replaceAll(/\s/g, ""); //Remove all white spaces
  const password = passwordInput.value.replaceAll(/\s/g, ""); //Remove all white spaces
  const emailAddress = emailInput.value.replaceAll(/\s/g, ""); //Remove all white spaces

  let isValid = true;

  // Reset error messages and input borders
  usernameError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  registerError.textContent = "";
  emailAddressError.textContent = "";
  usernameInput.style.borderColor = "";
  passwordInput.style.borderColor = "";
  confirmPasswordInput.style.borderColor = "";
  emailInput.style.borderColor = "";

  //User must enter username
  if (username.length == 0) {
    setUsernameErrorMessage("Username is required");
    isValid = false;
  }

  //Username can not contain whitespace
  else if (username.length != usernameInput.value.length) {
    setUsernameErrorMessage("Username must not have spaces");
    isValid = false;
  }

  //Username min length is 3 characters
  else if (username.length < 3) {
    setUsernameErrorMessage("Username is too short ~ Min length is 3");
    isValid = false;
  }

  //Username max length is 32 characters
  else if (username.length > 32) {
    setUsernameErrorMessage("Username is too long ~ Max length is 32");
    isValid = false;
  }
  //Username can not contain special characters
  else if (username.match(/[$@#&!]+/)) {
    setUsernameErrorMessage("Username can not contain special characters");
    isValid = false;
  } else if (await isUsernameTaken(username)) {
    setUsernameErrorMessage("Username is taken");
    isValid = false;
  }

  //User must enter password
  if (password.length == 0) {
    setPasswordErrorMessage("Password is required");
    isValid = false;
  }
  //Password can not contain whitespace
  else if (password.length != passwordInput.value.length) {
    setPasswordErrorMessage("Password must not have spaces");
    isValid = false;
  }
  //Password min length is 8
  else if (password.length < 8) {
    setPasswordErrorMessage("Password is too short ~ Min length is 8");
    isValid = false;
  }
  //Password max length is 100
  else if (password.length > 100) {
    setPasswordErrorMessage("Password is too long ~ Min length is 100");
    isValid = false;
  }
  //Password must have numbers
  else if (!password.match(/[0-9]+/)) {
    setPasswordErrorMessage("Password must include numbers");
    isValid = false;
  }
  //Password must have lowercase letters
  else if (!password.match(/[a-z]+/)) {
    setPasswordErrorMessage("Password must include lowercase letters");
    isValid = false;
  }
  //Password must have uppercase letters
  else if (!password.match(/[A-Z]+/)) {
    setPasswordErrorMessage("Password must include uppercase letters");
    isValid = false;
  }
  //Password must have special characters
  else if (!password.match(/[$@#&!]+/)) {
    setPasswordErrorMessage("Password must include special letters");
    isValid = false;
  }

  //Confirm password will give an error if the password field is not entered
  if (password.length == 0) {
    confirmPasswordError.textContent = "Password is required";
    confirmPasswordInput.style.borderColor = "red";
    isValid = false;
  }
  //Checking if two password matches
  if (confirmPasswordInput.value != password) {
    confirmPasswordError.textContent = "Both passwords must match";
    confirmPasswordInput.style.borderColor = "red";
    isValid = false;
  }

  //Checking if the email address is entered
  if (emailAddress.length == 0) {
    setEmailErrorMessage("Email address is required");
    isValid = false;
  }
  //Checking if the email address is an actual email address
  else if (!validator.isEmail(emailAddress)) {
    setEmailErrorMessage("Email address is not corrrect");
    isValid = false;
  }
  //Checking if the email address is taken
  else if (await isEmailTaken(emailAddress)) {
    setEmailErrorMessage("Email address is taken");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  finaliseCreation.style.display = "block";
  let code = Math.floor(100000 + Math.random() * 900000);
  const location = await getLocation();
  sendCode(emailAddress, code, location);
  startTimer();
  document
    .querySelector("#sendEmailAgain")
    .addEventListener("click", function () {
      if (!timeOver) {
        alert("You can only request when the code expires");
      } else {
        code = Math.floor(100000 + Math.random() * 900000);
        sendCode(emailAddress, code, location);
        resetTimer();
      }
    });
  document
    .querySelector("#verifyBtn")
    .addEventListener("click", async function () {
      if (codeInput.value == code) {
        await createAccount(username, emailAddress, password);
        await setRememberCookie(username, 30);
      } else {
        verifyError.textContent = "Make sure to enter the code correctly";
        codeInput.style.borderColor = "red";
      }
    });
});

document.querySelector("#redirect").addEventListener("click", function () {
  window.open("http://127.0.0.1:5500/pages/login.html", "_self");
});

//Functions
function setUsernameErrorMessage(message) {
  usernameError.textContent = message;
  usernameInput.style.borderColor = "red";
}
function setPasswordErrorMessage(message) {
  passwordError.textContent = message;
  passwordInput.style.borderColor = "red";
}
function setEmailErrorMessage(message) {
  emailAddressError.textContent = message;
  emailInput.style.borderColor = "red";
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
