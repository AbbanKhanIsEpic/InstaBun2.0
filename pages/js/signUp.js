const registerButton = document.querySelector("#registerButton");
const registerError = document.querySelector("#registerError");
const passwordError = document.querySelector("#passwordError");
const usernameError = document.querySelector("#usernameError");
const confirmPasswordError = document.querySelector("#confirmPasswordError");

const usernameInput = document.querySelector("#usernameInput"); //Input element
const passwordInput = document.querySelector("#passwordInput"); //Input element
const confirmPasswordInput = document.querySelector("#confirmPasswordInput"); //Input element

//Event listeners
registerButton.addEventListener("click", function () {
  const username = usernameInput.value.replaceAll(/\s/g, ""); //Remove all white spaces
  const password = passwordInput.value.replaceAll(/\s/g, ""); //Remove all white spaces

  let isValid = true;

  // Reset error messages and input borders
  usernameError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  registerError.textContent = "";
  usernameInput.style.borderColor = "";
  passwordInput.style.borderColor = "";
  confirmPasswordInput.style.borderColor = "";

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

  if (confirmPasswordInput.value != password) {
    confirmPasswordError.textContent = "Both passwords must match";
    confirmPasswordInput.style.borderColor = "red";
    isValid = false;
  }

  if (!isValid) {
    return;
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
