console.log("Hello World!");

// Funktion um Live-Daten von der eigenen API bzw. Datenbank zu holen
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

// Funktion um Unixtime in Datum umzuwandeln
function unixTimeToDate(unixTime) {
    const date = new Date(unixTime * 1000); // Convert to milliseconds by multiplying by 1000

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based in JavaScript
    const year = date.getFullYear();

    return `${day}.${month}.${year}`; // Format: DD:MM:YYYY
}

// Funktion um Unixtime in 24 Stunden Format umzuwandeln
function unixTimeTo24Hours(unixTime) {
    const date = new Date(unixTime * 1000); // Convert to milliseconds by multiplying by 1000

    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${hours}:${minutes} Uhr`; // Format: HH:MM Uhr
}

//asynchrone funktion mit await überprüfen 
async function ouputLatestValuesToDom () {
    let data = await fetchLiveData();
    let liveWasserfluss = parseFloat(data.data.liveWasserfluss);
    let liveWassertemperatur = parseFloat(data.data.liveTemperatur);
    let liveLufttemperatur = parseFloat(data.data.liveLufttemperatur);
    let anzeigeDatum = parseFloat(data.data.liveUnixtime);
    let anzeigeZeit = parseFloat(data.data.liveUnixtime);

    // Werte auf 3 Stellen nach dem Komma runden und auf 3 Stellen auffüllen
    liveWasserfluss = liveWasserfluss.toFixed(0).padStart(3, '0');
    liveWassertemperatur = liveWassertemperatur.toFixed(1).padStart(4, '0');
    liveLufttemperatur = liveLufttemperatur.toFixed(1).padStart(4, '0');

    // anzeigeDatum von unixtime in Datum umwandeln
    anzeigeDatum = unixTimeToDate(anzeigeDatum);
    anzeigeZeit = unixTimeTo24Hours(anzeigeZeit);

    // call setSurferHeight function to set the surfer height according to the water flow
    setSurferHeight(liveWasserfluss);

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

    // Kommentar zur Wasserflussmenge in Textfeld anzeigen
    if (liveWasserfluss > 150) {
        document.getElementById('wasserfluss-kommentar').textContent = 'zu viel';
        } else if (liveWasserfluss < 90) {
            document.getElementById('wasserfluss-kommentar').textContent = 'zu wenig';
        } else {
            document.getElementById('wasserfluss-kommentar').textContent = 'die perfekte Menge';
    }

    // call the function again after 10 seconds
    setTimeout(ouputLatestValuesToDom,10000);

}

// Funktion um die Höhe des Surfers zu setzen
function setSurferHeight(liveWasserfluss) {
    
    let surferHeight = 15;
    
    if (liveWasserfluss >= 500) {
        surferHeight = -20;
    } else if (liveWasserfluss >= 300) {
        surferHeight = interpolate(liveWasserfluss, 300, -17, 500, -20);
    } else if (liveWasserfluss >= 230) {
        surferHeight = interpolate(liveWasserfluss, 230, -10, 300, -17);
    } else if (liveWasserfluss >= 85) {
        surferHeight = interpolate(liveWasserfluss, 85, 15, 230, -10);
    } else {
        surferHeight = 15; // Default value
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

