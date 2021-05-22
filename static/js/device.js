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
        {"name":"热水卡","avatar":"/static/assets/hot_water.jpeg","state":"RUNNING","props":{"余额":{"propType":"int","name":"余额","value":"100"}}},
        {"name":"餐饮收费机","avatar":"/static/assets/cashier.png","state":"RUNNING","props":{"屏幕显示方式":{"propType":"text","name":"屏幕显示方式","value":"LCD 汉字"},"通讯接口":{"propType":"sel","name":"通讯接口","value":"RS485","range":"RS485:TCP/IP:GRRS:CDMA:CANBUS:WIFI"},"显示范围（金额）":{"propType":"int","name":"显示范围（金额）","value":"99999.99"},"显示范围（汉字）":{"propType":"int","name":"显示范围（汉字）","value":"5"},"结算方式":{"propType":"text","name":"结算方式","value":"金额、单价、份数、菜号、次数"},"读卡距离（cm）":{"propType":"int","name":"读卡距离（cm）","value":"5"},"电源电压（V）":{"propType":"int","name":"电源电压（V）","value":"220"},"重量（Kg）":{"propType":"int","name":"重量（Kg）","value":"0.8"},"键盘类型":{"propType":"sel","name":"键盘类型","value":"触摸按键","range":"触摸按键:机器按键"},"升级方式":{"propType":"sel","name":"升级方式","value":"RS485","range":"RS485:TCP/IP 升级:UART 下载:U 盘文件升级"},"卡片类型":{"propType":"sel","name":"卡片类型","value":"M1 卡","range":"M1 卡:CPU 卡:SIMPASS:UIMPASS"},"断电数据保护时间":{"propType":"int","name":"断电数据保护时间","value":"10","range":"5-100"}}},
        {"name":"预付费水表","avatar":"/static/assets/water_meter.png","state":"RUNNING","props":{"产品型号":{"propType":"sel","name":"产品型号","value":"15 口径","range":"15 口径:20 口径:25 口径"},"水表性能":{"propType":"sel","name":"水表性能","value":"B 级","range":"A 级:B 级:C 级"},"支持卡类型":{"propType":"sel","name":"支持卡类型","value":"ISO14443 TYPE A/B接触式CPU卡，Mifare卡系列","range":"ISO14443 TYPE A/B接触式CPU卡，Mifare卡系列"},"电池寿命":{"propType":"int","name":"电池寿命","value":"6","range":"1-10"},"最小读数（m³）":{"propType":"real","name":"最小读数（m³）","value":"0.1"},"最大读数（m³）":{"propType":"real","name":"最大读数（m³）","value":"9999.9"},"材料":{"propType":"sel","name":"材料","value":"铜","range":"铜:不锈钢"},"重量（Kg）":{"propType":"real","name":"重量（Kg）","value":"1.7"}}},
        {"name":"GM-MA-AC04_HP202 通道门","avatar":"/static/assets/door.png","state":"RUNNING","props":{"尺寸":{"propType":"text","name":"尺寸","value":"1550*500*80mm"},"重量（Kg）":{"propType":"real","name":"重量（Kg）","value":"60"},"工作频段（MHz）":{"propType":"text","name":"工作频段（MHz）","value":"902～928"},"工作温度（℃）":{"propType":"text","name":"工作温度（℃）","value":"-20～60"},"储存温度（℃）":{"propType":"text","name":"储存温度（℃）","value":"-30～70"},"环境湿度":{"propType":"text","name":"环境湿度","value":"5%～95%"},"供电电源":{"propType":"text","name":"供电电源","value":"AC 220V±10%55Hz"},"整机功耗（W）":{"propType":"int","name":"整机功耗（W）","value":"45"}}}
    ];
    localStorage.setItem("devices", JSON.stringify(devices));
    return devices;
}

function renderProps(fields) {
    let build = "";
    for (key in fields) {
        let prop = fields[key];
        let field = "";
        let displayValue = "";
        switch (prop.propType) {
            case "int":
                if (!prop.range) {
                    field = `<input id="${prop.name}" type="number" step="1" value="${prop.value}">`;
                } else {
                    let r = prop.range.split("-");
                    field = `<input onchange="document.querySelector('[for=\\'${prop.name}\\']').innerHTML = '${prop.name}：' + this.value" type="range" min="${r[0]}" max="${r[1]}" value="${prop.value}" class="slider" id="${prop.name}">`;
                    displayValue = `：${prop.value}`;
                }
                break;

            case "real":
                if (!prop.range) {
                    field = `<input id="${prop.name}" type="number" step="0.01" value="${prop.value}">`;
                } else {
                    let r = prop.range.split("-");
                    field = `<input onchange="document.querySelector('[for=\\'${prop.name}\\']').innerHTML = '${prop.name}：' + this.value" type="range" min="${r[0]}" max="${r[1]}" value="${prop.value}" class="slider" id="${prop.name}">`;
                    displayValue = `：${prop.value}`;
                }
                break;

            case "text":
                field = `<input id="${prop.name}" type="text" value="${prop.value}">`;
                break;

            case "sel":
                field = `<select id="${prop.name}">`;
                let r = prop.range.split(":");
                for (let i = 0; i < r.length; i++) {
                    let selected = "";
                    if (r[i] == prop.value) {
                        selected = "selected";
                    }
                    field += `<option ${selected} value="${r[i]}">${r[i]}</option>`;
                }
                field += `</select>`;
                break;

            default:
                field = `<input id="${prop.name}" value="${prop.value}">`;
                break;
        }
        build += `
        <div class="field">
            <label for="${prop.name}">${prop.name}${displayValue}</label>
            ${field}
        </div>`;
    }
    return build;
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
