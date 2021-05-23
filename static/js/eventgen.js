// Generates fake event.

let d = new Date();
d.setMonth(3);
let open = false;
let es = [];

for (let i = 0; i < 100; i++) {
    d = new Date(d.getTime() + Math.floor(10 * Math.random()) * 60000);
    open = !open;
    es.push({
        name: open ? "开门" : "关门",
        info: "无",
        date: d,
        state: "正常"
    });
}

// window.addEventListener("load", () => {
//     devices[deviceIndex].events = es;
//     localStorage.setItem("devices", JSON.stringify(devices));
// });

