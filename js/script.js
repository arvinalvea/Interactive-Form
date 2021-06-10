const nameField = document.getElementById("name");
const otherJobRole = document.getElementById("other-job-role");
const jobRole = document.getElementById("title");
const tshirtColor = document.getElementById("color");
const tshirtDesign = document.getElementById("design");

//Focus on "Name" field, ready for user input
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

// Liste for change and display appropriate t-shirt design choices
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
