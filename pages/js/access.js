const changePasswordVis = document.querySelector("#changePasswordVis");
changePasswordVis.addEventListener("click", function () {
  if (passwordInput.type == "text") {
    passwordInput.type = "password";
    changePasswordVis.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
</svg>`;
  } else {
    passwordInput.type = "text";
    changePasswordVis.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="gray" class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                        <path
                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>`;
  }
});

function sendEmail(template_id, code, location, toEmail, purpose) {
  const data = {
    service_id: "service_6yolmlh",
    template_id: template_id,
    user_id: "Vmn8fY73xhau4Ic9h",
    template_params: {
      code: code,
      location: location,
      to_email: toEmail,
      purpose: purpose,
    },
  };
  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()) // parses JSON response into native JavaScript objects
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function getLocation() {
  await fetch(
    "https://api.geoapify.com/v1/ipinfo?&apiKey=8f2e3799151b4063b5b4f35cd40536b0"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return {
        location: `${data["city"]["name"]},${data["country"]["name"]}`,
        ip_address: data["ip"],
      };
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
}
