console.log("Hello World!");

async function fetchData() {
    try {
        const response = await fetch ('https://732516-12.web.fhgr.ch/endpoint.php');
        const data = await response.json();
        //console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

//asynchrone funktion mit await überprüfen 
async function main () {
    let data = await fetchData();
    let lufttemperatur = data.data.lufttemperatur;
    let temperatur = data.data.temperatur;
    let unixtime = data.data.unixtime;
    let wasserfluss = data.data.wasserfluss;

    // console.log(`Lufttemperatur: ${lufttemperatur}`);
    // console.log(`Temperatur: ${temperatur}`);
     console.log(unixtime);
    // console.log(`Wasserfluss: ${wasserfluss}`);

    // Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = currentTime - (24 * 60 * 60);

    // Filter the unixtime array to get the timestamps within the last 24 hours
    const latestTwentyFourHours = unixtime.filter(timestamp => timestamp >= twentyFourHoursAgo);

    // Filter the wasserfluss array to get the values within the last 24 hours
    const latestWasserfluss = wasserfluss.filter((_, index) => unixtime[index] >= twentyFourHoursAgo);

     

    // Create a line chart
    const ctx = document.getElementById('wasserflussChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: latestTwentyFourHours.map(timestamp => new Date(timestamp * 1000).toLocaleTimeString('de-ch', {hour: '2-digit', minute: '2-digit'})),
            datasets: [{
                label: 'Wasserfluss',
                data: wasserfluss,
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Zeit'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Wasserfluss in m3'
                    }
                }
            }
        }
    });
}
   
main ();