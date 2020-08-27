//Select the elements of our index.html
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes attribute names
const Check = "fa-check-circle";
const Uncheck = "fa-circle-thin";
const Line_through = "lineThrough";

//Variables
let List, id;

//get items from the localStorage
let data = localStorage.getItem("TODO");

//Check if data isn't empty
if (data) {
    List = JSON.parse(data);
    id = List.length;
    loadList(List); //Load the List to the user interface
} else {
    List = [];
    id = 0;
}

//Load items to the user's interface
function loadList(a) {
    a.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Clear the localstorage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

//Today's date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US', options);

//To DO function
function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const Done = done ? Check : Uncheck;
    const Line = done ? Line_through : "";

    const item = `<li class="item">
                    <i class="fa ${Done} complete" job="complete" id="${id}"></i>
                    <p class="text ${Line}">${toDo}</p>
                    <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
                </li>
                `;
    const positon = "beforeend";
    list.insertAdjacentHTML(positon, item);
}

// add an item the the list / hit the enter key

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        if (toDo) {
            addToDo(toDo, id, false, false);
            List.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                })
                //Add items to localstorage (this line of code must be added where the List array apdated)
            localStorage.setItem("TODO", JSON.stringify(List));

            id++;

        }
        input.value = "";
    }
})

// Complete todo
function completeToDo(element) {
    element.classList.toggle(Check);
    element.classList.toggle(Uncheck);
    element.parentNode.querySelector(".text").classList.toggle(Line_through);

    List[element.id].done = List[element.id].done ? false : true;
}

// Remove todo
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    List[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function(event) {
    const element = event.target; //returns the clicked element inside the list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(List));
})