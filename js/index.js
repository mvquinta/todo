
//Get HTML Elements
const btnAddTask = document.querySelector('.add-task')
const divFormAddTask = document.querySelector('.div-form-add-task')
const ulTaskList = document.querySelector('.task-list-li-container')
const divTaskContainer = document.querySelector('.task-container')




/****Event Listeners******/
//When plus add task is clicked, form opens up to insert new task
document.addEventListener('DOMContentLoaded', () => {
    restoreLocalTask()
    feather.replace()
})
btnAddTask.addEventListener('click', e => {
    const item = e.target
    if (item.classList[0] === 'btn-add-task') {
        //Test if form is already open. If it is, it's stopped from being opened/created again
        if (!document.querySelector('.div-form')) {
            const divForm = document.createElement('div')
            divForm.classList.add('div-form')
            divFormAddTask.appendChild(divForm)
            const form = document.createElement('form')
            form.classList.add('form-add-task')
            divForm.appendChild(form)
            const formInput = document.createElement('input')
            formInput.classList.add('input-add-task')
            formInput.setAttribute('type', 'text')
            form.appendChild(formInput)
            formInput.focus()
            const buttonAdd = document.createElement('button')
            buttonAdd.classList.add('btn-add-task')
            buttonAdd.id = 'confirmAddTask'
            buttonAdd.innerHTML = 'Add Task'
            form.appendChild(buttonAdd)

            //When input submitted execute addTask function
            buttonAdd.addEventListener('click', e => {
                addTask(formInput.value)
                //this calls and updates icons from feather
                feather.replace()
            })
            const buttonCancel = document.createElement('button')
            buttonCancel.classList.add('btn-add-task')
            buttonCancel.id = 'cancelAddTask'
            buttonCancel.innerHTML = 'Cancel'
            form.appendChild(buttonCancel)

            //If cancel button is clicked created div form is deleted
            buttonCancel.addEventListener('click', e => {
                divForm.remove()
            })
        }
    }
})
divTaskContainer.addEventListener('click', delTask)
divTaskContainer.addEventListener('click', checkTask)

/****Functions******/

//Add Task function - receives input from form, creates a new task and removes/dels created div form
function addTask(addedTask) {
    //first save input to local storage
    saveLocalTask(addedTask)
    //execute task creation and form removal
    const divMyTodo = document.createElement('div')
    divMyTodo.classList.add('myTodo')
    ulTaskList.appendChild(divMyTodo)
    const liTaskItem = document.createElement('li')
    liTaskItem.classList.add('task-item')
    liTaskItem.innerHTML = addedTask
    divMyTodo.appendChild(liTaskItem)
    const btnTrashTask = document.createElement('button')
    btnTrashTask.innerHTML = '<i class="icons-task-items" data-feather="trash">'
    btnTrashTask.classList.add('btn-trash')
    divMyTodo.appendChild(btnTrashTask)
    const btnCheckTask = document.createElement('button')
    btnCheckTask.innerHTML = '<i class="icons-task-items" data-feather="check"></i>'
    btnCheckTask.classList.add('btn-check')
    divMyTodo.appendChild(btnCheckTask)
    const deleteForm = document.querySelector('.div-form')
    deleteForm.remove()
}
function delTask(e) {
    const item = e.target
    if (item.classList[0] === 'btn-trash') {
       const task = item.parentElement
        removeLocalTask(task)
        task.remove()
    }
    //removeLocalTask(task)
}
function checkTask(e) {
    const item = e.target
    if (item.classList[0] === 'btn-check') {
        const task = item.parentElement
        task.classList.toggle('checkTask')
    }

}

//Functions to manage local storage - saves, restores and removes
function saveLocalTask(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function restoreLocalTask() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task) {
        //execute task creation and form removal
        const divMyTodo = document.createElement('div')
        divMyTodo.classList.add('myTodo')
        ulTaskList.appendChild(divMyTodo)
        const liTaskItem = document.createElement('li')
        liTaskItem.classList.add('task-item')
        liTaskItem.innerHTML = task
        divMyTodo.appendChild(liTaskItem)
        const btnTrashTask = document.createElement('button')
        btnTrashTask.innerHTML = '<i class="icons-task-items" data-feather="trash">'
        btnTrashTask.classList.add('btn-trash')
        divMyTodo.appendChild(btnTrashTask)
        const btnCheckTask = document.createElement('button')
        btnCheckTask.innerHTML = '<i class="icons-task-items" data-feather="check"></i>'
        btnCheckTask.classList.add('btn-check')
        divMyTodo.appendChild(btnCheckTask)
        const deleteForm = document.querySelector('.div-form')
    })
}
function removeLocalTask(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    const taskIndex = task.children[0].innerText
    tasks.splice(tasks.indexOf(taskIndex), 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}