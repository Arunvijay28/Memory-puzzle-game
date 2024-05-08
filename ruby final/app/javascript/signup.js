document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("sign-up-form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent form submission
      if (validateInputs()) {
        console.log("hi")
        form.submit(); // If validation passes, submit the form
      }
    });
  
    const setError = (element, message) => {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");
      errorDisplay.innerText = message;
      inputControl.classList.add("error");
      inputControl.classList.remove("success");
    };
  
    const setSuccess = (element) => {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");
      errorDisplay.innerText = "";
      inputControl.classList.add("success");
      inputControl.classList.remove("error");
    };
  
    const isValidEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email.toLowerCase());
    };
  
    const validateInputs = () => {
      let isValid = true;
      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();
      const password2Value = password2.value.trim();

      if (emailValue === "") {
        setError(email, "Email is required");
        isValid = false;
      } else if (!isValidEmail(emailValue)) {
        setError(email, "Provide a valid email address");
        isValid = false;
      } else {
        setSuccess(email);
      }
  
      if (passwordValue === "") {
        setError(password, "Password is required");
        isValid = false;
      } else if (passwordValue.length < 8) {
        setError(password, "Password must be at least 8 characters.");
        isValid = false;
      } else {
        setSuccess(password);
      }
  
      if (password2Value === "") {
        setError(password2, "Please confirm your password");
        isValid = false;
      } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
        isValid = false;
      } else {
        setSuccess(password2);
      }
  
      return isValid;
    };
  });
  