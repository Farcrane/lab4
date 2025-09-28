document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ReForm");
  const feedback = document.getElementById("feedback");
  const pfCards = document.getElementById("pfCards");
  const sumTableBody = document.querySelector("#sumTable tbody");

  // email validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateForm() {
    let valid = true;

    // Fields validation

    // first name
    const firstname = document.getElementById("firstname");
    const firstnameError = document.getElementById("firstnameError");
    if (!firstname.value.trim()) {
      firstnameError.textContent = "First name is required.";
      valid = false;
    } else {
      firstnameError.textContent = "";
    }

    // last name
    const lastName = document.getElementById("lastName");
    const lastNameError = document.getElementById("LastnameError");
    if (!lastName.value.trim()) {
      lastNameError.textContent = "Last name is required.";
      valid = false;
    } else {
      lastNameError.textContent = "";
    }

    // Email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    if (!email.value.trim()) {
      emailError.textContent = "Email is required.";
      valid = false;
    } else if (!validateEmail(email.value.trim())) {
      emailError.textContent = "Enter a valid email address.";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    // Programme
    const programme = document.getElementById("programme");
    const programmeError = document.getElementById("programmeError");
    if (!programme.value) {
      programmeError.textContent = "Please select a programme.";
      valid = false;
    } else {
      programmeError.textContent = "";
    }

    // Year
    const yearRadios = document.querySelectorAll("input[name='year']");
    let yearSelected = false;
    yearRadios.forEach(radio => {
      if (radio.checked) yearSelected = true;
    });
    if (!yearSelected) {
      feedback.textContent = "Please select a year.";
      valid = false;
    } else if (valid) {
      feedback.textContent = ""; // clear only if no other errors
    }

    return valid;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm()) return;

   
    const firstname = document.getElementById("firstname").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const programme = document.getElementById("programme").value;
    const year = document.querySelector("input[name='year']:checked").value;
    const interests = document.getElementById("interests").value.trim();
    const photo = document.getElementById("photo").value.trim() || "https://via.placeholder.com/150";

   
    const card = document.createElement("div");
    card.className = "profile-card";
    card.innerHTML = `
      <img src="${photo}" alt="${firstname} ${lastName}">
      <h3>${firstname} ${lastName}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Programme:</strong> ${programme}</p>
      <p><strong>Year:</strong> ${year}</p>
      <p><strong>Interests:</strong> ${interests || "N/A"}</p>
      <button class="remove-btn">Remove</button>
    `;
    pfCards.appendChild(card);

    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${firstname} ${lastName}</td>
      <td>${email}</td>
      <td>${programme}</td>
      <td>${year}</td>
    `;
    sumTableBody.appendChild(row);

    // function for removing profile card
    card.querySelector(".remove-btn").addEventListener("click", () => {
      card.remove();
      row.remove();
      feedback.textContent = `${firstname} ${lastName} removed.`;
    });

    
    feedback.textContent = `${firstname} ${lastName} registered successfully!`;

    
    form.reset();
  });
});
