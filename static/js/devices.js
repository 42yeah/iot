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
    for (let i = 0; i < device.events.length; i++) {
        const event = device.events[i];
        let anomaly = device.state.contains("异常") ? "anomaly" : "";
        events += `
        <tr>
            <td>${event.name}</td>
            <td>${event.info}</td>
            <td>${event.date}</td>
            <td class="${anomaly}">${event.state}</td>
        </tr>
        `;
    }
    let eventPane = "";
    if (device.events.length > 0) {
        eventPane = `
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
    ${eventPane}`;
}
