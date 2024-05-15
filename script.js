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
async function createChart () {
    let data = await fetchData();
    let lufttemperatur = data.data.lufttemperatur;
    let temperatur = data.data.temperatur;
    let unixtime = data.data.unixtime;
    let wasserfluss = data.data.wasserfluss;

    // console.log(`Lufttemperatur: ${lufttemperatur}`);
    // console.log(`Temperatur: ${temperatur}`);
    // console.log(unixtime);
    // console.log(`Wasserfluss: ${wasserfluss}`);

    // Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = currentTime - (24 * 60 * 60);

    // Filter the unixtime array to get the timestamps within the last 24 hours
    const latestTwentyFourHours = unixtime.filter(timestamp => timestamp >= twentyFourHoursAgo);

    // Filter the wasserfluss array to get the values within the last 24 hours
    let latestWasserfluss = wasserfluss.filter((_, index) => unixtime[index] >= twentyFourHoursAgo);
    // console.log(latestWasserfluss);

    let times = latestTwentyFourHours.map(timestamp => new Date(timestamp * 1000).toLocaleTimeString('de-ch', {hour: '2-digit', minute: '2-digit', hour12: false}))
    
    const level = latestWasserfluss.flat();
    const unten = Math.min(...level) - 5;
    const oben = Math.max(...level) + 5;

    // console.log(unten);
    // console.log(oben);

    // Create a line chart
    const ctx = document.getElementById('wasserflussChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: latestTwentyFourHours.map(timestamp => new Date(timestamp * 1000).toLocaleTimeString('de-ch', {day:'2-digit', month:'2-digit', year:'2-digit', hour: '2-digit', minute: '2-digit', hour12: false})),
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
                    ticks: {
                        maxTicksLimit: 12,
                        callback: (val, index) => {
                            return new Date('Tue May 14 2024 ' + times[val] + ':22 GMT+0200').toLocaleTimeString('de-ch', {hour: '2-digit', minute: '2-digit', hour12: false}).replace(/:\d+$/, ':00');
                        },
                        color: '#FFFFFF',  // Farbe der X-Achsen-Werte
                        font: {
                            family: 'Avenir',  // Schriftart der X-Achsen-Werte
                            size: 14,          // Schriftgröße der X-Achsen-Werte
                            weight: 'bold'     // Schriftgewicht der X-Achsen-Werte
                        }
                    },

                    
                
                    // type: 'time',
                    // time: {
                    //     unit: 'day',
                    //     displayFormats: {
                    //         day: 'DD.MM HH:M'
                    //     }
                    // },

                    // title: {
                    //     display: true,
                    //     text: 'Uhrzeit'
                    // }
                },
                y: {
                     min: unten, // Set the minimum value of y-axis to 50
                     max: oben, // Set the maximum value of y-axis to 200
                    title: {
                        display: true,
                        text: 'Wasserfluss in m3/s',
                        color: '#FFFFFF',  // Farbe der X-Achsen-Werte
                        font: {
                            family: 'Avenir',  // Schriftart der X-Achsen-Werte
                            size: 14,          // Schriftgröße der X-Achsen-Werte
                            weight: 'bold',     // Schriftgewicht der X-Achsen-Werte
                        }
                    },
                    ticks: {
                        min: unten,
                        max: oben,
                        color: '#FFFFFF',  // Farbe der X-Achsen-Werte
                        font: {
                            family: 'Avenir',  // Schriftart der X-Achsen-Werte
                            size: 14,          // Schriftgröße der X-Achsen-Werte
                            weight: 'bold'     // Schriftgewicht der X-Achsen-Werte
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
                beforeDraw: (chart) => {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.fillStyle = '#000000'; // Hintergrundfarbe
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                },
                verticalLine: 7 // Initialize as undefine
                
            }
        },
        plugins: [verticalLinePlugin]
    });

// Get the slider element
const slider = document.getElementById('slider');

// Add an event listener to the slider to draw the vertical line
slider.addEventListener('input', function () {
    myChart.options.plugins.verticalLine = this.value;
    console.log(this.value);
    myChart.update();
});
}

// Plugin for drawing the vertical line
const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw: (chart) => {
        if (chart.options.plugins.verticalLine !== undefined) {
            const ctx = chart.ctx;
            const xAxis = chart.scales.x;
            const yAxis = chart.scales.y;
            const value = chart.options.plugins.verticalLine;
            const index = value - 1;

            if (index >= 0 && index < xAxis.ticks.length) {
                const x = xAxis.getPixelForTick(index);
                const label = chart.data.labels[index];
                const yValue = chart.data.datasets[0].data[index];

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, yAxis.top);
                ctx.lineTo(x, yAxis.bottom);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#FF0000';
                ctx.stroke();

                // Draw the value label
                ctx.font = 'bold 14px Avenir';
                ctx.fillStyle = '#FF0000';
                ctx.fillText(yValue, x + 5, yAxis.top + 20);
                ctx.restore();
            }
        }
    }
};
   
createChart ();

