console.log("Hello World!");

async function fetchLiveData() {
    try {
        const response = await fetch ('https://732516-12.web.fhgr.ch/live-daten.php');
        const data = await response.json();
        //console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}


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
    let data = await fetchLiveData();
    let liveWasserfluss = parseFloat(data.data.liveWasserfluss);
    // let liveWasserfluss = parseFloat(wasserflussRandom);
    let liveWassertemperatur = parseFloat(data.data.liveTemperatur);
    let liveLufttemperatur = parseFloat(data.data.liveLufttemperatur);
    let surferHeight = 16;
    
    // console.log(wasserfluss);
    // console.log(wassertemperatur);
    // console.log(lufttemperatur);

    liveWasserfluss = liveWasserfluss.toFixed(0).padStart(3, '0');
    liveWassertemperatur = liveWassertemperatur.toFixed(1).padStart(4, '0');
    liveLufttemperatur = liveLufttemperatur.toFixed(1).padStart(4, '0');
    
    if (liveWasserfluss >= 500) {
        surferHeight = -20;
    } else if (liveWasserfluss >= 300) {
        surferHeight = interpolate(liveWasserfluss, 300, -17, 500, -20);
    } else if (liveWasserfluss >= 230) {
        surferHeight = interpolate(liveWasserfluss, 230, -10, 300, -17);
    } else if (liveWasserfluss >= 100) {
        surferHeight = interpolate(liveWasserfluss, 100, 13, 230, -10);
    } else {
        surferHeight = 16; // Default value
    }
    
    // if (liveWasserfluss >= 500) {
    //     surferHeight = -20;
    // } else if (liveWasserfluss >= 300) {
    //     surferHeight = -17;
    // } else if (liveWasserfluss >= 230) {
    //     surferHeight = -10;
    // } else if (liveWasserfluss >= 100) {
    //     surferHeight = 13;
    // } else {
    //     surferHeight = 16; // Default value
    // }
    document.querySelectorAll('.element-wasserfluss').forEach(element => {
        element.textContent = liveWasserfluss;
        console.log('liveWasserfluss set to: ' + liveWasserfluss);
    });
    document.querySelectorAll('.element-wassertemperatur').forEach(element => {
        element.textContent = liveWassertemperatur + '°';
        console.log('liveWassertemperatur set to: ' + liveWassertemperatur + '°');
    });
    document.querySelectorAll('.element-lufttemperatur').forEach(element => {
        element.textContent = liveLufttemperatur + '°';
        console.log('liveLufttemperatur set to: ' + liveLufttemperatur + '°');
    });
    
    document.querySelectorAll('.surfing-container').forEach(element => {
        element.style.top = surferHeight + 'vh';
        console.log('surferHeight set to: ' + surferHeight + 'vh');
    });

    // setTimeout(ouputLatestValuesToDom, 50);
    setTimeout(ouputLatestValuesToDom,10000);

}
   
function interpolate(value, x1, y1, x2, y2) {
    return ((value - x1) * (y2 - y1) / (x2 - x1)) + y1;
}

ouputLatestValuesToDom ();