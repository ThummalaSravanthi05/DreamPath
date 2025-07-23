function openModal(name, email) {
    document.getElementById("teamName").textContent = name;
    document.getElementById("teamEmail").textContent = email;
    document.getElementById("contactModal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("contactModal").style.display = "none";
  }

  function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById("senderName").value;
  const email = document.getElementById("senderEmail").value;
  const message = document.getElementById("senderMessage").value;
  const adminEmail = document.getElementById("teamEmail").textContent;

  fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: adminEmail,
      name: name,
      from: email,
      message: message
    }),
  })
  .then((res) => res.json())
  .then((data) => {
    alert("Message sent successfully!");
    closeModal();
  })
  .catch((err) => {
    alert("Failed to send message.");
    console.error(err);
  });
} 
  // Optional: Close modal on outside click
  window.onclick = function(event) {
    const modal = document.getElementById("contactModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };