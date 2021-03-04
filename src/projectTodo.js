import Todotask from "./todoTask";

function Projecttodo(projName) {
    let todoproject = {
        //id: Date.now(),
        projName
    }
    return Object.assign(
        todoproject,
        Tasktodo()
    )
}

function Tasktodo(title, comment, duedate, priority) {
    let todotask = {
        id: Date.now(),
        title,
        comment,
        duedate,
        priority
    }

    return Object.assign(
        todotask,
    )
}

export default Projecttodo