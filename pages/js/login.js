const loginButton = document.querySelector("#loginButton");
const sendEmail = document.querySelector("#sendEmail");
const verifyPasswordBtn = document.querySelector("#verifyPasswordBtn");
const updatePassword = document.querySelector("#updatePassword");

const loginError = document.querySelector("#loginError");
const passwordError = document.querySelector("#passwordError");
const newPasswordError = document.querySelector("#newPasswordError");
const confirmNewPasswordError = document.querySelector(
  "#confirmNewPasswordError"
);
const usernameError = document.querySelector("#usernameError");
const verifyAuthError = document.querySelector("#verifyAuthError");
const verifyPasswordError = document.querySelector("#verifyPasswordError");

const twoStepModal = document.querySelector("#TwoStepModal");
const changePasswordModal = document.querySelector("#changePasswordModal");

let timer = null;
const duration = 900000; //15 mins
let timeOver = null;

const userIdentifierInput = document.querySelector("#userIdentifierInput"); // Input element
const passwordInput = document.querySelector("#passwordInput");
const authCodeInput = document.querySelector("#authCodeInput");
const codePasswordInput = document.querySelector("#codePasswordInput");
const emailAddressInput = document.querySelector("#emailAddressInput");
const newPasswordInput = document.querySelector("#newPasswordInput");
const newConfirmPasswordInput = document.querySelector(
  "#newConfirmPasswordInput"
);

const changePasswordModalTitle = document.querySelector(
  "#changePasswordModal .title-description"
);

const forgotPassword = document.querySelector("#forgotPassword");
const sendPasswordEmailAgain = document.querySelector(
  "#changePasswordModal .modal-footer > div:first-child"
);

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

forgotPassword.addEventListener("click", async function () {
  changePasswordModal.style.display = "block";

  let code = Math.floor(100000 + Math.random() * 900000);
  const location = await getLocation();

  let emailAddress;

  sendEmail.addEventListener("click", async function () {
    emailAddress = emailAddressInput.value;
    if (emailAddress.length == 0) {
      verifyPasswordError.textContent = "Email address is required";
      emailAddressInput.style.borderColor = "red";
    } else if (!validator.isEmail(emailAddress)) {
      verifyPasswordError.textContent =
        "Email address is not in correct format";
      emailAddressInput.style.borderColor = "red";
    } else if (!(await isEmailTaken(emailAddress))) {
      verifyPasswordError.textContent =
        "Make sure you entered your email address correctly";
      emailAddressInput.style.borderColor = "red";
    } else {
      verifyPasswordError.textContent = "";
      emailAddressInput.classList.toggle("d-none");
      verifyPasswordBtn.classList.toggle("d-none");
      sendEmail.classList.toggle("d-none");
      codePasswordInput.classList.toggle("d-none");
      sendPasswordEmailAgain.classList.toggle("d-none");
      changePasswordModalTitle.textContent = "Enter verification code";
      sendChangePasswordEmail(emailAddress, code, location);
      startTimer();
    }
  });

  document
    .querySelector("#sendEmailAgainPassword")
    .addEventListener("click", function () {
      if (!timeOver) {
        alert("You can only request when the code expires");
      } else {
        code = Math.floor(100000 + Math.random() * 900000);
        sendChangePasswordEmail(emailAddress, code, location);
        resetTimer();
      }
    });

  verifyPasswordBtn.addEventListener("click", function () {
    if (codePasswordInput.value == code) {
      changePasswordModalTitle.textContent = "Change and confirm new password";
      codePasswordInput.classList.toggle("d-none");
      verifyPasswordBtn.classList.toggle("d-none");
      verifyPasswordError.textContent = "";
      sendPasswordEmailAgain.classList.toggle("d-none");
      updatePassword.classList.toggle("d-none");
      newPasswordInput.classList.toggle("d-none");
      newConfirmPasswordInput.classList.toggle("d-none");
    } else {
      verifyPasswordError.textContent = "Make sure to enter the code correctly";
      codePasswordInput.style.borderColor = "red";
    }
  });

  updatePassword.addEventListener("click", async function () {
    const password = newPasswordInput.value.replaceAll(/\s/g, ""); //Remove all white spaces
    const confirmPassword = newConfirmPasswordInput.value.replaceAll(/\s/g, ""); //Remove all white spaces

    isValid = true;

    //Reset errors
    newPasswordError.textContent = "";
    confirmNewPasswordError.textContent = "";
    newPasswordInput.style.borderColor = "";
    newConfirmPasswordInput.style.borderColor = "";

    //User must enter password
    if (password.length == 0) {
      setPasswordErrorMessage("Password is required");
      isValid = false;
    }
    //Password can not contain whitespace
    else if (password.length != newPasswordInput.value.length) {
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
      confirmNewPasswordError.textContent = "Password is required";
      newConfirmPasswordInput.style.borderColor = "red";
      isValid = false;
    }
    //Checking if two password matches
    if (confirmPassword != password) {
      confirmNewPasswordError.textContent = "Both passwords must match";
      newConfirmPasswordInput.style.borderColor = "red";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    await changePassword(emailAddress, password);
    alert("Password updated");
    alert("Page will be refreshed now");
    window.open("http://127.0.0.1:5500/pages/login.html", "_self");
  });
});

document.querySelector("#redirect").addEventListener("click", function () {
  window.open("http://127.0.0.1:5500/pages/signUp.html", "_self");
});

function setPasswordErrorMessage(message) {
  newPasswordError.textContent = message;
  newPasswordInput.style.borderColor = "red";
  isValid = false;
}
