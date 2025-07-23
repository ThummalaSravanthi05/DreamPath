function validate() {
  event.preventDefault(); // prevent form submission

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Dummy validation (replace with actual validation logic if needed)
  const validUser = "admin";
  const validPass = "123456";

  if (username === validUser && password === validPass) {
    // Store profile info in localStorage
    localStorage.setItem('consultancyLogin', JSON.stringify({
      username: username,
      profilePhoto: "user.jpg" // adjust as needed
    }));

    // Redirect to dashboard
    window.location.href = "AbroadMentor.html";
  } else {
    alert("Invalid username or password");
  }
}
