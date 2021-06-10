const nameField = document.getElementById("name");
const otherJobRole = document.getElementById("other-job-role");
const jobRole = document.getElementById("title");

nameField.focus();
otherJobRole.style.visibility = "hidden";
jobRole.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.visibility = "visible";
    } else {
        otherJobRole.style.visibility = "hidden";
    }
});
