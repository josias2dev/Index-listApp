const select = (selector) => { return document.querySelector(selector) };
const selectAll = (selector) => { return document.querySelectorAll(selector) };

let buttonNew = select('#button-new');

if (buttonNew) {
    buttonNew.onclick = () => {
        let newData = select("#new");
        if (newData) {
            newData.style.display = "flex"
        }
    }
}

let close = select("#close");
if(close){
    close.onclick = () => select('#new').style.display = "none";
}