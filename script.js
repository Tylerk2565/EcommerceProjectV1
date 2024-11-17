// Fetching the data from products.json, parses json response into an object
fetch('./products.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    showData(data)
  })

// Gets the product-container div by id; function showData then has data as the argument
const productContainer = document.getElementById('product-container');
function showData(data) {
  // For each product creates a product div for each product in the json array, then populate that product div with the html code + json data
  data.products.forEach((product) => {
    let containerChild = document.createElement("div");
    containerChild.className = "product";
    containerChild.innerHTML = `
      <a href="${product.link}" target="_blank"><img src="${product.image}" alt="${product.alt}" height="210" width="325"></a>
      <p class="car-info">${product.name}</p>
      <p class="car-price">Price: <span class="price">${product.price}</span></p>
     <a href="${product.link}" target="_blank"><button class="details-btn">More Details</button></a>`
    productContainer.appendChild(containerChild);
  });
}

// Contact Form Validation
const form = document.getElementById('contact-form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const contactMessage = document.getElementById('contactMessage');
const submitFormBtn = document.getElementById('submitFormBtn');
let isValid = true;


submitFormBtn.addEventListener('click', (e) => {
  e.preventDefault();
  validateForm(e);
});

function validateForm() {
  isValid = true;
  if (firstName.value.trim() === "") {
    setInvalid(firstName, "Please enter a valid first name");
  } else {
    setValid(firstName);
  } 
  if (lastName.value.trim() === "") {
    setInvalid(lastName, "Please enter a valid last name");
  } else {
    setValid(lastName);
  } 
  if (!validateEmail(email.value.trim())) {
    setInvalid(email, "Please enter a valid email");
  } else {
    setValid(email);
  }
  if (!validatePhoneNumber(phoneNumber.value.trim())) {
    setInvalid(phoneNumber, "Please enter a valid phone number");
  } else {
    setValid(phoneNumber);
  }
  if (isValid) {
    form.submit();
  }
}

// Validate email using regex
function validateEmail(email) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
}

// Validate phone number using regex
function validatePhoneNumber(phoneNumber) {
	const phonePattern = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
	return phonePattern.test(phoneNumber);
}

// Invalid function
function setInvalid(element, message) {
  const inputField = element.parentElement;
  const errorMessage = inputField.querySelector(".error-message");
  errorMessage.innerText = message;
  inputField.classList.add("invalid");
	inputField.classList.remove("valid");
}

// Valid function
function setValid() {
  const inputField = element.parentElement;
	const errorMessages = inputField.querySelector(".error-message");
	errorMessages.innerText = "";
	inputField.classList.add("valid");
	inputField.classList.remove("invalid");
}