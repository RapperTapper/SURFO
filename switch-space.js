// Get the div element with the id "erweitert"
const erweitertDivs = document.querySelectorAll(".erweitert");
const zurueckDivs = document.querySelectorAll(".zurueck");

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
}

function switchToSurfo() {
    console.log("Div clicked!");
}
