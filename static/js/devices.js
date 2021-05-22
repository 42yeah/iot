function render(name) {
    let devices = JSON.parse(localStorage.getItem("devices"));
    if (!devices) {
        devices = initializeDevices();
    }
    const devicePanes = document.querySelector("#device-panes");
    let tip = "选择相应设备查看设备详情。 ";
    let device = null;
    for (let i = 0; i < devices.length; i++) {
        if (devices[i].name == name) {
            device = devices[i];
            break;
        }
    }
    if (!device) {
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
    let props = "";
    let running = device.state == "RUNNING" ? "running" : "";
    for (prop in device.props) {
        props += `
        <div class="field">
            <label for="${prop}">${prop}</label>
            <input id="${prop}" value="${device.props[prop]}">
        </div>
        `;
    }
    devicePanes.innerHTML = `
    <div class="pane">
        <h5>${device.name}</h5>
        <div class="props">
            <div class="device-avatar-d">
                <img src="${device.avatar}">
            </div>
            <div class="props-list">
                <div>
                    <label for="name">设备名</label>
                    <input id="name" value="${device.name}">
                </div>
                ${props}
                <div class="field">
                    <div class="checkbox ${running}">正在运行</div>
                </div>
                <div class="submit">
                    <div class="button">保存</div>
                </div>
            </div>
        </div>
    </div>`;
}
