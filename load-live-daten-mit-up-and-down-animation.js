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

// Trigger -> for the surfer up and down motion
let startTrigger = 0;
let endTrigger = 0;
let wasserflussRandom = 310;
let decrement = 220;

function prepareDecrementValue(liveWasserfluss) {
    wasserflussRandom = liveWasserfluss;
    decrement = (wasserflussRandom - 120) / 30; // Calculate the amount to decrement each time
    decrementValue();
}

function decrementValue() {
    for (let i = 0; i <= 30; i++) {
        setTimeout(() => {
            wasserflussRandom -= decrement;
            setSurferHeight(wasserflussRandom);
            if (i === 30) {
                // endTrigger++;
                // console.log('endTrigger set to: ' + endTrigger);
            incrementValue();
            }
             // Call increment function at the end
        }, i * 100);
    }
}

function incrementValue() {
    for (let i = 0; i <= 30; i++) {
        setTimeout(() => {
            wasserflussRandom += decrement;
            setSurferHeight(wasserflussRandom);
            if (i === 30) {
                endTrigger++;
                console.log('endTrigger set to: ' + endTrigger);
                if (endTrigger !== 2) {
                decrementValue();
                }
            }
             // Call decrement function at the end
        }, i * 100);
    }
}

function unixTimeToDate(unixTime) {
    const date = new Date(unixTime * 1000); // Convert to milliseconds by multiplying by 1000

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based in JavaScript
    const year = date.getFullYear();

    return `${day}.${month}.${year}`; // Format: DD:MM:YYYY
}

function unixTimeTo24Hours(unixTime) {
    const date = new Date(unixTime * 1000); // Convert to milliseconds by multiplying by 1000

    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${hours}:${minutes} Uhr`; // Format: HH:MM Uhr
}


//asynchrone funktion mit await überprüfen 
async function ouputLatestValuesToDom () { // wasserflussRandom in die Schlaufe geben
    let data = await fetchLiveData();
    let liveWasserfluss = parseFloat(data.data.liveWasserfluss);
    // let liveWasserfluss = parseFloat(wasserflussRandom);
    let liveWassertemperatur = parseFloat(data.data.liveTemperatur);
    let liveLufttemperatur = parseFloat(data.data.liveLufttemperatur);
    let anzeigeDatum = parseFloat(data.data.liveUnixtime);
    let anzeigeZeit = parseFloat(data.data.liveUnixtime);
    
    // console.log(wasserfluss);
    // console.log(wassertemperatur);
    // console.log(lufttemperatur);

    liveWasserfluss = liveWasserfluss.toFixed(0).padStart(3, '0');
    liveWassertemperatur = liveWassertemperatur.toFixed(1).padStart(4, '0');
    liveLufttemperatur = liveLufttemperatur.toFixed(1).padStart(4, '0');

    // anzeigeDatum von unixtime in Datum umwandeln
    anzeigeDatum = unixTimeToDate(anzeigeDatum);
    anzeigeZeit = unixTimeTo24Hours(anzeigeZeit);

    if (startTrigger === 0) {
        prepareDecrementValue(liveWasserfluss);
    }
    startTrigger = 1;
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
    document.getElementById('anzeige-datum').textContent = anzeigeDatum;
    document.getElementById('anzeige-zeit').textContent = anzeigeZeit;
    document.querySelectorAll('.element-lufttemperatur').forEach(element => {
        element.textContent = liveLufttemperatur + '°';
        console.log('liveLufttemperatur set to: ' + liveLufttemperatur + '°');
    });
    if (endTrigger === 2) {
     setSurferHeight(liveWasserfluss);
    }

    if (liveWasserfluss > 150) {
        document.getElementById('wasserfluss-kommentar').textContent = 'zu viel';
        } else if (liveWasserfluss < 90) {
            document.getElementById('wasserfluss-kommentar').textContent = 'zu wenig';
        } else {
            document.getElementById('wasserfluss-kommentar').textContent = 'die perfekte Menge';
    }

    // setTimeout(ouputLatestValuesToDom, 50);
    setTimeout(ouputLatestValuesToDom,10000);

}

function setSurferHeight(liveWasserfluss) {
    
    let surferHeight = 16;
    
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
    document.querySelectorAll('.surfing-container').forEach(element => {
        element.style.top = surferHeight + 'vh';
        console.log('surferHeight set to: ' + surferHeight + 'vh');
    });
}

// Interpolates a value from one range to another (surfer moving up and down smoothly)
function interpolate(value, x1, y1, x2, y2) {
    return ((value - x1) * (y2 - y1) / (x2 - x1)) + y1;
}

ouputLatestValuesToDom ();

