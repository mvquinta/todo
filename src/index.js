import Todotask from './todoTask'

Todotask()

const myTask = Todotask('Buy Kiwis', 'The yellow ones', '02-03-2021', 'high')
// console.log(myTask.title)
// console.log(myTask.comment)
// console.log(myTask.duedate)
// console.log(myTask.priority)
// console.log(myTask.id)
//console.log(Object.keys(myTask))

//Get HTML Elements
const btnAddTask = document.querySelector('.add-task')
const divFormAddTask = document.querySelector('.div-form-add-task')
const liTaskListContainer = document.querySelector('.task-list-li-container')
const divTaskContainer = document.querySelector('.task-container')




/****Event Listeners******/
//Restores local storage and task list when page is loaded or refreshed
document.addEventListener('DOMContentLoaded', () => {
    restoreLocalTask()
    feather.replace()
})
//When plus add task is clicked, form opens up to insert new task
btnAddTask.addEventListener('click', e => {
    const item = e.target
    if (item.classList[0] === 'btn-add-task') {
        //Test if form is already open. If it is, it's stopped from being opened/created again
        if (!document.querySelector('.div-form')) {
            //Creates main Form structure
            const divForm = document.createElement('div')
            divForm.classList.add('div-form')
            divFormAddTask.appendChild(divForm)
            const form = document.createElement('form')
            form.classList.add('form-add-task')
            form.id = 'addTaskForm'
            divForm.appendChild(form)
            //Adds main task input
            const formInput = document.createElement('input')
            formInput.classList.add('input-add-task')
            formInput.setAttribute('type', 'text')
            form.appendChild(formInput)
            formInput.focus()

            //Adds calendar selector for due date
            const dueDate = document.createElement('input')
            dueDate.classList.add('dueDate-add-task')
            dueDate.setAttribute('type', 'date')
            dueDate.setAttribute('name', 'date')
            dueDate.setAttribute('placeholder', '')
            form.appendChild(dueDate)

            //Adds a priority selecter with 3 options
            const labelPriority = document.createElement('label')
            labelPriority.setAttribute('for', 'priority')
            form.appendChild(labelPriority)
            const selectPriority = document.createElement('select')
            selectPriority.setAttribute('name', 'priority')
            selectPriority.setAttribute('id', 'priority')
            selectPriority.setAttribute('form', 'addTaskForm')
            form.appendChild(selectPriority)
            const optionHigh = document.createElement('option')
            optionHigh.setAttribute('value', 'high')
            optionHigh.innerHTML = 'High'
            selectPriority.appendChild(optionHigh)
            const optionMedium = document.createElement('option')
            optionMedium.setAttribute('value', 'medium')
            optionMedium.innerHTML = 'Medium'
            selectPriority.appendChild(optionMedium)
            const optionLow = document.createElement('option')
            optionLow.setAttribute('value', 'low')
            optionLow.innerHTML = 'Low'
            selectPriority.appendChild(optionLow)

            //Creates and new div to move these option under
            const divFormBottom = document.createElement('div')
            divFormBottom.classList.add('div-form-bottom')
            divForm.appendChild(divFormBottom)

            //Creates a form input to add comments
            const formComment = document.createElement('input')
            formComment.classList.add('comment-add-task')
            formComment.setAttribute('type', 'text')
            formComment.setAttribute('placeholder', 'Add a comment')
            divFormBottom.appendChild(formComment)

            //Creates Add and Cancel buttons and respective logic
            const buttonAdd = document.createElement('button')
            buttonAdd.classList.add('btn-add-task')
            buttonAdd.id = 'confirmAddTask'
            buttonAdd.innerHTML = 'Add Task'
            divFormBottom.appendChild(buttonAdd)

            //When input submitted execute addTask function
            buttonAdd.addEventListener('click', e => {
                //Check is task name already exist or if input is empty. If so, alerts and ask for a new one
                if (checkTaskExist(formInput.value) === true || formInput.value === "") {
                    alert('Task already exists or nothing was written. Please review your task.')
                } else {
                    let todoTask = Todotask(formInput.value, formComment.value, dueDate.value, selectPriority.value)
                    addTask(todoTask)
                    //this calls and updates icons from feather
                    feather.replace()
                }
            })
            const buttonCancel = document.createElement('button')
            buttonCancel.classList.add('btn-add-task')
            buttonCancel.id = 'cancelAddTask'
            buttonCancel.innerHTML = 'Cancel'
            divFormBottom.appendChild(buttonCancel)

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
function addTask(todoTask) {
    //first save input to local storage
    saveLocalTask(todoTask)
    //execute task creation and form removal
    //console.log(todoTask.id)
    const divMyTodo = document.createElement('div')
    divMyTodo.classList.add('myTodo')
    liTaskListContainer.appendChild(divMyTodo)
    const liTaskItem = document.createElement('li')
    liTaskItem.classList.add('task-item')
    liTaskItem.innerHTML = todoTask.title
    divMyTodo.appendChild(liTaskItem)
    const btnTrashTask = document.createElement('button')
    btnTrashTask.innerHTML = '<i class="icons-task-items" data-feather="trash">'
    btnTrashTask.classList.add('btn-trash')
    divMyTodo.appendChild(btnTrashTask)
    const btnCheckTask = document.createElement('button')
    btnCheckTask.innerHTML = '<i class="icons-task-items" data-feather="check"></i>'
    btnCheckTask.classList.add('btn-check')
    divMyTodo.appendChild(btnCheckTask)
    const divTaskInfo = document.createElement('div')
    divTaskInfo.classList.add('div-task-info')
    divMyTodo.appendChild(divTaskInfo)
    const liTaskComment = document.createElement('li')
    liTaskComment.classList.add('task-comment')
    liTaskComment.innerHTML = todoTask.comment
    divTaskInfo.appendChild(liTaskComment)
    const btnPriority = document.createElement('button')
    btnPriority.classList.add('disable-btn')
    btnPriority.innerHTML = '<i class="icons-task-info" data-feather="flag"></i>'
    //set flag color based on priority
    if (todoTask.priority === 'high') {
        btnPriority.classList.add('highP')
    } else if ( todoTask.priority === 'medium') {
        btnPriority.classList.add('mediumP')
    } else {
        btnPriority.classList.add('lowP')
    }
    divTaskInfo.appendChild(btnPriority)
    const btnCalendar = document.createElement('button')
    btnCalendar.classList.add('disable-btn')
    btnCalendar.innerHTML = todoTask.duedate + '<i class="icons-task-info" data-feather="calendar"></i>'
    divTaskInfo.appendChild(btnCalendar)
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
        liTaskListContainer.appendChild(divMyTodo)
        const liTaskItem = document.createElement('li')
        liTaskItem.classList.add('task-item')
        liTaskItem.innerHTML = task.title
        divMyTodo.appendChild(liTaskItem)
        const btnTrashTask = document.createElement('button')
        btnTrashTask.innerHTML = '<i class="icons-task-items" data-feather="trash">'
        btnTrashTask.classList.add('btn-trash')
        divMyTodo.appendChild(btnTrashTask)
        const btnCheckTask = document.createElement('button')
        btnCheckTask.innerHTML = '<i class="icons-task-items" data-feather="check"></i>'
        btnCheckTask.classList.add('btn-check')
        divMyTodo.appendChild(btnCheckTask)
        const divTaskInfo = document.createElement('div')
        divTaskInfo.classList.add('div-task-info')
        divMyTodo.appendChild(divTaskInfo)
        const liTaskComment = document.createElement('li')
        liTaskComment.classList.add('task-comment')
        liTaskComment.innerHTML = task.comment
        divTaskInfo.appendChild(liTaskComment)
        const btnPriority = document.createElement('button')
        btnPriority.classList.add('disable-btn')
        btnPriority.innerHTML = '<i class="icons-task-info" data-feather="flag"></i>'
        divTaskInfo.appendChild(btnPriority)
        const btnCalendar = document.createElement('button')
        btnCalendar.classList.add('disable-btn')
        btnCalendar.innerHTML = task.duedate + '<i class="icons-task-info" data-feather="calendar"></i>'
        divTaskInfo.appendChild(btnCalendar)

        //const deleteForm = document.querySelector('.div-form')
    })
}
function removeLocalTask(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    const taskTitle = task.children[0].innerText
    let taskIndex = tasks.findIndex( task => task.title === taskTitle)
    tasks.splice(taskIndex, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Checks if task already exists based on title
function checkTaskExist(userInput) {
    let titleExist = false
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task) {
        if (task.title.toLowerCase() === userInput.toLowerCase()) {
            titleExist = true
        }
    })
    return titleExist
}