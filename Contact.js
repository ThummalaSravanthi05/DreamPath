document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: document.querySelector('input[name="name"]').value,
    email: document.querySelector('input[name="email"]').value,
    phone: document.querySelector('input[name="phone"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };

  try {
    const res = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Message sent successfully!");
      document.getElementById("contactForm").reset(); // optional: clear form
    } else {
      alert("❌ Failed to send message.");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("❌ Failed to send message. Please try again later.");
  }
});
