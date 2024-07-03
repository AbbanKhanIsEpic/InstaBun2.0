require("dotenv").config();

class Email {
  async loginNotify(toEmail, username, location, ip_address, device, time) {
    const data = {
      service_id: process.env.EMAIL_SERVICE_ID,
      template_id: process.env.EMAIL_TEMPLATE_LOGIN_NOTIFiCATION_ID,
      user_id: process.env.EMAIL_USER_ID,
      template_params: {
        to_email: toEmail,
        username: username,
        location: location,
        ip_address: ip_address,
        device: device,
        time: time,
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
        return "Success:" + data;
      })
      .catch((error) => {
        return new Error("Error:" + error);
      });
  }

  async changePassword(toEmail, code, location) {
    const result = await this.#codeEmail(
      toEmail,
      code,
      location,
      EMAIL_PURPOSE_CHANGE_PASSWORD
    );
    return result;
  }

  async createAccount(toEmail, code, location) {
    const result = await this.#codeEmail(
      toEmail,
      code,
      location,
      process.env.EMAIL_PURPOSE_CREATE
    );
    return result;
  }

  async auth(toEmail, code, location) {
    this.#codeEmail(toEmail, code, location, process.env.EMAIL_PURPOSE_AUTH);
  }

  async #codeEmail(toEmail, code, location, purpose) {
    const data = {
      service_id: process.env.EMAIL_SERVICE_ID,
      template_id: process.env.EMAIL_TEMPLATE_VERIFY_ID,
      user_id: process.env.EMAIL_USER_ID,
      template_params: {
        to_email: toEmail,
        code: code,
        location: location,
        purpose: purpose,
      },
    };
    console.log(data);
    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          timeout: 15000, // Timeout in milliseconds (e.g., 15 seconds)
        }
      );

      const responseData = await response.json();
      console.log("Success:", responseData);
      return responseData; // Optionally return data if needed
    } catch (error) {
      console.log("Error:", error);
      throw error; // Rethrow the error or handle it as needed
    }
  }
}
module.exports = Email;
