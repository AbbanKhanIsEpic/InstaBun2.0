const loginButton = document.querySelector("#loginButton");
const loginError = document.querySelector("#loginError");
const passwordError = document.querySelector("#passwordError");
const usernameError = document.querySelector("#usernameError");

const usernameInput = document.querySelector("#usernameInput"); //Input element

loginButton.addEventListener("click", function () {
  const username = usernameInput.value;
  const password = passwordInput.value;

  //User must enter username
  if (username.length == 0) {
    usernameError.textContent = "Username is required";
    usernameInput.style.borderColor = "red";
  }
  //Username must enter password
  else if (password.length == 0) {
    passwordError.textContent = "Password is required";
    passwordInput.style.borderColor = "red";
  } else {
    const server = "http://127.0.0.1:5000/api/user/login";
    const query = `?username=${username}&password=${password}`;

    fetch(server + query)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data) {
          console.log("Fail");
        } else {
          console.log("Success");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }
});
