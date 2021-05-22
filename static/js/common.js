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
