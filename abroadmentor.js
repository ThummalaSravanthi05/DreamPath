document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('abroadForm');
  const formTitle = document.getElementById('formTitle');
  const showFormBtn = document.getElementById('showFormBtn');
  const editDetailsBtn = document.getElementById('editDetailsBtn');
  const deleteDetailsBtn = document.getElementById('deleteDetailsBtn');
  const actionButtons = document.getElementById('actionButtons');
  const displayData = document.getElementById('displayData');

  function populateForm(data) {
    steps.forEach(step => {
      step.fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input && data[field.id] !== undefined) {
          if (input.type === 'file') {
            // Skip file
          } else {
            input.value = data[field.id];
          }
        }
      });
    });
  }

  function renderSummary(data) {
    displayData.innerHTML = `
      <h3>Mentor Details</h3>
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Time Zone:</strong> ${data.timeZone}</p>
    `;
    displayData.style.display = 'block';
    actionButtons.style.display = 'flex';
  }

  function showEditMode() {
    formTitle.style.display = 'block';
    formTitle.textContent = 'Edit Mentor Details';
    form.style.display = 'block';
    displayData.style.display = 'none';
    showFormBtn.style.display = 'none';
    actionButtons.style.display = 'none';
  }

  function showSummaryMode(data) {
    form.style.display = 'none';
    formTitle.textContent = 'Mentor Details';
    formTitle.style.display = 'block';
    renderSummary(data);
    actionButtons.style.display = 'flex';
  }

  const savedData = JSON.parse(localStorage.getItem('mentorData'));
  if (savedData) {
    populateForm(savedData);
    showSummaryMode(savedData);
    showFormBtn.style.display = 'none';
  }

  showFormBtn.addEventListener('click', () => {
  // Hide the intro section
  const introSection = document.querySelector(".abroadmentor-intro");
  if (introSection) introSection.classList.add("hidden");

  // Reset and show form
  form.reset();
  formTitle.style.display = 'block';
  formTitle.textContent = 'Register as a Mentor';
  form.style.display = 'block';

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Optional: Initialize first step (if needed)
  if (typeof initForm === 'function') {
    initForm();
  }

  // Show the first step
  showStep(0);
});

  editDetailsBtn.addEventListener('click', () => {
    showEditMode();
    const savedData = JSON.parse(localStorage.getItem('mentorData'));
    showStep(0);
    if (savedData) {
      populateForm(savedData);
    }
  });

  deleteDetailsBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to delete your details?")) {
    localStorage.removeItem('mentorData');
    form.reset();
    form.style.display = 'none';
    displayData.style.display = 'none';
    actionButtons.style.display = 'none';
    formTitle.style.display = 'none';
    showFormBtn.style.display = 'inline-block';
    alert("Details deleted successfully.");
    window.location.href = 'abroadmentor.html'; // ✅ Redirect to main page
  }
});


  const steps = [
    {
      legend: "Step 1: Personal Information",
      fields: [
        { type: "text", id: "fullName", placeholder: "Full Name" },
        { type: "email", id: "email", placeholder: "Email Address" },
        { type: "tel", id: "phone", placeholder: "Phone Number (with country code)" },
        { type: "text", id: "country", placeholder: "Current Country of Residence" },
        { type: "text", id: "timeZone", placeholder: "Time Zone" },
        { type: "url", id: "linkedin", placeholder: "LinkedIn Profile URL" },
        { type: "file", id: "resume", placeholder: "Upload Resume or CV" }
      ]
    },
    {
      legend: "Step 2: Professional Background",
      fields: [
        { type: "text", id: "occupation", placeholder: "Current Occupation/Job Title" },
        { type: "text", id: "industry", placeholder: "Industry/Field of Expertise" },
        { type: "number", id: "experience", placeholder: "Years of Experience" },
        { type: "text", id: "education", placeholder: "Educational Qualifications" },
        { type: "text", id: "certifications", placeholder: "Certifications and Licenses" }
      ]
    },
    {
      legend: "Step 3: Mentorship Experience",
      fields: [
        { type: "text", id: "mentoredBefore", placeholder: "Have you mentored before? (Yes/No)" },
        { type: "textarea", id: "mentoringExperience", placeholder: "Describe your mentoring experience" },
        { type: "text", id: "mentoringAreas", placeholder: "Areas you can mentor in" },
        { type: "text", id: "menteeLevel", placeholder: "Preferred Mentee Level" }
      ]
    },
    {
      legend: "Step 4: Availability",
      fields: [
        { type: "text", id: "availableDays", placeholder: "Preferred Days for Mentoring" },
        { type: "text", id: "timeSlots", placeholder: "Preferred Time Slots" },
        { type: "textarea", id: "timeZoneNotes", placeholder: "Time Zone Considerations" }
      ]
    },
    {
      legend: "Step 5: Motivation and Goals",
      fields: [
        { type: "textarea", id: "motivation", placeholder: "Why do you want to become a mentor?" },
        { type: "textarea", id: "goals", placeholder: "What do you hope to achieve?" },
        { type: "textarea", id: "outcomes", placeholder: "Specific goals with mentees?" }
      ]
    },
    {
      legend: "Step 6: Additional Information",
      fields: [
        { type: "text", id: "languages", placeholder: "Languages Spoken" },
        { type: "text", id: "commitment", placeholder: "Willingness to commit (Yes/No)" },
        { type: "text", id: "consent", placeholder: "Consent to share profile (Yes/No)" },
        { type: "textarea", id: "otherInfo", placeholder: "Any other information" }
      ]
    },
    {
      legend: "Step 7: Agreement and Submission",
      fields: [
        { type: "checkbox", id: "agree", placeholder: "Agree to Terms and Conditions" },
        { type: "text", id: "signature", placeholder: "Signature" },
        { type: "date", id: "date", placeholder: "Date" }
      ]
    }
  ];

  let currentStep = 0;
  const stepIndicator = document.getElementById("stepIndicator");
  const stepContent = document.getElementById("stepContent");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");

  steps.forEach((_, idx) => {
    const step = document.createElement("div");
    step.textContent = idx + 1;
    step.addEventListener("click", () => showStep(idx));
    stepIndicator.appendChild(step);
  });

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
      if (field.multiple) input.multiple = true;
      fieldset.appendChild(input);
    });
  }

  function showStep(step) {
    currentStep = step;
    renderStep(step);
    updateButtons();
    updateIndicator();
  }

  function updateButtons() {
    prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";
    nextBtn.style.display = currentStep < steps.length - 1 ? "inline-block" : "none";
    submitBtn.style.display = currentStep === steps.length - 1 ? "inline-block" : "none";
  }

  function updateIndicator() {
    document.querySelectorAll(".step-indicator div").forEach((el, idx) => {
      el.classList.toggle("active", idx === currentStep);
    });
  }

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) showStep(currentStep - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) showStep(currentStep + 1);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mentorData = {};
    steps.forEach(step => {
      step.fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input) {
          if (input.type === 'file') {
            mentorData[field.id] = input.files.length > 0 ? [...input.files].map(file => file.name) : [];
          } else if (input.type === 'checkbox') {
            mentorData[field.id] = input.checked;
          } else {
            mentorData[field.id] = input.value;
          }
        }
      });
    });

    localStorage.setItem('mentorData', JSON.stringify(mentorData));
    alert("Mentor details submitted successfully!");
    showSummaryMode(mentorData);
  });

  showStep(0);
});
