import React, {useState} from 'react'

function ListTodosEditMode({todo, handleDelete, handleEdit}) {
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(todo.todo_text)

    //console.log(todo)
    const handleSave = () => {
        if(editing){
            handleEdit(todo.id, editText);
        }
        setEditing(!editing);
    }

    return (
        <div className="flex justify-between p-1 mb-1 border-b-1 border-gray-600">
            {editing ? <input type="text" placeholder="Add your note here..." className="border-1 m-3" autoFocus={true} onChange={(e)=>setEditText(e.target.value)}/>
                : <li>{todo.todo_text}</li>}
            <div className="flex">
                <div className="bg-black text-white rounded-md p-1 ml-1" onClick={() => handleDelete(todo.id)}>Delete</div>
                <div className="bg-black text-white rounded-md p-1 ml-1" onClick={handleSave}>{editing ? "Save" : "Edit"}</div>
            </div>
        </div>
    )
}

export default ListTodosEditMode
