document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");
  const profileIcon = document.getElementById("profileIcon");
  const profileDropdown = document.getElementById("profileDropdown");
  const userEmailSpan = document.getElementById("userEmail");
  const editEmail = document.getElementById("editEmail");
  //const emailInput = document.getElementById("emailInput");
  //const saveEmailBtn = document.getElementById("saveEmailBtn");
  const closeProfile = document.getElementById("closeProfile");
  
  // Load user from localStorage
  const user = JSON.parse(localStorage.getItem('consultancyLogin'));
  if (user) {
    const email = user.username.includes("@") ? user.username : user.username + "@mail.com";
    profileIcon.textContent = user.username[0].toUpperCase();
    userEmailSpan.textContent = `Hi, ${user.username}!`;
  }

  // Toggle dropdown
  profileIcon.addEventListener("click", () => {
    profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
  });

  // Edit email
  // Pencil icon click - Show Change Password Info
//const editEmail = document.getElementById("editEmail");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const changePasswordInfo = document.getElementById("changePasswordInfo");
//const closeProfile = document.getElementById("closeProfile");

// Show "Change Password" button
editEmail.addEventListener("click", () => {
  changePasswordBtn.style.display = "inline-block";
  editEmail.style.display = "none";
});

// On "Change Password" click
changePasswordBtn.addEventListener("click", async () => {
  const user = JSON.parse(localStorage.getItem('consultancyLogin'));
  if (!user || !user.email) return alert("User email not found.");

  // Send email via backend
  try {
    const res = await fetch("http://localhost:5000/api/request-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    });

    if (res.ok) {
      changePasswordInfo.style.display = "block";
      changePasswordBtn.style.display = "none";
    } else {
      const errMsg=await res.json();
      alert(errMsg.message||"Failed to send reset link.");
    }
  } catch (err) {
    alert("Error sending email.");
    console.error(err);
  }
});

// Reset dropdown state
closeProfile.addEventListener("click", () => {
  document.getElementById("profileDropdown").style.display = "none";
  changePasswordBtn.style.display = "none";
  changePasswordInfo.style.display = "none";
  editEmail.style.display = "inline-block";
});




  // Step Definitions
  const steps = [
    {
      legend: "📍 Basic Consultancy Profile",
      fields: [
        { type: "text", id: "name", placeholder: "Name of the Consultancy" },
        { type: "text", id: "year", placeholder: "Year Established" },
        { type: "text", id: "locations", placeholder: "Head & Branch Locations" },
        { type: "url", id: "website", placeholder: "Official Website" },
        { type: "email", id: "email", placeholder: "Email" },
        { type: "tel", id: "phone", placeholder: "Phone" },
        { type: "tel", id: "whatsapp", placeholder: "WhatsApp" }
      ]
    },
    {
      legend: "🌍 Countries & Universities Covered",
      fields: [
        { type: "textarea", id: "countries", placeholder: "Countries Covered" },
        { type: "textarea", id: "universities", placeholder: "Partner Universities" },
        { type: "textarea", id: "specializations", placeholder: "Specialized Programs (STEM, MBBS, etc.)" }
      ]
    },
    {
      legend: "📋 Services Offered",
      fields: [
        { type: "textarea", id: "services", placeholder: "List of Services Offered" }
      ]
    },
    {
      legend: "💼 Experience and Success Rate",
      fields: [
        { type: "number", id: "yearsService", placeholder: "Years in Service" },
        { type: "number", id: "studentsSent", placeholder: "Students Sent Abroad" },
        { type: "text", id: "visaSuccess", placeholder: "Visa Success Rate" },
        { type: "textarea", id: "stories", placeholder: "Success Stories" }
      ]
    },
    {
      legend: "📸 Photos & Videos",
      fields: [
        { type: "file", id: "photos", placeholder: "Upload Media", multiple: true }
      ]
    },
    {
      legend: "🌟 Reviews and Testimonials",
      fields: [
        { type: "textarea", id: "testimonials", placeholder: "Student Feedback" },
        { type: "text", id: "reviewLinks", placeholder: "Google/Trustpilot Links" },
        { type: "number", id: "rating", placeholder: "Star Rating (Optional)" }
      ]
    },
    {
      legend: "💸 Fees and Charges",
      fields: [
        { type: "textarea", id: "fees", placeholder: "Breakdown of Charges" },
        { type: "textarea", id: "refund", placeholder: "Refund Policy" }
      ]
    },
    {
      legend: "👨‍🏫 Staff Expertise",
      fields: [
        { type: "textarea", id: "counselors", placeholder: "Key Counselor Profiles" },
        { type: "text", id: "languages", placeholder: "Languages Spoken" },
        { type: "text", id: "certifications", placeholder: "Certifications" }
      ]
    },
    {
      legend: "📆 Appointment Booking",
      fields: [
        { type: "text", id: "bookingInfo", placeholder: "How to Schedule a Session" },
        { type: "text", id: "availability", placeholder: "Online/Offline, Working Hours" }
      ]
    },
    {
      legend: "🛡️ Accreditations and Legal Validity",
      fields: [
        { type: "text", id: "registrations", placeholder: "Business Registration Details" },
        { type: "text", id: "affiliations", placeholder: "Government/Education Body Affiliations" },
        { type: "text", id: "internationalCerts", placeholder: "MARA/ICEF/Other Certifications" }
      ]
    },
    {
      legend: "📊 Bonus Metrics (Optional)",
      fields: [
        { type: "textarea", id: "metrics", placeholder: "Success Dashboards, Guides, Support Tools" }
      ]
    }
  ];

  const form = document.getElementById('consultancyForm');
  const formTitle = document.getElementById('formTitle');
  const showFormBtn = document.getElementById('showFormBtn');
  const editDetailsBtn = document.getElementById('editDetailsBtn');
  const deleteDetailsBtn = document.getElementById('deleteDetailsBtn');
  const actionButtons = document.getElementById('actionButtons');
  const displayData = document.getElementById('displayData');

  const stepIndicator = document.getElementById("stepIndicator");
  const stepContent = document.getElementById("stepContent");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");

  let formData = {};

  let currentStep = 0;

  function renderStep(step) {
    const data = steps[step];
    stepContent.innerHTML = `<fieldset><legend>${data.legend}</legend></fieldset>`;
    const fieldset = stepContent.querySelector("fieldset");

    data.fields.forEach(field => {
      let input;
      if (field.type === "textarea") {
        input = document.createElement("textarea");
      } else {
        input = document.createElement("input");
        input.type = field.type;
      }
      input.id = field.id;
      input.placeholder = field.placeholder;
      if (formData[field.id] !== undefined) {
      input.value = formData[field.id];
    }

    if (field.multiple) input.multiple = true;

    // Update formData on change
    input.addEventListener("input", () => {
      formData[field.id] = input.value;
    });

    fieldset.appendChild(input);
  });
}

  function updateButtons() {
    prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";
    nextBtn.style.display = currentStep < steps.length - 1 ? "inline-block" : "none";
    submitBtn.style.display = currentStep === steps.length - 1 ? "inline-block" : "none";
  }

  function updateIndicator() {
    Array.from(stepIndicator.children).forEach((el, idx) => {
      el.classList.toggle("active", idx === currentStep);
    });
  }

  function showStep(step) {
    currentStep = step;
    renderStep(step);
    updateButtons();
    updateIndicator();
  }

  function populateForm(data) {
    steps.forEach(step => {
      step.fields.forEach(field => {
        if (field.type === 'file') {
          const input = document.getElementById(field.id);
          formData[field.id] = input?.files.length > 0 ? [...input.files].map(f => f.name) : [];
        }
      });
    });
  }

  function renderSummary(data) {
  let mediaHTML = '';

  if (data.photos && Array.isArray(data.photos)) {
    mediaHTML = `
      <div class="media-gallery">
        ${data.photos.map(file => {
          const ext = file.split('.').pop().toLowerCase();
          if (["mp4", "webm"].includes(ext)) {
            return `<video controls class="media-item"><source src="uploads/${file}" type="video/${ext}"></video>`;
          } else {
            return `<img src="uploads/${file}" alt="Media" class="media-item"/>`;
          }
        }).join('')}
      </div>
    `;
  }

  displayData.innerHTML = `
    ${mediaHTML}
    <div class="summary-details">
      <h3>${data.name}</h3>
      <p><strong>📍 Year Established:</strong> ${data.year}</p>
      <p><strong>📌 Locations:</strong> ${data.locations}</p>
      <p><strong>🌐 Website:</strong> <a href="${data.website}" target="_blank">${data.website}</a></p>
      <p><strong>✉️ Email:</strong> ${data.email}</p>
      <p><strong>📞 Phone:</strong> ${data.phone} | WhatsApp: ${data.whatsapp}</p>
      <hr/>
      <p><strong>🌍 Countries:</strong> ${data.countries}</p>
      <p><strong>🏫 Universities:</strong> ${data.universities}</p>
      <p><strong>📖 Specializations:</strong> ${data.specializations}</p>
      <p><strong>🛠️ Services:</strong> ${data.services}</p>
      <hr/>
      <p><strong>💼 Experience:</strong> ${data.yearsService} years</p>
      <p><strong>👨‍🎓 Students Sent:</strong> ${data.studentsSent}</p>
      <p><strong>✅ Visa Success Rate:</strong> ${data.visaSuccess}</p>
      <p><strong>📈 Success Stories:</strong> ${data.stories}</p>
      <hr/>
      <p><strong>🌟 Testimonials:</strong> ${data.testimonials}</p>
      <p><strong>🔗 Reviews:</strong> ${data.reviewLinks}</p>
      <p><strong>⭐ Rating:</strong> ${data.rating}</p>
      <p><strong>💸 Fees:</strong> ${data.fees}</p>
      <p><strong>🔄 Refund Policy:</strong> ${data.refund}</p>
      <p><strong>👨‍🏫 Counselors:</strong> ${data.counselors}</p>
      <p><strong>🗣️ Languages:</strong> ${data.languages}</p>
      <p><strong>📜 Certifications:</strong> ${data.certifications}</p>
      <p><strong>📆 Booking Info:</strong> ${data.bookingInfo}</p>
      <p><strong>⏰ Availability:</strong> ${data.availability}</p>
      <p><strong>🛡️ Registration:</strong> ${data.registrations}</p>
      <p><strong>🏛️ Affiliations:</strong> ${data.affiliations}</p>
      <p><strong>🌐 International Certs:</strong> ${data.internationalCerts}</p>
      <p><strong>📊 Extra Metrics:</strong> ${data.metrics}</p>
    </div>
  `;

  displayData.style.display = 'block';
  actionButtons.style.display = 'flex';
}

  function showEditMode() {
    formTitle.style.display = 'block';
    formTitle.textContent = 'Edit your details';
    form.style.display = 'block';
    displayData.style.display = 'none';
    showFormBtn.style.display = 'none';
    actionButtons.style.display = 'none';
  }

  function showSummaryMode(data) {
    form.style.display = 'none';
    formTitle.style.display = 'block';
    renderSummary(data);
    actionButtons.style.display = 'flex';
    showFormBtn.style.display = 'none';
  }

  // Create step indicators
  steps.forEach((_, idx) => {
    const step = document.createElement("div");
    step.textContent = idx + 1;
    step.addEventListener("click", () => showStep(idx));
    stepIndicator.appendChild(step);
  });

  // Button handlers
  showFormBtn.addEventListener('click', () => {
    document.querySelector(".consultancy-intro")?.classList.add("hidden");
    form.reset();
    form.style.display = 'block';
    formTitle.style.display = 'block';
    formTitle.textContent = 'Add your Consultancy';
    showFormBtn.style.display = 'none';
    showStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  editDetailsBtn.addEventListener('click', () => {
    showEditMode();
    const savedData = JSON.parse(localStorage.getItem('consultancyData'));
    showStep(0);
    if (savedData) {
      populateForm(savedData);
    }
  });

  deleteDetailsBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete your consultancy details?")) {
      localStorage.removeItem('consultancyData');
      form.reset();
      form.style.display = 'none';
      displayData.style.display = 'none';
      actionButtons.style.display = 'none';
      formTitle.style.display = 'none';
      showFormBtn.style.display = 'inline-block';
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) showStep(currentStep - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) showStep(currentStep + 1);
  });

 form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const consultancyData = { ...formData };

// Handle file inputs separately
steps.forEach(step => {
  step.fields.forEach(field => {
    if (field.type === 'file') {
      const input = document.getElementById(field.id);
      if (input && input.files.length > 0) {
        consultancyData[field.id] = [...input.files].map(f => f.name);
      } else {
          consultancyData[field.id] = input.value;
        }
      }
    });
  });
  const requiredFields = ["name", "year", "locations", "website", "email", "phone","countries","universities","services","specializations","yearsService","studentsSent","visaSuccess","stories","photos","testimonials","reviewLinks","fees","refund","counselors","languages","certifications","bookingInfo","availability","registrations","affiliations","internationalCerts","metrics"];
  for (const fieldId of requiredFields) {
    const input = document.getElementById(fieldId);
    if (!consultancyData[fieldId] || consultancyData[fieldId].toString().trim() === "") {
      alert(`Please fill in the required field: ${fieldId}`);
      return;
    }
  }

  const user = JSON.parse(localStorage.getItem('consultancyLogin'));
  if (!user || !user.email) {
    return alert("User not found. Please log in again.");
  }

  consultancyData.userEmail = user.email; // Attach logged-in user's email

  try {
    const res = await fetch("http://localhost:5000/api/consultancy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consultancyData)
    });

    const result = await res.json();
    if (res.ok) {
      alert(result.message);
      showSummaryMode(consultancyData);
    } else {
      alert(result.message || "Error saving consultancy");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
});  

const savedData = JSON.parse(localStorage.getItem('consultancyData'));
const formSubmitted = localStorage.getItem('formSubmitted') === 'true';

document.querySelector(".consultancy-intro")?.classList.remove("hidden");
document.getElementById("showFormBtn").style.display = "inline-block";  // <--- Ensure this line works

if (savedData && formSubmitted) {
  populateForm(savedData);
  showSummaryMode(savedData);
}

showStep(0);

});
