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
    const liveInfoContainerZurueck = document.querySelectorAll(".live-info-container-zurueck");

    // Loop through the elements and apply the CSS rules
    infoDivs.forEach(div => {
        div.style.left = "0%";
        div.style.width = "100%";
        div.style.maxWidth = "100%";
    });

    liveInfoContainerZurueck.forEach(div => {
        div.style.left = "-395px";
    });

    infoDivPosition = 1;
}

function switchToSurfo() {
    console.log("Div clicked!");

    // Get all the elements with the class "info-div"
    const infoDivs = document.querySelectorAll(".info-div");
    // const liveInfoContainerZurueck = document.querySelectorAll(".live-info-container-zurueck");

    // Loop through the elements and apply the CSS rules
    infoDivs.forEach(div => {
        div.style.left = "110%";
        div.style.width = "100%";
        div.style.maxWidth = "100%";
    });
    // liveInfoContainerZurueck.forEach(div => {
    //     div.style.left = "-800px";
    // });

    infoDivPosition = 0;
}

function applyStylesBasedOnAspectRatio() {
    // Get the window's aspect ratio
    const aspectRatio = window.innerWidth / window.innerHeight;

    const infoDivs = document.querySelectorAll(".info-div");
    const surferDivs = document.querySelectorAll(".surfer-div");
    const liveInfoContainer = document.querySelectorAll(".live-info-container");
    const liveInfoContainerZurueck = document.querySelectorAll(".live-info-container-zurueck");

    // Check the aspect ratio and the value of infoDivPosition
    if (aspectRatio <= 0.73) {
        if (infoDivPosition == 1) {
            infoDivs.forEach(div => {
                div.style.left = "0%";
                div.style.width = "100%";
                div.style.maxWidth = "100%";
            });
            surferDivs.forEach(div => {
                div.style.left = "0%";
                div.style.width = "100%";
                div.style.maxWidth = "100%";
            });
            liveInfoContainer.forEach(div => {
                div.style.right = "-295px";
            });
            liveInfoContainerZurueck.forEach(div => {
                div.style.left = "-395px";
            });
        } else if (infoDivPosition == 0) {
            infoDivs.forEach(div => {
                div.style.left = "110%";
                div.style.width = "100%";
                div.style.maxWidth = "100%";
            });
            surferDivs.forEach(div => {
                div.style.left = "0%";
                div.style.width = "100%";
                div.style.maxWidth = "100%";
            });
            liveInfoContainer.forEach(div => {
                div.style.right = "-295px";
            });
            liveInfoContainerZurueck.forEach(div => {
                div.style.left = "-800px";
            });
        } 
    } else if (aspectRatio <= 1/0.68) {
        surferDivs.forEach(div => {
            div.style.width = "50%";
            div.style.maxWidth = "50%";
        });
        infoDivs.forEach(div => {
            div.style.left = "50%";
            div.style.width = "50%";
            div.style.maxWidth = "50%";
        });
        liveInfoContainerZurueck.forEach(div => {
            div.style.left = "-800px";
        });
        liveInfoContainer.forEach(div => {
            div.style.right = "-800px";
        });
    } else {
        surferDivs.forEach(div => {
            div.style.width = "30%";
            div.style.maxWidth = "30%";
        });
        infoDivs.forEach(div => {
            div.style.left = "30%";
            div.style.width = "70%";
            div.style.maxWidth = "70%";
        });
        liveInfoContainerZurueck.forEach(div => {
            div.style.left = "-800px";
        });
        liveInfoContainer.forEach(div => {
            div.style.right = "-800px";
        });
    }
};

window.onload = applyStylesBasedOnAspectRatio;
window.onresize = applyStylesBasedOnAspectRatio;