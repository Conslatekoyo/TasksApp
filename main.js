let selectedtask = {}
let tasksArray = []

window.onload = (event) => {
    fetch('https://63eca9a132a08117239f4c48.mockapi.io/todos')
        .then(response => response.json())
        .then((tasks) => {
            tasksArray = tasks
            console.log(tasks);
            let TaskRow = document.getElementById('row')
            tasks.forEach(el => {
                console.log(el.Image)
                TaskRow.innerHTML += `
                <div class="col-4">
                <div class="card" style="width: 18rem;">
                
                  <img src="${el.Image}" class="card-img-top" alt="${el.Title} image">
                  <div class="card-body">
                    <h5 class="card-title">${el.Title}</h5>
                    <p class="card-text">${el.Description}</p>
                    <hr>
                    <div class="row">
                        <div class="col-4">
                        <p> Timetaken</p>
                        <p> ${el.Timetaken}</p>
                    </div>
                    <div class="col-4">
                    <p> Notes</p>
                    <p> ${el.Notes}</p>
                    </div>
                    </div>
                    <button type="button" onclick = "TaskInput(${el.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="edit">
                    EDIT
                    </button>

                    <button type="button" onclick = "deleteTask(${el.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="edit">
                    DELETE
                    </button>
                </div>
                </div>
              </div>
                `
            });
        })


    let titleBTN = document.getElementById('title')
    titleBTN.addEventListener('keyup', event => {
        document.getElementById('staticBackdropLabel').innerHTML = document.getElementById('title').value
    })
    let createbtn = document.getElementById("create")
    createbtn.addEventListener("click", event => {

        document.getElementById('staticBackdropLabel').innerHTML = ""
        document.getElementById('title').value =
        document.getElementById('description').value = ""
        document.getElementById('timetaken').value = ""
        document.getElementById('notes').value = ""
        document.getElementById('thumbnail').value = ""
        document.getElementById('submit').innerHTML = "Create"

    })

    let search = document.getElementById('search')
    search.addEventListener('keyup', (e) => {
        let searchstring = e.target.value
        let result = tasksArray.filter(task => task.Title.toLowerCase().includes(searchstring))

        let TaskRow = document.getElementById('row')
        TaskRow.innerHTML = ""
        result.forEach(el => {
        TaskRow.innerHTML += `
    <div class="col-4">
    <div class="card" style="width: 18rem;">
    
    <img src="${el.Thumbnail}" class="card-img-top" alt="${el.Title} image">
    <div class="card-body">
    <h5 class="card-title">${el.Title}</h5>
        
    <p class="card-text">${el.Description}</p>
    <hr>
    <div class="row">
    <div class="col-4">
    <p> Timetaken</p>
    <p> ${el.Timetaken}</p>
    </div>

    <div class="col-4">
    <p> Notes</p>
    <p> ${el.Notes}</p>

    </div>
    <div class="col-4">
    <p> Thumbnail</p>
    <p> ${el.Thumbnail}</p>
    </div>
    </div>

    </div>
    <button type="button" onclick = "TaskInput(${el.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="edit">
    EDIT
    </button>

    <button type="button" onclick = "deleteTask(${el.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="edit">
    DELETE
    </button>

    </div>
    </div>
  </div>
    `
 })
})
};



function createTask() {
    spinner()
    let httpmethod = ""
    let url = ""
    if (Object.keys(selectedtask).length==0) {
        httpmethod = "POST"
        url = "https://63eca9a132a08117239f4c48.mockapi.io/todos/"
    } else {
        httpmethod = "PUT"
        url = `https://63eca9a132a08117239f4c48.mockapi.io/todos/${selectedtask.id}`
    }
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let timetaken = document.getElementById('timetaken').value
    let notes = document.getElementById('notes').value
    let thumbnail = document.getElementById('thumbnail').value

    let create = {
        Title: title,
        Description: description,
        Timetaken: timetaken,
        Notes: notes,
        Thumbnail: thumbnail,
    }

    fetch(url, {
        method: httpmethod,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(create)
    })
    .then(response => response.json())
        .then(data => {
            
            window.location.reload()
            console.log(data)
        })
        .catch(error => console.log(error))

    selectedtask={}
}


function TaskInput(TASKID) {
    let todo = tasksArray.find(task => task.id == TASKID)
    console.log(todo)
    selectedtask = todo



    document.getElementById('staticBackdropLabel').innerHTML = selectedtask.title

    document.getElementById('title').value = selectedtask.title
    document.getElementById('description').value = selectedtask.description
    document.getElementById('timetaken').value = selectedtask.timetaken
    document.getElementById('notes').value = selectedtask.notes
    document.getElementById('thumbnail').value = selectedtask.thumbnail
    document.getElementById('submit').innerHTML = "Update Task"
}
function deleteTask(TASKID) {

    fetch(`https://63eca9a132a08117239f4c48.mockapi.io/todos/${TASKID}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
    })
        .then(response => { response.json(), window.location.reload() })
        .catch(error => console.log(error))
}
function spinner() {
    document.getElementsByClassName("loader")[0].style.display = "block";
}
function spinnerclose() {
    document.getElementsByClassName("loader")[0].style.display = "none";
}
