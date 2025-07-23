document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('consultancyLogin', JSON.stringify({
        username: data.user.username,
        email: data.user.email
      }));
      window.location.href = "Consultancy.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Try again.");
  }
});
