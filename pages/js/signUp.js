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

const codeInput = document.querySelector("#codeInput"); //Input element

const changeConfirmPasswordVis = document.querySelector(
  "#changeConfirmPasswordVis"
);

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
        await createUserSession(username, 30);
        window.open("http://127.0.0.1:5500/pages/home.html", "_self");
      } else {
        verifyError.textContent = "Make sure to enter the code correctly";
        codeInput.style.borderColor = "red";
      }
    });
});

changeConfirmPasswordVis.addEventListener("click", function () {
  if (confirmPasswordInput.type == "text") {
    confirmPasswordInput.type = "password";
    changeConfirmPasswordVis.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
</svg>`;
  } else {
    confirmPasswordInput.type = "text";
    changeConfirmPasswordVis.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="gray" class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                        <path
                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>`;
  }
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
