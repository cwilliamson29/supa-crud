import React, {useState} from 'react'

function AddTodo({addTodo}) {
    const [todo, setTodo] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const {error} = addTodo(todo)

        if (error) {
            setMessage("Failed to add todo: " + error);
            console.log(error)
        } else {
            setMessage("Todo added successfully!");
            setTodo("");
        }

        setLoading(false);
    }
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-3xl font-bold">Add todo's</h1>
            <form onSubmit={handleSubmit} className="w-full flex justify-center items-center w-full">
                <input type="text" placeholder="Add your note here..." className="border-1 m-3 p-2 w-1/4" autoFocus={true} value={todo} onChange={(e) => setTodo(e.target.value)}/>
                <button type="submit" className="bg-blue-800 p-2 px-4 rounded-md border-1 border-blue-700 hover:border-blue-600 cursor-pointer" disabled={loading}>
                    {loading ? "Adding..." : "Add Todo"}
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default AddTodo
