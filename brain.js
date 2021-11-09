window.addEventListener("DOMContentLoaded", init);
function init() {
    document.getElementById("sample").addEventListener("input", sampleEdited);
    document.getElementById("size").addEventListener("input", textSizeEdited);
    document.getElementById("foreground").addEventListener("change", foregroundEdited);
    document.getElementById("background").addEventListener("change", backgroundEdited);
    document.getElementById("restore").addEventListener("click", restoreDefault);
    document.getElementById("fav").addEventListener("click",addFavourite);
    fillFavourites();
}
function sampleOk(text) {
    return text !== null && text !== undefined && text !== "";
}
function sampleEdited() {
    clearError("sample");
    let text = document.getElementById("sample").value.trim();
    if (sampleOk(text)) {
        document.getElementById("preview").innerHTML = text;
    }
    else {
        displayError("sample", "A szövegdoboz nem lehet üres!");
    }
}
function textSizeOk(text) {
    return !(isNaN(text) || text === null || text === undefined || text === "" || text < 10 || text > 200)
}
function textSizeEdited() {
    clearError("size");
    let text = document.getElementById("size").value.trim();
    if (!textSizeOk(text)) {
        if (text < 10) {
            displayError("size", "A betűk minimum mérete 10px!");
        } else if (text > 200) {
            displayError("size", "A betűk maximum mérete 200px!");
        } else {
            displayError("size", "A betűméretnek számnak kell lennie!");
        }
    }
    else {
        document.documentElement.style.setProperty(`--f-size`, text+"px");
    }
}
function foregroundEdited() {
    text = document.getElementById("foreground").value;
    document.documentElement.style.setProperty(`--c-on-primary`, text);
}
function backgroundEdited() {
    text = document.getElementById("background").value;
    document.documentElement.style.setProperty(`--c-primary`, text);
}
function restoreDefault() {
    document.getElementById("sample").value = "Árvíztűrő tükörfúrógép";
    document.getElementById("size").value = "12";
    document.getElementById("foreground").value = "#000000";
    document.getElementById("background").value = "#ffffff";
    sampleEdited();
    textSizeEdited();
    foregroundEdited();
    backgroundEdited();
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
function addFavourite(){
    if(sampleOk(document.getElementById("sample").value) && 
    textSizeOk(document.getElementById("size").value)){
        Setting.addOneMore(
            new Setting(
                document.getElementById("sample").value,
                document.getElementById("size").value,
                document.getElementById("foreground").value,
                document.getElementById("background").value
            )
        )
    } else{
        alert("Nem megfelelőek az adatok!");
    }
    fillFavourites();
}
function fillFavourites(){
    let elements = Setting.getAll();
    let list = document.getElementById("favourites")
    list.innerHTML = "";
    let i = -1;
    for(const element of elements){
        i++;
        let kistemp = document.createElement("span");
        kistemp.innerHTML = element.sample;
        kistemp.style.fontSize = element.size;
        kistemp.style.background = element.background;
        kistemp.style.color = element.foreground;

        let letrehoz = document.createElement("button");
        letrehoz.innerHTML = "Betöltés";
        letrehoz.addEventListener("click",()=>setCurrent(i));

        let torol = document.createElement("button");
        torol.innerHTML = "Törlés";
        torol.addEventListener("click",()=>deleteCurrent(i));

        let temp = document.createElement("div");
        temp.classList.add("favs");
        temp.id = `fav_${i}`;
        temp.appendChild(kistemp);
        temp.appendChild(letrehoz);
        temp.appendChild(torol);
        list.appendChild(temp);
    }
}
function setCurrent(id){
    let current = Setting.getOne(id);
    document.getElementById("sample").value = current.sample;
    document.getElementById("size").value = current.size;
    document.getElementById("foreground").value = current.foreground;
    document.getElementById("background").value = current.background;
    sampleEdited();
    textSizeEdited();
    foregroundEdited();
    backgroundEdited();
}
function deleteCurrent(id){
    Setting.deleteOne(id);
    document.getElementById("favourites").removeChild(document.getElementById(`fav_${id}`));
}
