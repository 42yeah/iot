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
    
}
