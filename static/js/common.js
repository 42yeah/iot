function toggleDropdown(el) {
    const next = el.nextElementSibling;
    const rotate = el.querySelector(".rotate");
    if (next.classList.contains("opened")) {
        next.classList.remove("opened");
        rotate.classList.remove("right");
    } else {
        next.classList.add("opened");
        rotate.classList.add("right");
    }    
}

function linkCheckboxes() {
    const checkboxes = document.querySelectorAll(".checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        checkbox.addEventListener("click", () => {
            if (checkbox.classList.contains("running")) {
                checkbox.classList.remove("running");
            } else {
                checkbox.classList.add("running");
            }
        });
    }
}

window.addEventListener("load", linkCheckboxes);
