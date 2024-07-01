const loginButton = document.querySelector("#loginButton");
const loginError = document.querySelector("#loginError");
const passwordError = document.querySelector("#passwordError");
const usernameError = document.querySelector("#usernameError");
const twoStepModal = document.querySelector("#TwoStepModal");

let timer = null;
const duration = 900000; //15 mins
let timeOver = null;

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
  const query = `?username=${encodeURIComponent(
    username
  )}&password=${encodeURIComponent(password)}`;

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
  const query = `?email=${encodeURIComponent(
    email
  )}&password=${encodeURIComponent(password)}`;

  fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
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

function checkTwoStepVerificationEnabledViaEmail(email) {
  const server = "http://127.0.0.1:5000/api/user/check2SV-ViaEmail";
  const query = `?email=${encodeURIComponent(email)}`;

  fetch(server + query)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        twoStepModal.style.display = "block";
        timeOver = false;
        startTimer();
        sendTwoStepCode(email);
        document
          .querySelector("#sendEmailAgain")
          .addEventListener("click", function () {
            if (!timeOver) {
              alert(
                "When the code expires, then you will be able to request another code"
              );
            } else {
              resetTimer();
              sendTwoStepCode(email);
            }
          });
      } else {
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
}

async function sendTwoStepCode(email) {
  try {
    const location = await getLocation()["location"];
    console.log(location);
    const code = Math.floor(Math.random() * 1000000) + 111111;
    await sendEmail("template_ocpdspf", code, location, email, "login");
    const codeInput = document.querySelector("#codeInput");
    const verifyError = document.querySelector("#verifyError");
    document.querySelector("#verifyBtn").addEventListener("click", function () {
      if (codeInput.value != code) {
        verifyError.textContent = "Make sure to enter the code correctly";
        codeInput.style.borderColor = "red";
      } else {
        console.log("Done");
      }
    });
    console.log(code);
  } catch (locationError) {
    console.error("Error fetching location:", locationError);
  }
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
