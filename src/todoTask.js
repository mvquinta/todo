

function Todotask(title, comment, duedate, priority) {
    let todotask = {
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