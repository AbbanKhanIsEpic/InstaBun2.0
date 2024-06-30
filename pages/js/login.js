const loginButton = document.querySelector("#loginButton");
const loginError = document.querySelector("#loginError");
const passwordError = document.querySelector("#passwordError");
const usernameError = document.querySelector("#usernameError");

const usernameOrEmailInput = document.querySelector("#usernameOrEmailInput"); // Input element
const passwordInput = document.querySelector("#passwordInput");

loginButton.addEventListener("click", function () {
  const usernameOrEmail = usernameOrEmailInput.value;
  const password = passwordInput.value;

  let isValid = true;
  const isEmail = validator.isEmail(usernameOrEmail);

  // Reset error messages and input borders
  usernameError.textContent = "";
  passwordError.textContent = "";
  usernameOrEmailInput.style.borderColor = "";
  passwordInput.style.borderColor = "";

  // User must enter username
  if (usernameOrEmail.length === 0) {
    usernameError.textContent = "Username or email address is required";
    usernameOrEmailInput.style.borderColor = "red";
    isValid = false;
  }
  if (!isEmail && usernameOrEmail.includes("@")) {
    usernameError.textContent = "Email address is incorrect";
    usernameOrEmailInput.style.borderColor = "red";
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
  if (isEmail) {
    loginViaEmail(usernameOrEmail, password);
  } else {
    loginViaUsername(usernameOrEmail, password);
  }
});

document.querySelector("#redirect").addEventListener("click", function () {
  window.open("http://127.0.0.1:5500/pages/signUp.html", "_self");
});

//function

function loginViaUsername(username, password) {
  const server = "http://127.0.0.1:5000/api/user/loginViaUsername";
  const query = `?username=${username}&password=${password}`;

  fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        loginError.textContent = ""; //I put it here bc to not make UI flashing
        checkTwoStepVerificationEnabledViaUsername(username);
      } else {
        loginError.textContent = "Username or password incorrect";
        usernameOrEmailInput.style.borderColor = "red";
        passwordInput.style.borderColor = "red";
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
}

function loginViaEmail(email, password) {
  const server = "http://127.0.0.1:5000/api/user/loginViaEmail";
  const query = `?email=${email}&password=${password}`;

  fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        loginError.textContent = ""; //I put it here bc to not make UI flashing
        checkTwoStepVerificationEnabledViaEmail(email);
      } else {
        loginError.textContent = "Email address or password incorrect";
        usernameOrEmailInput.style.borderColor = "red";
        passwordInput.style.borderColor = "red";
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
}

function getLocation() {
  // Implement the logic to get the location
  // For example, you can use the Geolocation API
  // and return the location coordinates
}

function checkTwoStepVerificationEnabledViaEmail(email) {
  const server = "http://127.0.0.1:5000/api/user/check2SV-ViaEmail";
  const query = `?email=${email}`;

  fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const location = await getLocation();
      console.log(location);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
}

function checkTwoStepVerificationEnabledViaUsername(username) {
  const server = "http://127.0.0.1:5000/api/user/check2SV-ViaUsername";
  const query = `?username=${username}`;

  fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
}
