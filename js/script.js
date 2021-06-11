// Global variables
const nameField = document.getElementById("name");
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

// Focus on "Name" field, ready for user input
nameField.focus();

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
