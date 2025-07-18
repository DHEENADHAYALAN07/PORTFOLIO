document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("formMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous messages
    messageBox.textContent = "";
    messageBox.style.color = "#475569";

    // Collect form data
    const formData = new FormData(form);
    const data = {
      firstName: formData.get("firstName")?.trim(),
      lastName: formData.get("lastName")?.trim(),
      email: formData.get("email")?.trim(),
      subject: formData.get("subject")?.trim(),
      message: formData.get("message")?.trim(),
    };

    // Basic validation
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.subject ||
      !data.message
    ) {
      messageBox.textContent = "Please fill in all fields.";
      messageBox.style.color = "red";
      return;
    }

    // Simulate loading
    messageBox.textContent = "Sending...";
    messageBox.style.color = "#475569";

    // Simulate submission (1 second delay)
    setTimeout(() => {
    

      form.reset();
      messageBox.textContent = "Message sent successfully! I'll get back to you soon.";
      messageBox.style.color = "#16a34a";
    }, 1000);
  });
});

// Download Resume function
function downloadResume() {
  const link = document.createElement("a");
  link.href = "resume.pdf"; // Replace with your actual resume path
  link.download = "Dheena-Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// View Resume function
function viewResume() {
  window.open("resume.pdf", "_blank"); // Replace with your actual resume path
}



// Initialize EmailJS
(function () {
  emailjs.init("-cjekfvWOZKgSVXEN"); // Replace with your actual Public Key from EmailJS
})();

// Form submission handler
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Show loading / clear previous message
  const messageBox = document.getElementById("formMessage");
  messageBox.textContent = "Sending message...";
  messageBox.style.color = "#333";

  // Send the form
  emailjs.sendForm("service_uuhvq8i", "template_ay29cah", this)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
      messageBox.textContent = "✅ Message sent successfully!";
      messageBox.style.color = "green";
      document.getElementById("contactForm").reset();
    }, function (error) {
      console.log("FAILED...", error);
      messageBox.textContent = "❌ Failed to send message. Please try again.";
      messageBox.style.color = "red";
    });
});
