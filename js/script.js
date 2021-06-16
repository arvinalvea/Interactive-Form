/**
 *
 * GLOBAL VARIABLES
 *
 */

const name = document.getElementById("name");
const otherJobRole = document.getElementById("other-job-role");
const jobRole = document.getElementById("title");
const tshirtColor = document.getElementById("color");
const tshirtDesign = document.getElementById("design");
const activities = document.getElementById("activities");
let activitiesCost = document.getElementById("activities-cost");
let totalActivityCost = 0;
const paymentField = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
const email = document.getElementById("email");
const creditCardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const form = document.getElementsByTagName("form");
const activityInputs = document
    .getElementById("activities-box")
    .getElementsByTagName("input");

/**
 *
 * VALIDATORS
 *
 */

// Can only contain letters a-z or A-Z
function isValidName(name) {
    return /[A-Za-z]+/.test(name);
}

// Must be a valid email address
function isValidEmail(email) {
    return /^[^@]+@[^@.]+.com/.test(email);
}

// Must be a valid credit card number
function isValidCCNum(paymentField) {
    if (paymentField.value === "credit-card") {
        return /\d{13,16}/.test(creditCardNumber.value);
    } else {
        return false;
    }
}

// Must be a valid zip code
function isValidZipcode(paymentField) {
    if (paymentField.value === "credit-card") {
        return /\d{5}/.test(zipCode.value);
    } else {
        return false;
    }
}

// Must be a valid CVV code
function isValidCVV(paymentField) {
    if (paymentField.value === "credit-card") {
        return /\d{3}/.test(cvv.value);
    } else {
        return false;
    }
}

// Focus on "Name" field, ready for user input
name.focus();

// Hide/Disable necessary fields on start-up
otherJobRole.style.display = "none";
tshirtColor.disabled = true;
paypal.style.display = "none";
bitcoin.style.display = "none";

// Listen for change and show "Other Job Role" field if "Other" is selected
jobRole.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.display = "block";
    } else {
        otherJobRole.style.display = "none";
    }
});

// Listen for change and display appropriate t-shirt design choices
tshirtDesign.addEventListener("change", (e) => {
    tshirtColor.disabled = false;

    for (let i = 1; i < tshirtColor.children.length; i++) {
        let optionDataTheme = tshirtColor.children[i].getAttribute(
            "data-theme"
        );

        if (e.target.value === optionDataTheme) {
            tshirtColor.children[i].hidden = false;
            optionDataTheme.selected = true;
        } else {
            tshirtColor.children[i].hidden = true;
            optionDataTheme.selected = false;
        }
    }
});

// Listen for change and update sum of cost
activities.addEventListener("change", (e) => {
    let optionCost = parseInt(e.target.getAttribute("data-cost"));

    if (e.target.checked) {
        totalActivityCost += optionCost;
        activitiesCost.innerHTML = `Total: $${totalActivityCost}`;
    } else {
        totalActivityCost -= optionCost;
        activitiesCost.innerHTML = `Total: $${totalActivityCost}`;
    }
});

// "Payment Info" Section. Default Credit Card as payment option and show/hide
// other payment fields as necessary

paymentField.children[1].setAttribute("selected", true);

paymentField.addEventListener("change", (e) => {
    if (e.target.value === "paypal") {
        paypal.style.display = "block";
        creditCard.style.display = "none";
        bitcoin.style.display = "none";
    } else if (e.target.value === "bitcoin") {
        bitcoin.style.display = "block";
        creditCard.style.display = "none";
        paypal.style.display = "none";
    } else if (e.target.value === "credit-card") {
        creditCard.style.display = "block";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    }
});

// Form validation

form[0].addEventListener("submit", (e) => {
    let nameField = name.value;
    let emailField = email.value;
    let activitiesField = totalActivityCost;

    if (
        !isValidName(nameField) ||
        !isValidEmail(emailField) ||
        activitiesField === 0 ||
        !isValidCCNum(paymentField) ||
        !isValidZipcode(paymentField) ||
        !isValidCVV(paymentField)
    ) {
        e.preventDefault();
    }
});

// Accessibility

// Add styles for checkboxes in "Register for Activities"
// when in focus

for (let i = 0; i < activityInputs.length; i++) {
    console.log(activityInputs[i]);
    activityInputs[i].addEventListener("focus", (e) => {
        activityInputs[i].parentElement.classList.add("focus");
    });
    activityInputs[i].addEventListener("blur", (e) => {
        activityInputs[i].parentElement.classList.remove("focus");
    });
}
