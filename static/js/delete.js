let devices = JSON.parse(localStorage.getItem("devices"));
if (!devices) {
    devices = initializeDevices();
}

function render() {
    const list = document.querySelector(".devices");
    let build = "";

    for (let i = 0; i < devices.length; i++) {
        const device = devices[i];
        build += `<div class="device nohover">
        <div class="device-avatar" style="background-image: url(${device.avatar})"></div>
        <div class="device-name">
            ${device.name}
        </div>
        <div class="device-del" onclick="del(${i})">
            删除
        </div>
        </div>`;
    }
    list.innerHTML = build;
}

function del(index) {
    devices.splice(index, 1);
    localStorage.setItem("devices", JSON.stringify(devices));
    render();
}

window.addEventListener("load", render);
