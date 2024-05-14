console.log("Hello World!");

async function fetchData() {
    try {
        const response = await fetch('https://732516-12.web.fhgr.ch/endpoint.php');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function main() {
    let data = await fetchData();
    let lufttemperatur = data.data.lufttemperatur;
    let temperatur = data.data.temperatur;
    let unixtime = data.data.unixtime;
    let wasserfluss = data.data.wasserfluss;

    console.log(unixtime);

    const currentTime = Math.floor(Date.now() / 1000);
    const twentyFourHoursAgo = currentTime - (24 * 60 * 60);
    const latestTwentyFourHours = unixtime.filter(timestamp => timestamp >= twentyFourHoursAgo);
    const latestWasserfluss = wasserfluss.filter((_, index) => unixtime[index] >= twentyFourHoursAgo);

    const ctx = document.getElementById('wasserflussChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: latestTwentyFourHours.map(timestamp => new Date(timestamp * 1000).toLocaleTimeString('de-ch', {
                hour: '2-digit',
                minute: '2-digit'
            })),
            datasets: [{
                label: 'Wasserfluss',
                data: latestWasserfluss,
                backgroundColor: '#FFFFFF',
                borderColor: '#FFFFFF',
                borderWidth: 4
            }]
        },
        
        options: {

            scales: {
                x: {
                    title: {
                        display: false,
                        text: 'Zeit'
                    },
                    ticks: {  // Hier werden die Werte der X-Achse angepasst
                        display: true,
                        color: '#FFFFFF',  // Farbe der X-Achsen-Werte
                        font: {
                            family: 'Avenir',  // Schriftart der X-Achsen-Werte
                            size: 14,          // Schriftgröße der X-Achsen-Werte
                            weight: 'bold'     // Schriftgewicht der X-Achsen-Werte
                        }
                    }
                },
                y: {
                    title: {
                        display: false,
                        text: 'Wasserfluss in m³'
                    },
                    ticks: {  // Hier werden die Werte der Y-Achse angepasst
                        color: '#FFFFFF',  // Farbe der Y-Achsen-Werte
                        font: {
                            family: 'Avenir',  // Schriftart der Y-Achsen-Werte
                            size: 14,          // Schriftgröße der Y-Achsen-Werte
                            weight: 'Avenir LT Pro 750'     // Schriftgewicht der Y-Achsen-Werte
                        }
                    },
                    grid: {
                        color: '#374577',  // Farbe der horizontalen Linien
                        lineWidth: 3       // Dicke der horizontalen Linien
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                beforeDraw: (chart) => {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.fillStyle = '#000000'; // Hintergrundfarbe
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
                
            }
        }
    });
}

main();
