// Generates fake event.

let d = new Date();
d.setMonth(3);
let es = [];

for (let i = 0; i < 20; i++) {
    d = new Date(d.getTime() + 86400000 + Math.floor(Math.random() * 3600000));
    d1 = new Date(d.getTime() + Math.floor(5 + Math.random() * 10) * 60000);
    es.push({
        name: "开闸",
        info: "水表已开闸",
        date: d,
        state: "正常"
    });
    es.push({
        name: "关闸",
        info: "水表已关闸",
        date: d1,
        state: "正常"
    });
}

// console.log(es);

// window.addEventListener("load", () => {
//     devices[deviceIndex].events = es;
//     localStorage.setItem("devices", JSON.stringify(devices));
// });

