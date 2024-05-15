console.log("Hello World!");

async function fetchData() {
    try {
        const response = await fetch ('https://732516-12.web.fhgr.ch/live-daten.php');
        const data = await response.json();
        //console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

function interpolate(value, x1, y1, x2, y2) {
    return ((value - x1) * (y2 - y1) / (x2 - x1)) + y1;
}

// let wasserflussRandom = 501;
// const decrement = (511 - 90) / 160; // Calculate the amount to decrement each time

// for (let i = 0; i <= 160; i++) {
//     setTimeout(() => {
//         wasserflussRandom -= decrement;
//         // Call your function here with the new wasserfluss value
//         ouputLatestValuesToDom(wasserflussRandom);
//     }, i * 100); // Multiply by 100 to convert from seconds to milliseconds
// }

// let wasserflussRandom = 511;
// const decrement = (511 - 90) / 160; // Calculate the amount to decrement each time

// function decrementValue() {
//     for (let i = 0; i <= 160; i++) {
//         setTimeout(() => {
//             wasserflussRandom -= decrement;
//             ouputLatestValuesToDom(wasserflussRandom);
//             if (i === 160) incrementValue(); // Call increment function at the end
//         }, i * 100);
//     }
// }

// function incrementValue() {
//     for (let i = 0; i <= 160; i++) {
//         setTimeout(() => {
//             wasserflussRandom += decrement;
//             ouputLatestValuesToDom(wasserflussRandom);
//             if (i === 160) decrementValue(); // Call decrement function at the end
//         }, i * 100);
//     }
// }

// decrementValue(); // Start with decrementing

//asynchrone funktion mit await überprüfen 
async function ouputLatestValuesToDom () { // wasserflussRandom in die Schlaufe geben
    let data = await fetchData();
    let wasserfluss = data.data.wasserfluss;
    // let wasserfluss = wasserflussRandom;
    let wassertemperatur = data.data.temperatur;
    let lufttemperatur = data.data.lufttemperatur;
    let surferHeight = 16;
    
    console.log(wasserfluss);

    wasserfluss = wasserfluss.toFixed(0).padStart(3, '0');
    wassertemperatur = wassertemperatur.toFixed(1).padStart(4, '0');
    lufttemperatur = lufttemperatur.toFixed(1).padStart(4, '0');
    
    if (wasserfluss >= 500) {
        surferHeight = -20;
    } else if (wasserfluss >= 300) {
        surferHeight = interpolate(wasserfluss, 300, -17, 500, -20);
    } else if (wasserfluss >= 230) {
        surferHeight = interpolate(wasserfluss, 230, -10, 300, -17);
    } else if (wasserfluss >= 100) {
        surferHeight = interpolate(wasserfluss, 100, 13, 230, -10);
    } else {
        surferHeight = 16; // Default value
    }
    
    // if (wasserfluss >= 500) {
    //     surferHeight = -20;
    // } else if (wasserfluss >= 300) {
    //     surferHeight = -17;
    // } else if (wasserfluss >= 230) {
    //     surferHeight = -10;
    // } else if (wasserfluss >= 100) {
    //     surferHeight = 13;
    // } else {
    //     surferHeight = 16; // Default value
    // }

    document.querySelectorAll('.element-lufttemperatur').forEach(element => {
        element.textContent = lufttemperatur + '°';
    });
    document.querySelectorAll('.element-wassertemperatur').forEach(element => {
        element.textContent = wassertemperatur + '°';
    });
    document.querySelectorAll('.element-wasserfluss').forEach(element => {
        element.textContent = wasserfluss;
    });
    document.querySelectorAll('.surfing-container').forEach(element => {
        element.style.top = surferHeight + 'vh';
        console.log(surferHeight + 'vh');
    });

    setTimeout(ouputLatestValuesToDom, 50);
    // setTimeout(ouputLatestValuesToDom, 5000);

}
   
ouputLatestValuesToDom ();