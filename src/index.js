import Projecttodo from './projectTodo'

//Get HTML Elements
const homeone = document.querySelector('.home-h1')
const btnAddTask = document.querySelector('.add-task')
const divFormAddTask = document.querySelector('.div-form-add-task')
const liTaskListContainer = document.querySelector('.task-list-li-container')
const divTaskContainer = document.querySelector('.task-container')
const projectName = document.querySelector('.project-name')
const btnAddProj = document.querySelector('.btn-add-proj')
const divFormAddProj = document.querySelector('.div-for-add-proj')
const ulProjectsList = document.querySelector('.ul-projects-list')

/****Event Listeners******/
//Refresh site home page
homeone.addEventListener('click', () => {
    location.reload();
})
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
            formInput.setAttribute('placeholder', 'Add a task')
            form.appendChild(formInput)
            formInput.focus()

            //Adds calendar selector for due date
            const dueDate = document.createElement('input')
            dueDate.classList.add('dueDate-add-task')
            dueDate.setAttribute('type', 'date')
            dueDate.setAttribute('name', 'date')
            dueDate.setAttribute('placeholder', '')
            form.appendChild(dueDate)

            //Adds a priority selector with 3 options
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

            buttonAdd.addEventListener('click', e => {
                //Check is task name already exist or if input is empty. If so, alerts and ask for a new one
                if (checkTaskExist(formInput.value) === true || formInput.value === "") {
                    alert('Task already exists or nothing was written. Please review your task.')
                } else {
                    //Create taskTask as a project object to be able to filter and inherit task object methods
                    let todoTask
                    if (projectName.innerHTML === 'All Projects') {
                        todoTask = Projecttodo('Inbox')
                    } else {
                        todoTask = Projecttodo(projectName.innerHTML)
                    }
                    //read form and inserts data into the object
                    todoTask.title = formInput.value
                    todoTask.comment = formComment.value
                    todoTask.duedate = dueDate.value
                    todoTask.priority = selectPriority.value
                    //Executes addTask function that creates the UI task and saves it to local storage
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
//Deletes task
divTaskContainer.addEventListener('click', delTask)
//Check and check a task
divTaskContainer.addEventListener('click', checkTask)
//Adds a Project
btnAddProj.addEventListener('click', addProject)
//Rebuild task list when new project is clicked - but is always listening for every click
document.addEventListener('click', (e) => {
    const selectedProj = e.target
    if (selectedProj.classList[0] === 'main-proj-name' || selectedProj.classList[0] === 'new-proj-name') {
        //Change name of current project in my main container. (this is important because I read the name from there to know in each project should I save my task
        projectName.innerText = selectedProj.innerText
        //Delete all current display tasks (all divs with class = myTodo) and rebuild list based on selected project
        removeAllMyTodo(liTaskListContainer)
        filterToRebuildProject()
        feather.replace() //I always have to call feather to refresh icons
    }
})
//Deletes Project
document.addEventListener('click', (e) => {
    const selectedDelProj = e.target
    if (selectedDelProj.classList[0] === 'btn-del-proj') {
        //console.log(selectedDelProj.parentElement.innerText)
        //console.log(typeof selectedDelProj.parentElement.innerText)
        deleteLocalProject(selectedDelProj.parentElement.innerText)
        delProject(e)
    }
})

/****Functions******/

//Add Task function - receives input from form, creates a new task and removes/dels created div form
function addTask(todoTask) {
    //first save input to local storage
    saveLocalTask(todoTask)
    //execute task creation and form removal
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
    //Deletes add task form
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
}
function checkTask(e) {
    const item = e.target
    if (item.classList[0] === 'btn-check') {
        const task = item.parentElement
        task.classList.toggle('checkTask')
        const taskTitle = task.firstChild
        //console.log(a.innerText)
        toggleDone(taskTitle.innerText)
    }
}

function toggleDone(taskTitle) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task) {
        if(task.title === taskTitle) {
            if(task.done === false) {
                task.done = true
                console.log('im here')
                console.log(task.done)
                localStorage.setItem('tasks', JSON.stringify(tasks))
            } else if (task.done === true) {
                console.log('im there')
                task.done = false
                console.log(task.done)
                localStorage.setItem('tasks', JSON.stringify(tasks))
            }
        }
    })
    // const taskTitle = task.children[0].innerText
    // let taskIndex = tasks.findIndex( task => task.title === taskTitle)
    // tasks.splice(taskIndex, 1)
    // localStorage.setItem('tasks', JSON.stringify(tasks))
}

function delProject(e) {
    const item = e.target
    if (item.classList[0] === 'btn-del-proj') {
        const projDel = item.parentElement.parentElement
        projDel.remove()
    }
}

//Add Project Function
function addProject() {
    //Creates main Form structure
    const divProjForm = document.createElement('div')
    divProjForm.classList.add('div-form-proj')
    divFormAddProj.appendChild(divProjForm)
    const formProj = document.createElement('form')
    formProj.classList.add('form-add-proj')
    formProj.id = 'addProjForm'
    divProjForm.appendChild(formProj)
    //Adds main task input
    const formProjInput = document.createElement('input')
    formProjInput.classList.add('input-add-proj')
    formProjInput.setAttribute('type', 'text')
    formProj.appendChild(formProjInput)
    formProjInput.focus()

    //Creates Add and Cancel buttons and respective logic
    const buttonAddProj = document.createElement('button')
    buttonAddProj.classList.add('btn-add-project')
    buttonAddProj.id = 'confirmAddProj'
    buttonAddProj.innerHTML = 'Add Project'
    divProjForm.appendChild(buttonAddProj)

    //If Add button is clicked, add project name under Projects li tag
    buttonAddProj.addEventListener('click', e => {
        if (checkProjExist(formProjInput.value) === true || formProjInput.value === "") {
            alert('Task already exists or nothing was written. Please review your task.')
        } else {
            let todoProject = Projecttodo(formProjInput.value)
            saveLocalTask(todoProject)
            const liProjectName = document.createElement('li')
            ulProjectsList.appendChild(liProjectName)
            const aProjName = document.createElement('a')
            aProjName.setAttribute('href', '#')
            aProjName.classList.add('new-proj-name')
            aProjName.innerHTML = todoProject.projName
            const btnDelProj = document.createElement('button')
            btnDelProj.classList.add('btn-del-proj')
            btnDelProj.innerHTML = '<i class="icons-task-items" data-feather="trash">'
            aProjName.appendChild(btnDelProj)
            liProjectName.appendChild(aProjName)
            feather.replace()
        }

        //deleted add project form
        divProjForm.remove()
    })


    const buttonCancelProj = document.createElement('button')
    buttonCancelProj.classList.add('btn-cancel-project')
    buttonCancelProj.id = 'cancelAddProj'
    buttonCancelProj.innerHTML = 'Cancel'
    divProjForm.appendChild(buttonCancelProj)

    //If cancel button is clicked created div form is deleted
    buttonCancelProj.addEventListener('click', e => {
        divProjForm.remove()
    })
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
function restoreLocalTask(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task) {
        //this first condition checks if the current object in the loop is a project object and not a task object
        //if length is 2, than it only haves to keys -project name and ID - so it is a project object.
        //I build side man UI with project names. Else, I build task list
        if (Object.keys(task).length <= 3) {
            const liProjectName = document.createElement('li')
            ulProjectsList.appendChild(liProjectName)
            const aProjName = document.createElement('a')
            aProjName.setAttribute('href', '#')
            aProjName.classList.add('new-proj-name')
            aProjName.innerHTML = task.projName
            const btnDelProj = document.createElement('button')
            btnDelProj.classList.add('btn-del-proj')
            btnDelProj.innerHTML = '<i class="icons-task-items" data-feather="trash">'
            aProjName.appendChild(btnDelProj)
            liProjectName.appendChild(aProjName)
            feather.replace()
        } else if (Object.keys(task).length >= 4) {
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
            //set flag color based on priority
            if (task.priority === 'high') {
                btnPriority.classList.add('highP')
            } else if ( task.priority === 'medium') {
                btnPriority.classList.add('mediumP')
            } else {
                btnPriority.classList.add('lowP')
            }
            divTaskInfo.appendChild(btnPriority)
            const btnCalendar = document.createElement('button')
            btnCalendar.classList.add('disable-btn')
            btnCalendar.innerHTML = task.duedate + '<i class="icons-task-info" data-feather="calendar"></i>'
            divTaskInfo.appendChild(btnCalendar)
            //Checks if task is done. If so, adds checkTask class for it be rendered as completed
            if (task.done === true) {
                divMyTodo.classList.add('checkTask')
            }
        } else {
            return 0
        }
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
function deleteLocalProject(projDel) {
    let tasks
    let count = 0
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    //I run into a problem where my forEach was only deleting one task at the time and not all at once
    //The workaround I found was to get the number of items I have with the same projec name and repeat the delete cycle that same number of times
    //So I have a first forEach where I count the number of items and a second forEach where I implement the logic to finnaly delete
    //this should work with only one forEach. I'm missing something
    tasks.forEach(function(task) {
        if (task.projName === projDel) {
            count += 1
        }
    })
    for (let i = 0; i = count; i++) {
        tasks.forEach(function(task) {
            if (task.projName === projDel) {
                let taskIndex = tasks.findIndex ( task => task.projName === projDel )
                tasks.splice(taskIndex, 1)
                localStorage.setItem('tasks', JSON.stringify(tasks))
            }
        })
        count -= 1
    }
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
        //this first condition checks if the current object in loop is a task or a projec
        //if its a project object, it wont have a title, so it will be ignored. This way, If I want, I can have a task with the same name as project
        //this also haves to exist for loop not to break looking for a task.title where it does not exist
        if (task.title === undefined) {
            return 0
        } else {
            if (task.title.toLowerCase() === userInput.toLowerCase()) {
                titleExist = true
            }
        }
    })
    return titleExist
}
//Checks if project already exists based on title
function checkProjExist(userInput) {
    let projExist = false
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task) {
        if (task.projName.toLowerCase() === userInput.toLowerCase()) {
            projExist = true
        }
    })
    return projExist
}

//Rebuilds task list when a different project is clicked
function filterToRebuildProject() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (proj) {
        //If object length is 2 or less, it means its a project object and not a task. So ignore it and dont try to build UI for it
        if (Object.keys(proj).length <= 3) {
            return 0
        } else {
            if (proj.projName === projectName.innerHTML) {
                const divMyTodo = document.createElement('div')
                divMyTodo.classList.add('myTodo')
                liTaskListContainer.appendChild(divMyTodo)
                const liTaskItem = document.createElement('li')
                liTaskItem.classList.add('task-item')
                liTaskItem.innerHTML = proj.title
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
                liTaskComment.innerHTML = proj.comment
                divTaskInfo.appendChild(liTaskComment)
                const btnPriority = document.createElement('button')
                btnPriority.classList.add('disable-btn')
                btnPriority.innerHTML = '<i class="icons-task-info" data-feather="flag"></i>'
                //set flag color based on priority
                if (proj.priority === 'high') {
                    btnPriority.classList.add('highP')
                } else if ( proj.priority === 'medium') {
                    btnPriority.classList.add('mediumP')
                } else {
                    btnPriority.classList.add('lowP')
                }
                divTaskInfo.appendChild(btnPriority)
                const btnCalendar = document.createElement('button')
                btnCalendar.classList.add('disable-btn')
                btnCalendar.innerHTML = proj.duedate + '<i class="icons-task-info" data-feather="calendar"></i>'
                divTaskInfo.appendChild(btnCalendar)
                //Checks if task is done. If so, adds checkTask class for it be rendered as completed
                if (proj.done === true) {
                    divMyTodo.classList.add('checkTask')
                }

            }
        }
    })
}
//Removes all current display tasks. It's executed before filterToRebuildProject and only deletes html elements. localStorage stays untouched.
function removeAllMyTodo(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

