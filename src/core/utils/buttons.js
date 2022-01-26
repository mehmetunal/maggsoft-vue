const loading = (button) => {
    let el = createButtonInDivElement(button);
    el.dataset.icon = el.innerHTML;
    el.style.opacity = 0;
    setTimeout(() => {
        el.classList.add('spin');
        el.style.opacity = 1;
    }, 100);
}
const success = (button) => {
    let el = createButtonInDivElement(button);
    el.style.opacity = 0;
    setTimeout(() => {
        el.classList.remove('spin');
        el.style.opacity = 1;
        setTimeout(() => {
            el.style.opacity = 0;
            setTimeout(() => {
                el.innerHTML = el.dataset.icon;
                el.style.opacity = 1;
            }, 100);
        }, 500);
    }, 100);
}
const done = (button) => {
    let el = createButtonInDivElement(button);
    el.style.opacity = 0;
    setTimeout(() => {
        el.classList.remove('spin');
        el.innerHTML = el.dataset.icon;
        el.style.opacity = 1;
    }, 100);
}

const createButtonInDivElement = (button) => {
    let btn = document.querySelector(`#${button}`);
    if (btn === undefined || btn === null) {
        // eslint-disable-next-line no-undef
        console.log(`Error getting button ${button}`);
        return;
    } else {
        btn.appendChild(document.createElement("DIV"))
    }

    let el = document.querySelector(`#${button} > div`);
    if (el === undefined || el === null) {
        // eslint-disable-next-line no-undef
        console.log(`Error getting button ${button}`);
        return;
    }
    return el;
}

export {
    loading,
    done,
    success
}
