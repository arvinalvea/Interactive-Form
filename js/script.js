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
function isValidName(nameValue) {
    return /[A-Za-z]+/.test(nameValue);
}

// Must be a valid email address
function isValidEmail(emailValue) {
    return /^[^@]+@[^@.]+.com/.test(emailValue);
}

// Must be a valid credit card number
function isValidCCNum(paymentField) {
    return /^[1-9][0-9]{12,15}$/.test(creditCardNumber.value);
}

// Must be a valid zip code
function isValidZipcode(paymentField) {
    return /^[1-9][0-9]{4}$/.test(zipCode.value);
}

// Must be a valid CVV code
function isValidCVV(paymentField) {
    return /^[1-9][0-9]{2}$/.test(cvv.value);
}

// Function to toggle alert boxes for validation

function toggleAlertBoxes() {
    let nameField = name.value;
    let emailField = email.value;
    let activitiesField = totalActivityCost;

    if (isValidName(nameField) === false) {
        name.parentElement.classList.add("not-valid");
        name.parentElement.classList.remove("valid");
        name.parentElement.lastElementChild.style.display = "block";
    } else {
        name.parentElement.classList.add("valid");
        name.parentElement.classList.remove("not-valid");
        name.parentElement.lastElementChild.style.display = "none";
    }
    if (isValidEmail(emailField) === false) {
        email.parentElement.classList.add("not-valid");
        email.parentElement.classList.remove("valid");
        email.parentElement.lastElementChild.style.display = "block";
    } else {
        email.parentElement.classList.add("valid");
        email.parentElement.classList.remove("not-valid");
        email.parentElement.lastElementChild.style.display = "none";
    }
    if (activitiesField === 0) {
        activities.classList.add("not-valid");
        activities.classList.remove("valid");
        activities.lastElementChild.style.display = "block";
    } else {
        activities.classList.add("valid");
        activities.classList.remove("not-valid");
        activities.lastElementChild.style.display = "none";
    }
    if (paymentField.value === "credit-card") {
        if (isValidCCNum() === false) {
            creditCardNumber.parentElement.classList.add("not-valid");
            creditCardNumber.parentElement.classList.remove("valid");
            creditCardNumber.parentElement.lastElementChild.style.display =
                "block";
        } else {
            creditCardNumber.parentElement.classList.add("valid");
            creditCardNumber.parentElement.classList.remove("not-valid");
            creditCardNumber.parentElement.lastElementChild.style.display =
                "none";
        }
        if (isValidZipcode() === false) {
            zipCode.parentElement.classList.add("not-valid");
            zipCode.parentElement.classList.remove("valid");
            zipCode.parentElement.lastElementChild.style.display = "block";
        } else {
            zipCode.parentElement.classList.add("valid");
            zipCode.parentElement.classList.remove("not-valid");
            zipCode.parentElement.lastElementChild.style.display = "none";
        }
        if (isValidCVV() === false) {
            cvv.parentElement.classList.add("not-valid");
            cvv.parentElement.classList.remove("valid");
            cvv.parentElement.lastElementChild.style.display = "block";
        } else {
            cvv.parentElement.classList.add("valid");
            cvv.parentElement.classList.remove("not-valid");
            cvv.parentElement.lastElementChild.style.display = "none";
        }
    }
}

/**
 *
 * START-UP
 *
 */

// Focus on "Name" field, ready for user input
name.focus();

// Hide/Disable necessary fields on start-up
otherJobRole.style.display = "none";
tshirtColor.disabled = true;
paypal.style.display = "none";
bitcoin.style.display = "none";

/**
 *
 * EVENT LISTENERS
 *
 */

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
            // optionDataTheme.selected = true;
            tshirtColor.children[4].selected = true;
        } else {
            tshirtColor.children[i].hidden = true;
            // optionDataTheme.selected = false;
            tshirtColor.children[1].selected = true;
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

/**
 *
 * FORM VALIDATION
 *
 */

form[0].addEventListener("submit", (e) => {
    let nameField = name.value;
    let emailField = email.value;
    let activitiesField = totalActivityCost;

    if (
        isValidName(nameField) === false ||
        isValidEmail(emailField) === false ||
        activitiesField === 0 ||
        (paymentField.value === "credit-card" && isValidCCNum() === false) ||
        (paymentField.value === "credit-card" && isValidZipcode() === false) ||
        (paymentField.value === "credit-card" && isValidCVV() === false)
    ) {
        toggleAlertBoxes();
        e.preventDefault();
    }
});

// Add styles for checkboxes in "Register for Activities"
// when in focus

for (let i = 0; i < activityInputs.length; i++) {
    activityInputs[i].addEventListener("focus", (e) => {
        activityInputs[i].parentElement.classList.add("focus");
    });
    activityInputs[i].addEventListener("blur", (e) => {
        activityInputs[i].parentElement.classList.remove("focus");
    });
}
