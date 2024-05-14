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
    // console.log(`Unixtime: ${unixtime}`);
    // console.log(`Wasserfluss: ${wasserfluss}`);

    // Create a line chart
    const ctx = document.getElementById('wasserflussChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: unixtime,
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
                    type: 'time',
                    time: {
                        unit: 'second'
                    },
                    title: {
                        display: true,
                        text: 'Unixtime'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Wasserfluss'
                    }
                }
            }
        }
    });
}
   
main ();