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

function activeMenuItem(list, item) {
    const children = list.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child.classList.contains("menu-item")) {
            continue;
        }
        if (child.onclick) {
            const folder = child.nextElementSibling;
            if (activeMenuItem(folder, item)) {
                toggleDropdown(child);
                return true;
            }
        }
        if (child.innerText.trim() == item) {
            child.classList.add("active");
            return true;
        }
    }
    return false;
}

window.addEventListener("load", linkCheckboxes);
