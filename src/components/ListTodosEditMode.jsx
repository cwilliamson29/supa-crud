import React, {useState} from 'react'

function ListTodosEditMode({todo, handleDelete, handleEdit}) {
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(todo.todo_text)

    //console.log(todo)
    const handleSave = (e) => {
        e.preventDefault();
        if(editing){
            handleEdit(todo.id, editText);
        }
        setEditing(!editing);
    }
    const handleEditing = (e) => {
        e.preventDefault();
        setEditing(!editing);
    }

    return (
        <form className="flex justify-between p-1 mb-1 border-b-1 border-gray-600">
            {editing ? <input type="text" placeholder="Add your note here..." className="border-b-1 m-3" autoFocus={true} value={editText} onChange={(e)=>setEditText(e.target.value)}/>
                : <li>{todo.todo_text}</li>}
            <div className="flex">
                <button className="bg-black text-white rounded-md p-1 ml-1" onClick={() => handleDelete(todo.id)}>Delete</button>
                {editing ?
                    <button type="submit" className="bg-black text-white rounded-md p-1 ml-1" onClick={(e)=>handleSave(e)}>Save</button>
                    :
                    <button className="bg-black text-white rounded-md p-1 ml-1" onClick={(e)=>handleEditing(e)}>Edit</button>
                }

            </div>
        </form>
    )
}

export default ListTodosEditMode
