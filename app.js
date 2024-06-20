const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");
const btn = document.querySelector("button");
btn.addEventListener("click", addTask);

function addTask() {
    if (inputBox.value === '') {
        alert("Write something first");
    } else {
        let li = document.createElement("li");
        li.classList.add("draggable");
        li.setAttribute("draggable", "true");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        inputBox.value = "";
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
        addDragEvents(li);
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    const items = listContainer.querySelectorAll("li");
    items.forEach(item => addDragEvents(item));
}
showTask();

function addDragEvents(draggable) {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
}

listContainer.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(listContainer, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement === null) {
        listContainer.appendChild(draggable);
    } else {
        listContainer.insertBefore(draggable, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}