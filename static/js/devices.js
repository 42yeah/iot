let deviceIndex = -1;
let devices = JSON.parse(localStorage.getItem("devices"));
if (!devices) {
    devices = initializeDevices();
}

function save() {
    let device = devices[deviceIndex];
    device.name = document.querySelector("#name").value;
    const running = document.querySelector("#running").classList.contains("running");
    device.state = running ? "RUNNING" : "STOPPED";
    let props = document.querySelector(".fields").children;
    for (let i = 0; i < props.length; i++) {
        // Find input, and if failed, find select
        const prop = props[i];
        let input = prop.querySelector("input");
        if (input == null) {
            input = prop.querySelector("select");
        }
        device.props[input.id].value = input.value;
    }
    devices[deviceIndex] = device;
    localStorage.setItem("devices", JSON.stringify(devices));
    window.location = "/devices";
}

function addEvent() {
    const eventCmd = document.querySelector("#event-field").value.split(";");
    let event = {
        name: eventCmd[0],
        info: eventCmd[1],
        date: new Date(eventCmd[2]),
        state: eventCmd[3]
    };
    devices[deviceIndex].events.push(event);
    localStorage.setItem("devices", JSON.stringify(devices));
}

function render(name) {
    const devicePanes = document.querySelector("#device-panes");
    let tip = "选择相应设备查看设备详情。 ";
    for (let i = 0; i < devices.length; i++) {
        if (devices[i].name == name) {
            deviceIndex = i;
            break;
        }
    }
    if (deviceIndex == -1) {
        if (name != "") {
            tip = "设备未找到：" + name + "。";
        }
        devicePanes.innerHTML = `
        <div class="pane warning-pane">
            <h5>${tip}</h5>
        </div>
        <div class="pane">
            <h5>设备一览</h5>
            <div class="devices">
                
            </div>
        </div>`;
        renderDevices();
        return;
    }
    const device = devices[deviceIndex];
    let props = renderProps(device.props);
    let running = device.state == "RUNNING" ? "running" : "";
    let events = "";
    let eventCount = {};
    let anomalies = 0;

    function t(a) {
        if (a < 10) {
            return "0" + a;
        }
        return a;
    }

    device.events = device.events.sort((a, b) => {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);
        return aDate < bDate ? -1 : 1;
    });

    for (let i = 0; i < device.events.length; i++) {
        const event = device.events[i];
        if (!(event.name in eventCount)) {
            eventCount[event.name] = 1;
        } else {
            eventCount[event.name]++;
        }
        let date = new Date(event.date);
        let anomaly = event.state.indexOf("异常") != -1 ? "anomaly" : "";
        if (anomaly == "anomaly") {
            anomalies++;
        }
        let dateStr = date.getFullYear() + "-" + t(date.getMonth() + 1) + "-" + t(date.getDate()) 
            + " " + t(date.getHours()) + ":" + t(date.getMinutes()) + ":" + t(date.getSeconds());
        events += `
        <tr>
            <td>${event.name}</td>
            <td>${event.info}</td>
            <td>${dateStr}</td>
            <td class="${anomaly}">${event.state}</td>
        </tr>
        `;
    }
    let eventPane = "";
    let renderCharts = false;
    if (device.events.length > 0) {
        renderCharts = true;
        eventPane = `
        <div class="pane">
            <h5>事件统计</h5>
            <div class="field">
                <div class="field charts">
                    <div class="chart">
                        <canvas id="events-chart"></canvas>
                    </div>
                    <div class="chart">
                        <canvas id="anomaly-chart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="pane">
            <h5>事件</h5>
            <div class="table-holder">
                <table cellspacing="0" class="event-table" id="event-table">
                    <thead>
                        <tr>
                            <th>类别</th>
                            <th>详情</th>
                            <th>时间</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${events}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="pane">
            <h5>事件时序</h5>
            <div class="field">
                <div class="toolbar">
                    <div id="hourly" class="toolbar-button active" onclick="renderSummaryChart('hourly')">按小时</div>
                    <div id="daily" class="toolbar-button" onclick="renderSummaryChart('daily')">按天</div>
                    <div id="monthly" class="toolbar-button" onclick="renderSummaryChart('monthly')">按月</div>
                </div>
            </div>
            <div class="field big-chart">
                <canvas id="summary"></canvas>
            </div>
        </div>`;
    } else {
        eventPane = `
        <div class="pane">
            <h5>事件</h5>
            <p class="field">当前设备还未记录事件。</p>
        </div>`;
    }
    devicePanes.innerHTML = `
    <div class="pane">
        <h5>${device.name}</h5>
        <div class="props">
            <div class="device-avatar-d">
                <img src="${device.avatar}">
            </div>
            <div>
                <div>
                    <label for="name">设备名</label>
                    <input id="name" value="${device.name}">
                </div>
                <div class="fields">
                    ${props}
                </div>
                <div class="field">
                    <div id="running" class="checkbox ${running}">正在运行</div>
                </div>
                <div class="submit">
                    <div class="button" onclick="save()">保存</div>
                </div>
            </div>
        </div>
    </div>
    ${eventPane}
    <div class="pane">
        <h5>添加事件</h5>
        <div class="field">
            <input id="event-field">
        </div>
        <div>
            <a class="button" onclick="addEvent()">添加</a>
        </div>
    </div>`;

    if (renderCharts) {
        // Render charts
        new Chart(document.querySelector("#events-chart").getContext("2d"), {
            type: "bar",
            data: {
                labels: Object.keys(eventCount),
                datasets: [{
                    label: '事件频率',
                    data: Object.values(eventCount),
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

        new Chart(document.querySelector("#anomaly-chart").getContext("2d"), {
            type: "pie",
            data: {
                labels: ["正常", "异常"],
                datasets: [{
                    label: '正常/异常',
                    data: [device.events.length, anomalies],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 120, 99, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 120, 99, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {}
        });

        renderSummaryChart("hourly");
    }
}

let currentSummaryChart = null;

function renderSummaryChart(mode) {
    let events = devices[deviceIndex].events;

    events = events.sort((a, b) => {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);
        return aDate < bDate ? -1 : 1;
    });

    function t(a) {
        if (a < 10) {
            return "0" + a;
        }
        return a;
    }

    function r() {
        return Math.floor(Math.random() * 255);
    }

    function zeros(n) {
        let ret = [];
        for (let i = 0; i < n; i++) {
            ret.push(0);
        }
        return ret;
    }

    function getLabel(mode, date) {
        let label = "";
        switch (mode) {
            case "daily":
                label = date.getFullYear() + "-" + t(date.getMonth() + 1) + "-" + t(date.getDate());
                break;

            case "monthly":
                label = date.getFullYear() + "-" + t(date.getMonth() + 1);
                break;

            case "hourly":
            default:
                label = date.getFullYear() + "-" + t(date.getMonth() + 1) + "-" + t(date.getDate())
                    + " " + t(date.getHours()) + ":00";
                break;
        }
        return label;
    }

    let labels = [];
    let eventsHappened = [];
    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        event.date = new Date(event.date);
        let label = getLabel(mode, event.date);
        let index = labels.findIndex((x) => {
            return x == label;
        });
        if (index == -1) {
            labels.push(label);
            eventsHappened.push(0);
            index = labels.length - 1;
        }
        eventsHappened[index]++;
    }
    let datasets = [
        {
            type: "line",
            label: "事件数量",
            data: eventsHappened,
            borderColor: "rgba(79, 86, 118, 1)",
            cubicInterpolationMode: "monotone",
            tension: 0.4,
            yAxisID: "y"
        },
        {
            type: "bar",
            label: "异常数量",
            data: zeros(labels.length),
            backgroundColor: ["rgba(253, 102, 43, 0.2)"],
            yAxisID: "y1"
        }
    ];
    for (let i = 0; i < events.length; i++) {
        let label = getLabel(mode, events[i].date);
        let index = labels.findIndex((x) => {
            return x == label;
        });
        let datasetIndex = datasets.findIndex((x) => {
            return x.label == events[i].name;
        });
        if (datasetIndex == -1) {
            let color = `${r()}, ${r()}, ${r()}`;
            datasets.push({
                type: "line",
                label: events[i].name,
                data: zeros(labels.length),
                borderColor: `rgba(${color}, 1)`,
                backgroundColor: `rgba(${color}, 0.2)`,
                cubicInterpolationMode: "monotone",
                tension: 0.4,
                fill: true,
                yAxisID: "y"
            });
            datasetIndex = datasets.length - 1;
        }
        datasets[datasetIndex].data[index]++;
        if (events[i].state.indexOf("异常") != -1) {
            datasets[1].data[index]++;
        }
    }

    if (currentSummaryChart != null) {
        currentSummaryChart.destroy();
    }

    currentSummaryChart = new Chart(document.querySelector("#summary").getContext("2d"), {
        data: {
            labels,
            datasets
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true
                },
                y: {
                    display: true,
                    position: "left"
                },
                y1: {
                    display: true,
                    position: "right"
                }
            }
        }
    });

    document.querySelector("#hourly").classList.remove("active");
    document.querySelector("#daily").classList.remove("active");
    document.querySelector("#monthly").classList.remove("active");
    document.querySelector("#" + mode).classList.add("active");
}
