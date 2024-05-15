// Get the div element with the id "erweitert"
const erweitertDiv = document.querySelector("erweitert");
const zurueckDiv = document.querySelector("zurueck");

// Add event listener to the div
erweitertDiv.addEventListener("click", switchToObserver);
zurueckDiv.addEventListener("click", switchToSurfo);

// Function to be called when the div is clicked
function switchToObserver() {
    console.log("Div clicked!");
}

function switchToSurfo() {
    console.log("Div clicked!");
}
