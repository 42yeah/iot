class Device {
    constructor(name, avatar, props) {
        this.name = name;
        this.avatar = avatar;
        this.state = "RUNNING"; // RUNNING, STOPPED
        this.props = props;
        this.events = [];
    }
}

function initializeDevices() {
    let devices = [
        {"name":"热水卡","avatar":"/static/assets/hot_water.jpeg","state":"RUNNING","props":{"余额":{"propType":"int","name":"余额","value":"100"}},"events":[]},
        {"name":"餐饮收费机","avatar":"/static/assets/cashier.png","state":"STOPPED","props":{"屏幕显示方式":{"propType":"text","name":"屏幕显示方式","value":"LCD 汉字"},"通讯接口":{"propType":"sel","name":"通讯接口","value":"RS485","range":"RS485:TCP/IP:GRRS:CDMA:CANBUS:WIFI"},"显示范围（金额）":{"propType":"int","name":"显示范围（金额）","value":"99999.99"},"显示范围（汉字）":{"propType":"int","name":"显示范围（汉字）","value":"5"},"结算方式":{"propType":"text","name":"结算方式","value":"金额、单价、份数、菜号、次数"},"读卡距离（cm）":{"propType":"int","name":"读卡距离（cm）","value":"5"},"电源电压（V）":{"propType":"int","name":"电源电压（V）","value":"220"},"重量（Kg）":{"propType":"int","name":"重量（Kg）","value":"0.8"},"键盘类型":{"propType":"sel","name":"键盘类型","value":"触摸按键","range":"触摸按键:机器按键"},"升级方式":{"propType":"sel","name":"升级方式","value":"RS485","range":"RS485:TCP/IP 升级:UART 下载:U 盘文件升级"},"卡片类型":{"propType":"sel","name":"卡片类型","value":"M1 卡","range":"M1 卡:CPU 卡:SIMPASS:UIMPASS"},"断电数据保护时间":{"propType":"int","name":"断电数据保护时间","value":"10","range":"5-100"}},"events":[]},
        {"name":"预付费水表","avatar":"/static/assets/water_meter.png","state":"RUNNING","props":{"产品型号":{"propType":"sel","name":"产品型号","value":"15 口径","range":"15 口径:20 口径:25 口径"},"水表性能":{"propType":"sel","name":"水表性能","value":"B 级","range":"A 级:B 级:C 级"},"支持卡类型":{"propType":"sel","name":"支持卡类型","value":"ISO14443 TYPE A/B接触式CPU卡，Mifare卡系列","range":"ISO14443 TYPE A/B接触式CPU卡，Mifare卡系列"},"电池寿命":{"propType":"int","name":"电池寿命","value":"6","range":"1-10"},"最小读数（m³）":{"propType":"real","name":"最小读数（m³）","value":"0.1"},"最大读数（m³）":{"propType":"real","name":"最大读数（m³）","value":"9999.9"},"材料":{"propType":"sel","name":"材料","value":"铜","range":"铜:不锈钢"},"重量（Kg）":{"propType":"real","name":"重量（Kg）","value":"1.7"}},"events":[{"name":"开闸","info":"水表已开闸","date":"2021-04-24T11:15:42.568Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-04-24T11:24:42.568Z","state":"正常"},{"name":"充值","info":"水表余额 +100","date":"2021-04-24T19:00:01.000Z","state":"异常：非法充值"},{"name":"开闸","info":"水表已开闸","date":"2021-04-25T12:05:51.322Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-04-25T12:10:51.322Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-04-26T12:11:54.742Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-04-26T12:20:54.742Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-04-27T13:11:51.419Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-04-27T13:21:51.419Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-04-28T13:43:49.628Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-04-28T13:48:49.628Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-04-29T13:56:56.057Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-04-29T14:03:56.057Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-04-29T23:13:22.000Z","state":"异常：时间段错误"},{"name":"关闸","info":"水表已关闸","date":"2021-04-29T23:18:08.000Z","state":"异常：时间段错误"},{"name":"开闸","info":"水表已开闸","date":"2021-04-30T14:27:49.324Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-04-30T14:32:49.324Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-01T14:43:16.220Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-01T14:53:16.220Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-02T15:30:48.328Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-02T15:39:48.328Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-03T15:46:34.909Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-03T15:56:34.909Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-04T16:37:45.407Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-04T16:43:45.407Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-05T16:59:38.951Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-05T17:11:38.951Z","state":"正常"},{"name":"充值","info":"水表余额 +100","date":"2021-05-05T19:00:03.000Z","state":"异常：非法充值"},{"name":"开闸","info":"水表已开闸","date":"2021-05-06T17:40:18.673Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-06T17:50:18.673Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-07T17:42:16.142Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-07T17:51:16.142Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-08T17:47:23.170Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-08T17:55:23.170Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-09T18:13:21.706Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-09T18:22:21.706Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-10T18:55:41.538Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-10T19:02:41.538Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-11T19:51:01.942Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-11T20:04:01.942Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-12T20:47:33.569Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-12T20:52:33.569Z","state":"正常"},{"name":"开闸","info":"水表已开闸","date":"2021-05-13T21:23:37.861Z","state":"正常"},{"name":"关闸","info":"水表已关闸","date":"2021-05-13T21:29:37.861Z","state":"正常"}]},
        {"name":"GM-MA-AC04_HP202 通道门","avatar":"/static/assets/door.png","state":"RUNNING","props":{"尺寸":{"propType":"text","name":"尺寸","value":"1550*500*80mm"},"重量（Kg）":{"propType":"real","name":"重量（Kg）","value":"60"},"工作频段（MHz）":{"propType":"text","name":"工作频段（MHz）","value":"902～928"},"工作温度（℃）":{"propType":"text","name":"工作温度（℃）","value":"-20～60"},"储存温度（℃）":{"propType":"text","name":"储存温度（℃）","value":"-30～70"},"环境湿度":{"propType":"text","name":"环境湿度","value":"5%～95%"},"供电电源":{"propType":"text","name":"供电电源","value":"AC 220V±10%55Hz"},"整机功耗（W）":{"propType":"int","name":"整机功耗（W）","value":"45"}},"events":[{"name":"开门","info":"无","date":"2021-04-23T08:48:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T08:55:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T08:58:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T09:06:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T09:15:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T09:23:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T09:27:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T09:30:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T09:35:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T09:38:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T09:41:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T09:43:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T09:52:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T09:52:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T09:54:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T10:02:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T10:09:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T10:12:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T10:15:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T10:16:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T10:17:20.000Z","state":"正常"},{"name":"未知","info":"消息接收错误","date":"2021-04-23T10:17:27.000Z","state":"异常：接收错误"},{"name":"开门","info":"无","date":"2021-04-23T10:17:30.000Z","state":"异常：重复开门"},{"name":"关门","info":"无","date":"2021-04-23T10:23:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T10:25:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T10:25:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T10:31:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T10:35:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T10:35:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T10:36:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T10:36:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T10:42:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T10:44:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T10:44:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T10:50:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T10:55:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T10:57:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T11:02:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T11:06:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T11:12:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T11:14:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T11:18:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T11:19:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T11:26:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T11:29:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T11:29:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T11:29:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T11:33:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T11:37:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T11:40:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T11:41:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T11:46:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T11:53:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T12:02:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T12:05:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T12:09:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T12:11:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T12:17:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T12:18:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T12:25:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T12:31:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T12:37:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T12:37:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T12:46:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T12:49:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T12:52:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T12:54:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T12:59:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T12:59:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T13:03:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T13:12:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T13:16:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T13:25:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T13:26:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T13:35:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T13:36:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T13:38:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T13:39:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T13:47:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T13:47:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T13:53:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T14:00:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T14:02:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T14:08:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T14:09:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T14:11:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T14:16:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T14:25:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T14:28:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T14:28:29.000Z","state":"异常：频繁开关"},{"name":"开门","info":"无","date":"2021-04-23T14:28:32.000Z","state":"异常：频繁开关"},{"name":"关门","info":"无","date":"2021-04-23T14:37:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T14:40:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T14:47:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T14:55:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T15:04:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T15:06:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T15:13:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T15:19:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T15:23:27.951Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T15:28:27.951Z","state":"正常"},{"name":"关门","info":"无","date":"2021-04-23T15:29:27.951Z","state":"正常"},{"name":"锁门","info":"门已上锁","date":"2021-04-23T15:30:00.000Z","state":"正常"},{"name":"开门","info":"无","date":"2021-04-23T17:30:03.000Z","state":"异常：门已上锁"}]}
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
