class Device {
    constructor(name, avatar, props) {
        this.name = name;
        this.avatar = avatar;
        this.state = "RUNNING"; // RUNNING, STOPPED
        this.props = props;
    }
}

function initializeDevices() {
    let devices = [
        new Device("热水卡", "/static/assets/hot_water.jpeg", {
            "余额": 100
        }),
        new Device("遥控车", "/static/assets/rc_car.jpg", {
            "车速": 0,
            "朝向": Math.PI * 0.5
        }),
        new Device("空调", "/static/assets/ac.png", {
            "温度": 26
        })
    ];
    devices[2].state = "STOPPED";
    localStorage.setItem("devices", JSON.stringify(devices));
    return devices;
}

function renderDevices() {
    const list = document.querySelector(".devices");
    let devices = JSON.parse(localStorage.getItem("devices"));
    if (!devices) {
        devices = initializeDevices();
    }
    let build = "";

    for (let i = 0; i < devices.length; i++) {
        const device = devices[i];
        let state = "";
        switch (device.state) {
            case "RUNNING":
                state = "正在运行";
                break;

            case "STOPPED":
                state = "已停止";
                break;

            default:
                state = "正忙";
                break;
        }
        build += `<div class="device">
        <div class="device-avatar" style="background-image: url(${device.avatar})"></div>
        <a href="/devices/${device.name}" class="device-name">
            ${device.name}
        </a>
        <div class="device-state dim">
            ${state}
        </div>
        </div>`;
    }
    list.innerHTML = build;
}
