const loginButton = document.querySelector("#loginButton");
const loginError = document.querySelector("#loginError");
const passwordError = document.querySelector("#passwordError");
const usernameError = document.querySelector("#usernameError");

const usernameInput = document.querySelector("#usernameInput"); //Input element
const passwordInput = document.querySelector("#passwordInput"); //Input element

loginButton.addEventListener("click", function () {
  const username = usernameInput.value.replaceAll(/\s/g, ""); //Remove all white spaces

  //User must enter username
  if (username.length == 0) {
    setUsernameErrorMessage("Username is required");
  }

  //Username can not contain whitespace
  else if (username.length != usernameInput.value.length) {
    setUsernameErrorMessage("Username must not have spaces");
  }

  //Username max length is 32 characters
  else if (username.length > 32) {
    setUsernameErrorMessage("Username is too long ~ Max length is 32");
  }

  //Remove the error message
  else {
    usernameError.textContent = "";
    usernameInput.style.borderColor = "";
  }

  const password = passwordInput.value.replaceAll(/\s/g, ""); //Remove all white spaces
  //Username must enter password
  if (password.length == 0) {
    setPasswordErrorMessage("Password is required");
  }

  else if(){
    
  }
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
