// Global variables
const nameField = document.getElementById("name");
const otherJobRole = document.getElementById("other-job-role");
const jobRole = document.getElementById("title");
const tshirtColor = document.getElementById("color");
const tshirtDesign = document.getElementById("design");
const activities = document.getElementById("activities");
let activitiesCost = document.getElementById("activities-cost");
let totalActivityCost = 0;

// Focus on "Name" field, ready for user input
nameField.focus();

// Hide/Disable necessary fields on start-up
otherJobRole.style.visibility = "hidden";
tshirtColor.disabled = true;

// Listen for change and show "Other Job Role" field if "Other" is selected
jobRole.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.visibility = "visible";
    } else {
        otherJobRole.style.visibility = "hidden";
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
