// Get the div element with the id "erweitert"
const erweitertDivs = document.querySelectorAll(".erweitert");
const zurueckDivs = document.querySelectorAll(".zurueck");

let infoDivPosition = 0;
// Add event listener to the div
erweitertDivs.forEach(div => {
    div.addEventListener("click", switchToObserver);
});
zurueckDivs.forEach(div => {
    div.addEventListener("click", switchToSurfo);
});

// Function to be called when the div is clicked
function switchToObserver() {
    console.log("Div clicked!");
    
    // Get all the elements with the class "info-div"
    const infoDivs = document.querySelectorAll(".info-div");

    // Loop through the elements and apply the CSS rules
    infoDivs.forEach(div => {
        div.style.left = "0%";
        div.style.width = "100%";
        div.style.maxWidth = "100%";
    });

    infoDivPosition = 1;
}

function switchToSurfo() {
    console.log("Div clicked!");

    // Get all the elements with the class "info-div"
    const infoDivs = document.querySelectorAll(".info-div");

    // Loop through the elements and apply the CSS rules
    infoDivs.forEach(div => {
        div.style.left = "110%";
        div.style.width = "100%";
        div.style.maxWidth = "100%";
    });

    infoDivPosition = 0;
}