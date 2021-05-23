function randomArray(len) {
    let data = [];
    for (let i = 0; i < len; i++) {
        data.push(Math.floor(Math.random() * 100));
    }
    return data;
}

function renderChart(query, tags) {
    const ctx = document.querySelector(query).getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: tags,
            datasets: [{
                label: '在线时间',
                data: randomArray(tags.length),
                backgroundColor: [
                    'rgba(45, 120, 99, 0.2)'
                ],
                borderColor: [
                    'rgba(45, 120, 99, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function main() {
    renderChart("#chart1", ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00"]);
    renderDevices();
    activeMenuItem(document.querySelector(".menu-list"), "控制台");

    let devices = JSON.parse(localStorage.getItem("devices"));
    if (!devices) {
        devices = initializeDevices();
    }
    let onlines = 0;
    let anomalies = 0;
    for (let i = 0; i < devices.length; i++) {
        if (devices[i].state == "RUNNING") {
            onlines++;
        }
        for (let j = 0; j < devices[i].events.length; j++) {
            if (devices[i].events[j].state.indexOf("异常") != -1) {
                anomalies++;
            }
        }
    }
    document.querySelector("#onlines").innerHTML = onlines;
    document.querySelector("#anomalies").innerHTML = anomalies;
}

window.addEventListener("load", main);
