function toggleDropdown(el) {
    const next = el.nextElementSibling;
    const rotate = el.querySelector(".rotate");
    if (next.classList.contains("opened")) {
        next.classList.remove("opened");
        rotate.classList.remove("right");
    } else {
        next.classList.add("opened");
        rotate.classList.add("right");
    }    
}

function randomArray(len) {
    let data = [];
    for (let i = 0; i < len; i++) {
        data.push(Math.floor(Math.random() * 100));
    }
    return data;
}

function renderChart(query, tags) {
    const ctx = document.querySelector(query).getContext("2d");
    let myChart = new Chart(ctx, {
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
}

window.addEventListener("load", main);
