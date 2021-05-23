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
        let date = new Date(event.date);
        let anomaly = event.state.indexOf("异常") != -1 ? "anomaly" : "";
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
    if (device.events.length > 0) {
        eventPane = `
        <div class="pane">
            <h5>参数图表</h5>
            
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
}
