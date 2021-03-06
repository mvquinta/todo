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

function Tasktodo(title, comment, duedate, priority, done = false) {
    let todotask = {
        id: Date.now(),
        title,
        comment,
        duedate,
        priority,
        done
    }

    return Object.assign(
        todotask,
    )
}

export default Projecttodo