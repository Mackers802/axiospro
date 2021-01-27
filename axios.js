// const axios = require("axios");

// ---------------------------- Data Request ------------------------
function requestData() {
    axios.get("https://api.vschool.io/mack/todo")
        .then(response => {
            display(response.data);
            console.log(response.data)
        })
        .catch(error => console.log(error))
}

// ---------------- open / close Event Listeners -------------------
document.getElementById("openToDo").addEventListener("click", function (e) {
    e.preventDefault();
    requestData();
})

document.getElementById("closeToDo").addEventListener("submit", function (e) {
    e.preventDefault();
    update();
})

//  --------------------------- data display -------------------------
function display(arr) {
    document.getElementById('container').innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        const div = document.createElement("div")

    //--------------- Completed --------------------------
        const completed = document.createElement('h1')
        // completed.innerHTML = "Completed"
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("id", "checkBoxInput")
        checkBox.textContent = ("Completed")
        div.className = "list-Container"
        console.log(checkBox)
        div.appendChild(checkBox)

        checkBox.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("horray")
            openCheckSubmit(arr[i]._id, arr[i].completed);
            
        })
        checkBox.checked = arr[i].completed

// -------------- Delete -----------------------------------
        const deleteBox = document.createElement("button");
        deleteBox.textContent = ("Delete")
        deleteBox.style.backgroundColor = ("red")
        deleteBox.setAttribute("type", "checkbox");
        deleteBox.setAttribute("id", "deleteBoxInput")
        div.appendChild(deleteBox)
        
        deleteBox.value = arr[i]._id
        
        deleteBox.addEventListener("click", function (e) {
            e.preventDefault();
            console.log(deleteBox)
            console.log("deleteddd")
            deleteData(deleteBox)
        })

// -------------- DOM ---------------------------------------
        const h1 = document.createElement('h1');
        const span = document.createElement('div')
        div.appendChild(h1);
        if (arr[i].completed === true) {
            h1.style.textDecoration = "line-through"
        }
        if (arr[i].imgUrl) {
            const h2 = document.createElement("img")
            h2.src = arr[i].imgUrl
            div.append(h2)
        }
        h1.textContent = arr[i].title
        div.appendChild(span);
        span.style.padding = ("width", "10px")
        span.style.margin = "15px", "0px";
        span.style.backgroundColor = "black";

        document.getElementById('container').appendChild(div)
    }
}
function update() {
    axios.put("https://api.vschool.io/mack/todo")
    requestData();
    if (checkBox.value = true) { }
}

// ----------------------------------- Post Data ---------------------------------------

function postData(newPost) {
    axios.post("https://api.vschool.io/mack/todo", newPost)
        .then(response => {
            window.location.reload();
            console.log(response)
            alert("Post Submitted");
        })
        .catch(error => console.log(error, `alert: Change incoomplete`))

    function addData() {

    }
}

// ----------------------------------------- To Do ADD & Form -------------------------------------------
document.getElementById("addToDoButton").addEventListener("click", function (e) {
    e.preventDefault();
    postFormValues();
})

function postFormValues() {
    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    let imgUrl = document.getElementById("img").value;
    postData({
        title,
        price,
        description,
        imgUrl
    })
}

function submitForm() {
    putData();
}

// -------------------- PUT DATA ---------------------------------------

function openCheckSubmit(id, completed) {
    const newCompleted = !completed
    putData(id, newCompleted)
        console.log(id)
}

function putData(id, newCompleted) {
    axios.put(`https://api.vschool.io/mack/todo/${id}`, {completed: newCompleted})
        .then(response => {
            window.location.reload();
            requestData();
        })
        .catch(error => console.log(error, `alert: Change incoomplete`))
}


// -------------------- Delete DATA ---------------------------------------

function deleteData(deleteBox) {
    axios.delete(`https://api.vschool.io/mack/todo/${deleteBox.value}`, //{deleted: newDeleted}
    )
        .then(response => {
            window.location.reload();
            requestData();
        })
        .catch(error => console.log(error, `alert: Change not coomplete`))


}