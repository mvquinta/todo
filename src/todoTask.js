

function Todotask(title, comment, duedate, priority) {
    let todotask = {
        id: Date.now(),
        title,
        comment,
        duedate,
        priority
    }

    return Object.assign(
        todotask
    )
}

export default Todotask