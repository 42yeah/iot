let fields = {};

function addProp() {
    const propCmd = document.querySelector("#prop").value.split(";");
    const propType = propCmd[0];
    const propName = propCmd[1];
    const propVal = propCmd[2];
    let propRange = undefined;
    if (propCmd.length >= 4) {
        propRange = propCmd[3];
    }
    fields[propName] = {
        propType,
        name: propName,
        value: propVal,
        range: propRange
    };
    const build = renderProps(fields);
    document.querySelector(".fields").innerHTML = build;
}

function submit() {
    let dev = new Device(
        document.querySelector("#name").value,
        document.querySelector("#avatar").value,
        fields
    );
    dev.state = document.querySelector("#state").value;
    console.log(JSON.stringify(dev));
}