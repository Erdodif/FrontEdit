window.addEventListener("DOMContentLoaded", init);
function init() {
    document.getElementById("sample").addEventListener("input", sampleEdited);
    document.getElementById("size").addEventListener("input", textSizeEdited);
    document.getElementById("foreground").addEventListener("change", foregroundEdited);
    document.getElementById("background").addEventListener("change", backgroundEdited);
    document.getElementById("restore").addEventListener("click", restoreDefault);
}
function sampleEdited() {
    clearError("sample");
    let text = document.getElementById("sample").value.trim();
    if (text === null || text === undefined || text === "") {
        displayError("sample","A szövegdoboz nem lehet üres!");
    }
    else{
        document.getElementById("preview").innerHTML = text;
    }
}
function textSizeEdited() {
    clearError("size");
    let text = document.getElementById("size").value.trim();
    if (isNaN(text) || text === null || text === undefined || text === "") {
        displayError("size", "A betűméretnek számnak kell lennie!");
    }
    else if (text < 10){
        displayError("size", "A betűk minimum mérete 10px!");
    }
    else if (text > 80){
        displayError("size", "A betűk maximum mérete 80px!");
    }
    else{
        document.documentElement.setAttribute("style",`--f-size: ${text}px`);
    }
}
function foregroundEdited() {
    text = document.getElementById("foreground").value;
    document.documentElement.setAttribute("style",`--c-on-primary: ${text}`);
}
function backgroundEdited() {
    text = document.getElementById("background").value;
    document.documentElement.setAttribute("style",`--c-primary: ${text}`);
}
function restoreDefault() {
    document.getElementById("sample").value = "Árvíztűrő tükörfúrógép";
    document.getElementById("size").value = "12";
    document.getElementById("foreground").value = "#000000";
    document.getElementById("background").value = "#ffffff";
}
function displayError(element, content) {
    let temp = document.createElement("span");
    temp.id = `${element}_error`;
    temp.classList.add("error");
    temp.innerHTML = content;
    document.getElementById(`in_${element}`).appendChild(temp);
}
function clearError(element) {
    let temp = document.getElementById(`${element}_error`);
    if (!(temp === null || temp === undefined)) {
        document.getElementById(`in_${element}`).removeChild(temp);
    }
}