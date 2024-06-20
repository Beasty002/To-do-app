const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");
const btn = document.querySelector("button");
btn.addEventListener("click", addtask);
function addtask() {
    if (inputBox.value === '') {
        alert("Write something first");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        inputBox.value = "";
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    }
}


listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") { //always in uppercase
        e.target.classList.toggle("checked");
        saveData();

    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();

    }
}, false)

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();