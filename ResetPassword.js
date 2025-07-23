document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const email = urlParams.get("email");

  const resetForm = document.getElementById("resetForm");

  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value.trim();

    if (!newPassword) {
      return alert("Please enter a new password.");
    }

    try {
      const res = await fetch("http://localhost:5000/api/ResetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password updated successfully!");
        window.location.href = "ConsultancyLogin.html"; // redirect to login
      } else {
        alert(data.message || "Failed to update password.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  });
});
