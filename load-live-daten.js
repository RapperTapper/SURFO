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

//asynchrone funktion mit await überprüfen 
async function ouputLatestValuesToDom () {
    let data = await fetchData();
    let wasserfluss = data.data.wasserfluss;
    let wassertemperatur = data.data.temperatur;
    let lufttemperatur = data.data.lufttemperatur;
    
    wassertemperatur = wassertemperatur.toFixed(1).padStart(4, '0');

    document.getElementById('element-lufttemperatur').textContent = lufttemperatur + '°';
    document.getElementById('element-wassertemperatur').textContent = wassertemperatur + '°';
    document.getElementById('element-wasserfluss').textContent = wasserfluss;

    setTimeout(ouputLatestValuesToDom, 5000);

}
   
ouputLatestValuesToDom ();