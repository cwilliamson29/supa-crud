export const sortTodosHelper = (todo) => {
    let newTodos = todo

    newTodos.sort((a, b) => {
        if (a.isCompleted > b.isCompleted) return 1
        if (a.isCompleted < b.isCompleted) return -1
        if (a.id > b.id) return 1
        if (a.id < b.id) return -1
        return 0
    })
    return newTodos
}